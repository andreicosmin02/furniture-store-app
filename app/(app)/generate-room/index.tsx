import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Pressable,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

import Colors from '@/app/constants/Colors';
import TopBar from '@/app/components/TopBar';
import Button from '@/app/components/Button';
import MatchedProductCard from '@/app/components/MatchedProductCard';

import { useAuthStore } from '@/app/data/authStore';
import { useGenerateRoomStore } from '@/app/data/generateRoomStore';
import useCartStore from '@/app/data/cartStore';

const STYLE_OPTIONS = [
  'modern', 'minimalist', 'scandinavian', 'industrial', 'bohemian',
  'rustic', 'coastal', 'mid-century', 'traditional', 'transitional', 'gothic'
];

export default function GenerateRoom() {
  const { token } = useAuthStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const {
    selectedImage,
    selectedStyle,
    generatedImage,
    matchedProducts,
    setState,
    reset,
  } = useGenerateRoomStore();

  const loadingList = !matchedProducts && selectedImage;
  const loadingImage = !generatedImage && matchedProducts?.length;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setState({
        selectedImage: result.assets[0].uri,
        generatedImage: null,
        matchedProducts: [],
      });
    }
  };

  const analyzeRoom = async () => {
    if (!selectedImage) return;

    setState({ matchedProducts: [], generatedImage: null });

    try {
      const formData = new FormData();
      formData.append('roomImage', {
        uri: selectedImage,
        name: 'room.jpg',
        type: 'image/jpeg',
      } as any);
      formData.append('style', selectedStyle);

      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}ai/analyze/room-with-products`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const analysis = await res.json();
      const productIds = analysis.selectedProducts.map((p: any) => p.productId);

      const productsRes = await fetch(`${process.env.EXPO_PUBLIC_API_URL}products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allProducts = await productsRes.json();

      const enriched = allProducts
        .filter((prod: any) => productIds.includes(prod._id))
        .map((prod: any) => {
          const match = analysis.selectedProducts.find((a: any) => a.productId === prod._id);
          return { ...prod, analysis: match?.analysis };
        });

      setState({ matchedProducts: enriched });
    } catch (err) {
      console.error('Analysis error:', err);
    }
  };

  const generateImage = async () => {
    if (!selectedImage || !matchedProducts?.length) return;

    try {
      const genFormData = new FormData();
      genFormData.append('roomImage', {
        uri: selectedImage,
        name: 'room.jpg',
        type: 'image/jpeg',
      } as any);
      genFormData.append('style', selectedStyle);
      genFormData.append(
        'selectedProductIds',
        matchedProducts.map((p) => p._id).join(',')
      );

      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}ai/generate/room-with-products`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: genFormData,
      });

      const { image } = await res.json();
      setState({ generatedImage: `data:image/jpeg;base64,${image}` });
    } catch (err) {
      console.error('Image generation failed:', err);
    }
  };

  const handleAddToCart = (product: any) => {
    const customizationData = {
      analysis: product.analysis,
      generatedRoomImage: generatedImage,
    };
    addToCart(product, customizationData);
  };

  // Optional: Reset store on mount
  useEffect(() => {
    // reset(); // Uncomment if you want to clear previous state each time
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TopBar />
        <Text style={styles.title}>Design Your Room</Text>
        <Text style={styles.description}>
          Upload a room photo and let us match products + generate a visual.
        </Text>

        {/* Style Selector */}
        <View style={styles.styleList}>
          {STYLE_OPTIONS.map((style) => (
            <Pressable
              key={style}
              onPress={() => setState({ selectedStyle: style })}
              style={[
                styles.styleOption,
                selectedStyle === style && styles.selectedStyleOption,
              ]}
            >
              <Text
                style={[
                  styles.styleText,
                  selectedStyle === style && styles.selectedStyleText,
                ]}
              >
                {style}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Upload / Preview */}
        {!selectedImage ? (
          <Pressable style={styles.uploadButton} onPress={pickImage}>
            <MaterialIcons name="add-a-photo" size={40} color={Colors.buttonBackground} />
            <Text style={styles.uploadText}>Upload Room Photo</Text>
          </Pressable>
        ) : (
          <Pressable onPress={pickImage} style={styles.previewWrapper}>
            <Image source={{ uri: selectedImage }} style={styles.previewImage} />
          </Pressable>
        )}

        {/* Analyze Button */}
        {selectedImage && !matchedProducts.length && (
          <Button onPress={analyzeRoom} style={styles.actionButton}>
            Analyze Room
          </Button>
        )}

        {/* Matched Products */}
        {matchedProducts?.length > 0 && (
          <>
            {matchedProducts.map((product) => (
              <MatchedProductCard
                key={product._id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}

            <View style={styles.actionColumn}>
              <Button onPress={analyzeRoom} style={styles.actionButton}>
                Regenerate Product List
              </Button>
              <Button onPress={generateImage} style={styles.actionButton}>
                Generate Room Image
              </Button>
            </View>
          </>
        )}

        {/* Loading States */}
        {loadingList && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.buttonBackground} />
            <Text style={styles.loadingText}>Analyzing room...</Text>
          </View>
        )}

        {loadingImage && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.buttonBackground} />
            <Text style={styles.loadingText}>Generating room image...</Text>
          </View>
        )}

        {/* Final Image */}
        {generatedImage && (
            <>
                <Text style={styles.sectionTitle}>Generated Design</Text>
                <Image source={{ uri: generatedImage }} style={styles.generatedImage} />
                <Button onPress={generateImage} style={styles.regenImageButton}>
                Regenerate Room Image
                </Button>
                <View style={styles.spacer} />
            </>
        )}

        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBackground,
        paddingHorizontal: 16,
        
    },
    scrollContainer: {
        paddingBottom: 30,
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.buttonBackground,
        marginTop: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: Colors.primaryText,
        marginVertical: 15,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    uploadButton: {
        borderWidth: 2,
        borderColor: Colors.buttonBackground,
        borderStyle: 'dashed',
        borderRadius: 15,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    uploadText: {
        color: Colors.buttonBackground,
        fontSize: 18,
        marginTop: 10,
        fontWeight: '500',
    },
    imagePreview: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 15,
        marginVertical: 20,
    },
    generateButton: {
        // marginVertical: 15,
        width: '75%', 
        height: 40
    },
    loadingContainer: {
        alignItems: 'center',
        padding: 30,
    },
    loadingText: {
        marginTop: 15,
        color: Colors.primaryText,
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.buttonBackground,
        textAlign: 'center',
        marginBottom: 15,
    },
    generatedImage: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 15,
    },
    actionColumn: {
        flexDirection: 'column',
        gap: 10,
        marginVertical: 15,
    },
    actionButton: {
        backgroundColor: Colors.buttonBackground,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    regenImageButton: {
        backgroundColor: '#333',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
    },
    spacer: {
        height: 20,
    },
    
    productCard: {
        flexDirection: 'column',
        backgroundColor: Colors.inputBackground,
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
    },
    productImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    productInfo: {
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primaryText,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.buttonBackground,
        marginVertical: 5,
    },
    productDesc: {
        fontSize: 14,
        color: Colors.primaryText,
        marginBottom: 10,
    },
    cartButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        alignSelf: 'flex-start',
    },
    cartButtonText: {
        fontSize: 14,
    },
    analysisBlock: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    analysisTitle: {
        fontWeight: 'bold',
        color: Colors.buttonBackground,
        marginBottom: 5,
    },
    analysisText: {
        fontSize: 12,
        color: Colors.primaryText,
        lineHeight: 18,
    },
    styleSelector: {
        marginTop: 15,
    },
    styleList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginHorizontal: 25
    },
    styleOption: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: Colors.inputBackground,
        borderRadius: 20,
        borderColor: Colors.border,
        borderWidth: 1,
    },
    selectedStyleOption: {
        backgroundColor: Colors.buttonBackground,
        borderColor: Colors.buttonBackground,
    },
    styleText: {
        color: Colors.primaryText,
        fontSize: 14,
    },
    selectedStyleText: {
        color: '#fff',
    },
    previewWrapper: {
        alignItems: 'center',
        marginVertical: 20,
    },
    halfImage: {
        width: '75%',
        aspectRatio: 1,
        borderRadius: 15,
    },
    previewImage: { 
        width: '75%', 
        aspectRatio: 1, 
        borderRadius: 10 
    },
});
