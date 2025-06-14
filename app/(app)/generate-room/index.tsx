import { useState } from 'react';
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
import { useAuthStore } from '@/app/data/authStore';
import Button from '@/app/components/Button';
import MatchedProductCard from '@/app/components/MatchedProductCard';

// Styles available
const STYLE_OPTIONS = [
  'modern',
  'minimalist',
  'scandinavian',
  'industrial',
  'bohemian',
  'rustic',
  'coastal',
  'mid-century',
  'traditional',
  'transitional',
  'gothic'
];

export default function GenerateRoom() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>('modern');
  const [loadingList, setLoadingList] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [matchedProducts, setMatchedProducts] = useState<any[]>([]);
  const { token } = useAuthStore();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setMatchedProducts([]);
      setGeneratedImage(null);
    }
  };

  const analyzeRoom = async () => {
    if (!selectedImage) return;

    setLoadingList(true);
    setMatchedProducts([]);
    setGeneratedImage(null);

    try {
      const formData = new FormData();
      formData.append('roomImage', {
        uri: selectedImage,
        name: 'room.jpg',
        type: 'image/jpeg',
      } as any);
      formData.append('style', selectedStyle);

      const analysisRes = await fetch(`${process.env.EXPO_PUBLIC_API_URL}ai/analyze/room-with-products`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const analysis = await analysisRes.json();
      console.log('Full analysis:', analysis);

      const productIds = analysis.selectedProducts.map((p: any) => p.productId);

      const productsRes = await fetch(`${process.env.EXPO_PUBLIC_API_URL}products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allProducts = await productsRes.json();

      const enriched = allProducts
        .filter((prod: any) => productIds.includes(prod._id))
        .map((prod: any) => {
          const analysisData = analysis.selectedProducts.find((a: any) => a.productId === prod._id);
          return { ...prod, analysis: analysisData?.analysis };
        });

      setMatchedProducts(enriched);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setLoadingList(false);
    }
  };

  const generateImage = async () => {
    if (!selectedImage || matchedProducts.length === 0) return;

    setLoadingImage(true);
    setGeneratedImage(null);

    try {
      const genFormData = new FormData();
      genFormData.append('roomImage', {
        uri: selectedImage,
        name: 'room.jpg',
        type: 'image/jpeg',
      } as any);
      genFormData.append('style', selectedStyle);
      genFormData.append('selectedProductIds', matchedProducts.map(p => p._id).join(','));

      const genResponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}ai/generate/room-with-products`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: genFormData,
      });

      const genResult = await genResponse.json();
      setGeneratedImage(`data:image/jpeg;base64,${genResult.image}`);
    } catch (error) {
      console.error('Image generation error:', error);
    } finally {
      setLoadingImage(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Design Your Room</Text>
        <Text style={styles.description}>
          Upload a photo of your room and we'll match furniture and generate a visual.
        </Text>

        {/* Style Selection */}
        <View style={styles.styleSelector}>
          {/* <Text style={styles.sectionTitle}>Select a Style</Text> */}
          <View style={styles.styleList}>
            {STYLE_OPTIONS.map(style => (
              <Pressable
                key={style}
                onPress={() => setSelectedStyle(style)}
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
        </View>

        {/* Upload or Preview */}
        {!selectedImage ? (
          <Pressable style={styles.uploadButton} onPress={pickImage}>
            <MaterialIcons name="add-a-photo" size={40} color={Colors.buttonBackground} />
            <Text style={styles.uploadText}>Upload Room Photo</Text>
          </Pressable>
        ) : (
          <>
            <Pressable onPress={pickImage} style={styles.previewWrapper}>
                <Image source={{ uri: selectedImage }} style={styles.halfImage} />
            </Pressable>
            {!matchedProducts.length && !loadingList && (
              <Button onPress={analyzeRoom} style={styles.generateButton}>
                Analyze Room
              </Button>
            )}
          </>
        )}

        {/* Room Analysis Loading */}
        {loadingList && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.buttonBackground} />
            <Text style={styles.loadingText}>Analyzing room...</Text>
          </View>
        )}

        {/* Matched Products */}
        {matchedProducts.map(product => (
          <MatchedProductCard
            key={product._id}
            product={product}
            onAddToCart={() => console.log('Add to cart', product._id)}
          />
        ))}

        {/* Action Buttons */}
        {matchedProducts.length > 0 && !loadingImage && (
          <View style={styles.actionColumn}>
            <Button onPress={analyzeRoom} style={styles.actionButton}>
              Regenerate Product List
            </Button>
            <Button onPress={generateImage} style={styles.actionButton}>
              Generate Room Image
            </Button>
          </View>
        )}

        {/* Image Generation Loading */}
        {loadingImage && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.buttonBackground} />
            <Text style={styles.loadingText}>Generating room design...</Text>
          </View>
        )}

        {/* Generated Image */}
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

        <View style={{ height: 60 }} />
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
});
