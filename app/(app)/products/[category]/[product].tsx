import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '@/app/constants/Colors';
import TopBar from '@/app/components/TopBar';
import Button from '@/app/components/Button';
import { useAuthStore } from '@/app/data/authStore';
import { useCartStore } from '@/app/data/cartStore';
import { useLocalSearchParams } from 'expo-router';

export default function ProductCustomizationScreen() {
  const { product } = useLocalSearchParams();
  const { token } = useAuthStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const [productObject, setProductObject] = useState<any>(null);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [roomImage, setRoomImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [customSelections, setCustomSelections] = useState<Record<string, string>>({});
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [generatingFurniture, setGeneratingFurniture] = useState(false);
  const [generatingRoom, setGeneratingRoom] = useState(false);
  const [generatedFurnitureImage, setGeneratedFurnitureImage] = useState<string | null>(null);
  const [generatedRoomImage, setGeneratedRoomImage] = useState<string | null>(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [customInputs, setCustomInputs] = useState<Record<string, string>>({});

  const formatProductDescription = (description: string) => {
    const normalized = description.replace(/\s{2,}/g, "\n");
    const lines = normalized.trim().split(/\n+/);

    return lines.map((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return null;

      if (/^\*\*.+\*\*$/.test(trimmed)) {
        return (
          <Text key={`heading-${index}`} style={styles.descriptionHeading}>
            {trimmed.replace(/\*\*/g, "")}
          </Text>
        );
      }

      if (/^[•\-✔]/.test(trimmed)) {
        return (
          <View key={`bullet-${index}`} style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>{"\u2022"}</Text>
            <Text style={styles.bulletText}>
              {trimmed.replace(/^[•\-✔]\s*/, "")}
            </Text>
          </View>
        );
      }

      if (/^[A-Za-z\s]+:/.test(trimmed)) {
        return (
          <Text key={`kv-${index}`} style={styles.keyValue}>
            {trimmed}
          </Text>
        );
      }

      return (
        <Text key={`para-${index}`} style={styles.descriptionParagraph}>
          {trimmed}
        </Text>
      );
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}products/${product}`);
        const data = await res.json();
        setProductObject(data);
        setProductImage(`${process.env.EXPO_PUBLIC_API_URL}products/${data._id}/image`);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      }
    };
    if (product) fetchProduct();
  }, [product]);

  // Clear generated images when custom selections change
  useEffect(() => {
    if (generatedFurnitureImage || generatedRoomImage) {
      setGeneratedFurnitureImage(null);
      setGeneratedRoomImage(null);
    }
  }, [customSelections]);

  const pickRoomImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setRoomImage(result.assets[0].uri);
    }
  };

  const analyze = async () => {
    if (!productImage || !roomImage) return;
    setLoadingAnalysis(true);
    try {
      const formData = new FormData();
      formData.append('furnitureImage', {
        uri: productImage,
        name: 'furniture.jpg',
        type: 'image/jpeg',
      } as any);
      formData.append('roomImage', {
        uri: roomImage,
        name: 'room.jpg',
        type: 'image/jpeg',
      } as any);

      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}ai/analyze-furniture`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const text = await res.text();
      const data = JSON.parse(text);
      setAnalysis(data);
    } catch (err) {
      console.error('Analysis failed:', err);
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const handleSelect = (category: string, value: string) => {
    setCustomSelections((prev) => ({ ...prev, [category]: value }));
  };

  const handleCustomInput = (category: string, text: string) => {
    setCustomInputs(prev => ({ ...prev, [category]: text }));
    setCustomSelections(prev => ({ ...prev, [category]: text }));
  };

  const generateImage = async (inRoom = false) => {
    if (!analysis) return;
    
    // Set loading state
    if (inRoom) {
      setGeneratingRoom(true);
    } else {
      setGeneratingFurniture(true);
    }

    try {
      const formData = new FormData();
      
      // Use generated furniture image for in-room generation if available
      if (inRoom && generatedFurnitureImage) {
        const base64Data = generatedFurnitureImage.split(',')[1];
        const fileName = `generated-furniture-${Date.now()}.jpg`;
        const fileUri = FileSystem.cacheDirectory + fileName;
        await FileSystem.writeAsStringAsync(fileUri, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });
        
        formData.append('furnitureImage', {
          uri: fileUri,
          name: fileName,
          type: 'image/jpeg',
        } as any);
      } else {
        formData.append('furnitureImage', {
          uri: productImage!,
          name: 'furniture.jpg',
          type: 'image/jpeg',
        } as any);
      }

      if (inRoom && roomImage) {
        formData.append('roomImage', {
          uri: roomImage,
          name: 'room.jpg',
          type: 'image/jpeg',
        } as any);
      }

      const modifiedAnalysis = { ...analysis };
      Object.entries(customSelections).forEach(([key, value]) => {
        if (modifiedAnalysis.customizationRecommendations?.[key]) {
          modifiedAnalysis.customizationRecommendations[key] = [value];
        }
        if (["placementSuggestions", "accessoryRecommendations"].includes(key)) {
          modifiedAnalysis[key] = [value];
        }
      });

      formData.append('analysis', JSON.stringify(modifiedAnalysis));

      const endpoint = inRoom
        ? `${process.env.EXPO_PUBLIC_API_URL}ai/generate/in-room`
        : `${process.env.EXPO_PUBLIC_API_URL}ai/generate/furniture-only`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const text = await res.text();
      const data = JSON.parse(text);

      if (inRoom) {
        setGeneratedRoomImage(`data:image/jpeg;base64,${data.image}`);
      } else {
        setGeneratedFurnitureImage(`data:image/jpeg;base64,${data.image}`);
      }
    } catch (err) {
      console.error('Image generation failed:', err);
    } finally {
      if (inRoom) {
        setGeneratingRoom(false);
      } else {
        setGeneratingFurniture(false);
      }
    }
  };

  if (!productObject) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.buttonBackground} />
      </View>
    );
  }

  const allDescriptionElements = formatProductDescription(productObject.long_description);
  const visibleDescription = descriptionExpanded 
    ? allDescriptionElements 
    : allDescriptionElements.slice(0, 2);

  // Format camelCase titles to readable format
  const formatTitle = (str: string) => {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace('Changes', '')
      .trim();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TopBar />

        {/* Product Details */}
        <View style={styles.titleContainer}>
          <Image 
            source={{ uri: productImage || undefined }} 
            style={styles.homeImage} 
          />
          <Text style={styles.categoriesText}>{productObject.name}</Text>
          <Text style={styles.shortDescription}>{productObject.short_description}</Text>
          <Text style={styles.priceText}>{productObject.price} Lei</Text>
          
          <Button
            onPress={() => addToCart(productObject)}
            style={styles.cartButton}
            textStyle={styles.cartButtonText}
          >
            Add to cart
          </Button>
        </View>

        {/* Description Section */}
        <Pressable onPress={() => setDescriptionExpanded(prev => !prev)} hitSlop={10}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.longDescriptionHeader}>Description</Text>
            {visibleDescription}
            <Text style={styles.readMoreText}>
              {descriptionExpanded ? "Show Less ▲" : "Read More ▼"}
            </Text>
          </View>
        </Pressable>

        {/* Customization Section */}
        <Text style={styles.sectionHeader}>Customize for Your Room</Text>
        
        <Pressable onPress={pickRoomImage} style={styles.uploadBtn}>
          <MaterialIcons name="photo" size={32} color={Colors.buttonBackground} />
          <Text style={styles.uploadLabel}>Upload Room Image</Text>
        </Pressable>
        {roomImage && <Image source={{ uri: roomImage }} style={styles.preview} />}

        <Button onPress={analyze} style={styles.actionBtn} disabled={!roomImage}>
          Analyze Room
        </Button>

        {loadingAnalysis && (
          <View style={styles.loadingBlock}>
            <ActivityIndicator size="large" color={Colors.buttonBackground} />
            <Text style={styles.loadingText}>Analyzing your room...</Text>
          </View>
        )}

        {analysis && (
          <>
            <Text style={styles.sectionHeader}>Customization Options</Text>
            
            {/* Customization Options */}
            {Object.entries(analysis.customizationRecommendations || {}).map(([key, options]) => {
              const optionsList = options as string[];
              const isCustomSelected = customSelections[key] && 
                !optionsList.includes(customSelections[key]);
              
              return (
                <View key={key} style={styles.optionGroup}>
                  <Text style={styles.optionLabel}>{formatTitle(key)}</Text>
                  
                  {optionsList.map((opt) => (
                    <Pressable 
                      key={opt} 
                      onPress={() => handleSelect(key, opt)}
                      style={[
                        styles.radioOption,
                        customSelections[key] === opt && styles.radioOptionSelected
                      ]}
                    >
                      <View style={styles.radioCircle}>
                        {customSelections[key] === opt && <View style={styles.radioInnerCircle} />}
                      </View>
                      <Text style={styles.optionItem}>{opt}</Text>
                    </Pressable>
                  ))}
                  
                  {/* Custom option with radio button */}
                  <Pressable 
                    onPress={() => handleSelect(key, customInputs[key] || '')}
                    style={[
                      styles.radioOption,
                      isCustomSelected && styles.radioOptionSelected
                    ]}
                  >
                    <View style={styles.radioCircle}>
                      {isCustomSelected && <View style={styles.radioInnerCircle} />}
                    </View>
                    <Text style={styles.optionItem}>Custom:</Text>
                    <TextInput
                      style={[styles.customInput, isCustomSelected && styles.customInputSelected]}
                      placeholder={`Enter custom ${formatTitle(key)}`}
                      value={customInputs[key] || ''}
                      onChangeText={(text) => handleCustomInput(key, text)}
                    />
                  </Pressable>
                </View>
              );
            })}

            {/* Placement Suggestions */}
            {analysis.placementSuggestions && (
              <View style={styles.optionGroup}>
                <Text style={styles.optionLabel}>Placement Suggestions</Text>
                {analysis.placementSuggestions.map((opt: string) => (
                  <Pressable 
                    key={opt} 
                    onPress={() => handleSelect('placementSuggestions', opt)}
                    style={[
                      styles.radioOption,
                      customSelections['placementSuggestions'] === opt && styles.radioOptionSelected
                    ]}
                  >
                    <View style={styles.radioCircle}>
                      {customSelections['placementSuggestions'] === opt && <View style={styles.radioInnerCircle} />}
                    </View>
                    <Text style={styles.optionItem}>{opt}</Text>
                  </Pressable>
                ))}
                
                {/* Custom placement option */}
                <Pressable 
                  onPress={() => handleSelect('placementSuggestions', customInputs.placement || '')}
                  style={[
                    styles.radioOption,
                    customSelections['placementSuggestions'] && 
                    !analysis.placementSuggestions.includes(customSelections['placementSuggestions']) && 
                    styles.radioOptionSelected
                  ]}
                >
                  <View style={styles.radioCircle}>
                    {customSelections['placementSuggestions'] && 
                     !analysis.placementSuggestions.includes(customSelections['placementSuggestions']) && 
                     <View style={styles.radioInnerCircle} />}
                  </View>
                  <Text style={styles.optionItem}>Custom:</Text>
                  <TextInput
                    style={[styles.customInput, 
                      customSelections['placementSuggestions'] && 
                      !analysis.placementSuggestions.includes(customSelections['placementSuggestions']) && 
                      styles.customInputSelected
                    ]}
                    placeholder="Enter custom placement"
                    value={customInputs.placement || ''}
                    onChangeText={(text) => handleCustomInput('placement', text)}
                  />
                </Pressable>
              </View>
            )}

            {/* Accessory Recommendations */}
            {analysis.accessoryRecommendations && (
              <View style={styles.optionGroup}>
                <Text style={styles.optionLabel}>Accessory Recommendations</Text>
                {analysis.accessoryRecommendations.map((opt: string) => (
                  <Pressable 
                    key={opt} 
                    onPress={() => handleSelect('accessoryRecommendations', opt)}
                    style={[
                      styles.radioOption,
                      customSelections['accessoryRecommendations'] === opt && styles.radioOptionSelected
                    ]}
                  >
                    <View style={styles.radioCircle}>
                      {customSelections['accessoryRecommendations'] === opt && <View style={styles.radioInnerCircle} />}
                    </View>
                    <Text style={styles.optionItem}>{opt}</Text>
                  </Pressable>
                ))}
                
                {/* Custom accessory option */}
                <Pressable 
                  onPress={() => handleSelect('accessoryRecommendations', customInputs.accessory || '')}
                  style={[
                    styles.radioOption,
                    customSelections['accessoryRecommendations'] && 
                    !analysis.accessoryRecommendations.includes(customSelections['accessoryRecommendations']) && 
                    styles.radioOptionSelected
                  ]}
                >
                  <View style={styles.radioCircle}>
                    {customSelections['accessoryRecommendations'] && 
                     !analysis.accessoryRecommendations.includes(customSelections['accessoryRecommendations']) && 
                     <View style={styles.radioInnerCircle} />}
                  </View>
                  <Text style={styles.optionItem}>Custom:</Text>
                  <TextInput
                    style={[styles.customInput, 
                      customSelections['accessoryRecommendations'] && 
                      !analysis.accessoryRecommendations.includes(customSelections['accessoryRecommendations']) && 
                      styles.customInputSelected
                    ]}
                    placeholder="Enter custom accessory"
                    value={customInputs.accessory || ''}
                    onChangeText={(text) => handleCustomInput('accessory', text)}
                  />
                </Pressable>
              </View>
            )}

            {/* Image Generation Buttons */}
            <View style={styles.generationButtons}>
              <Button 
                onPress={() => generateImage(false)} 
                disabled={generatingFurniture}
                style={styles.generationButton}
              >
                {generatingFurniture 
                  ? <ActivityIndicator size="small" color="#fff" /> 
                  : 'Generate Furniture'}
              </Button>
              
              <Button 
                onPress={() => generateImage(true)} 
                disabled={generatingRoom || !generatedFurnitureImage}
                style={styles.generationButton}
              >
                {generatingRoom 
                  ? <ActivityIndicator size="small" color="#fff" /> 
                  : 'Generate In Room'}
              </Button>
            </View>

            {/* Generated Images */}
            {(generatedFurnitureImage || generatedRoomImage) && (
              <View style={styles.generatedImagesContainer}>
                {generatedFurnitureImage && (
                  <View style={styles.generatedImageWrapper}>
                    <Text style={styles.generatedImageLabel}>Custom Furniture</Text>
                    <Image 
                      source={{ uri: generatedFurnitureImage }} 
                      style={styles.generated} 
                    />
                  </View>
                )}
                
                {generatedRoomImage && (
                  <View style={styles.generatedImageWrapper}>
                    <Text style={styles.generatedImageLabel}>In Your Room</Text>
                    <Image 
                      source={{ uri: generatedRoomImage }} 
                      style={styles.generated} 
                    />
                  </View>
                )}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryBackground,
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    paddingBottom: 30,
    flexGrow: 1,
  },
  titleContainer: {
    backgroundColor: Colors.inputBackground,
    padding: 12,
    borderRadius: 20,
    marginBottom: 15,
  },
  homeImage: {
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 15,
  },
  categoriesText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.buttonBackground,
    marginBottom: 5,
  },
  shortDescription: {
    fontSize: 16,
    color: Colors.primaryText,
    marginVertical: 10,
  },
  priceText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.inputText,
    marginTop: 5,
    marginBottom: 10,
  },
  cartButton: {
    width: '100%',
    height: 42,
    borderRadius: 10,
  },
  cartButtonText: {
    fontWeight: 'bold',
  },
  descriptionContainer: {
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
  longDescriptionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.inputText,
    marginBottom: 15,
  },
  descriptionHeading: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.buttonBackground,
    marginTop: 10,
    marginBottom: 5,
  },
  descriptionParagraph: {
    fontSize: 14,
    color: Colors.primaryText,
    lineHeight: 22,
    marginBottom: 10,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    marginLeft: 10,
    paddingRight: 10,
  },
  bulletPoint: {
    color: Colors.primaryText,
    fontSize: 14,
    marginRight: 6,
    lineHeight: 22,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: Colors.primaryText,
    lineHeight: 22,
  },
  keyValue: {
    fontSize: 14,
    marginBottom: 4,
    fontStyle: 'italic',
    color: Colors.primaryText,
  },
  readMoreText: {
    marginTop: 10,
    textAlign: 'right',
    color: Colors.buttonBackground,
    fontSize: 13,
    opacity: 0.8,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.buttonBackground,
    marginVertical: 15,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  uploadLabel: {
    color: Colors.primaryText,
    marginLeft: 10,
  },
  preview: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  actionBtn: {
    marginBottom: 20,
  },
  loadingBlock: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    color: Colors.primaryText,
    marginTop: 10,
  },
  optionGroup: {
    backgroundColor: Colors.inputBackground,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionLabel: {
    fontWeight: '600',
    marginBottom: 10,
    color: Colors.primaryText,
    fontSize: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 8,
    marginBottom: 5,
  },
  radioOptionSelected: {
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.buttonBackground,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInnerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.buttonBackground,
  },
  optionItem: {
    color: Colors.primaryText,
    fontSize: 14,
    marginRight: 10,
  },
  customInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 10,
    color: Colors.inputText,
    backgroundColor: Colors.primaryBackground,
  },
  customInputSelected: {
    backgroundColor: '#e3f2fd',
    borderColor: Colors.buttonBackground,
  },
  generationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },
  generationButton: {
    flex: 1,
  },
  generatedImagesContainer: {
    gap: 20,
  },
  generatedImageWrapper: {
    marginBottom: 15,
  },
  generatedImageLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
    marginBottom: 8,
  },
  generated: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
  },
});