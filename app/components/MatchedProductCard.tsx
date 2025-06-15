import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import ImageWithLoader from "./ImageWithLoader";
import { fetchProductImage } from "@/app/services/api";

interface MatchedProductCardProps {
    product: any;
    onAddToCart: () => void;
    generatedRoomImage?: string | null;
  }

const displayOrNA = (value: any) => {
  if (Array.isArray(value)) return value.length ? value.join(', ') : 'N/A';
  return value || 'N/A';
};

export default function MatchedProductCard({ 
    product, 
    onAddToCart,
    generatedRoomImage
  }: MatchedProductCardProps) {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded(prev => !prev);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {product._id ? (
          <ImageWithLoader
            style={styles.image}
            source={{ uri: fetchProductImage(product._id) }}
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <MaterialIcons name="image" size={40} color={Colors.placeHolderText} />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.name}>{displayOrNA(product.name)}</Text>
          <Text style={styles.price}>{displayOrNA(product.price)} Lei</Text>
          <Text style={styles.description}>{displayOrNA(product.short_description)}</Text>
          <Pressable 
            onPress={onAddToCart} 
            style={({ pressed }) => [
                styles.cartButton,
                pressed && { backgroundColor: Colors.buttonPressedBackground }  // New brighter color
            ]}
            >
            <Text style={styles.cartText}>Add to Cart</Text>
            </Pressable>

          {generatedRoomImage && (
            <View style={styles.generatedRoomContainer}>
            <Text style={styles.generatedRoomLabel}>Customized in Your Room</Text>
            <Image 
                source={{ uri: generatedRoomImage }} 
                style={styles.generatedRoomImage} 
            />
            </View>
        )}
        </View>
      </View>

      {product.analysis && (
        <Pressable onPress={toggle} style={styles.analysisContainer}>
          <Text style={styles.analysisTitle}>AI Analysis {expanded ? '▲' : '▼'}</Text>
          <Text
            style={styles.analysisText}
            numberOfLines={expanded ? undefined : 3}
          >
            Type: {displayOrNA(product.analysis?.furnitureAnalysis?.type)}
            {"\n"}Color: {displayOrNA(product.analysis?.furnitureAnalysis?.color)}
            {"\n"}Style: {displayOrNA(product.analysis?.furnitureAnalysis?.style)}
            {"\n"}Size: {displayOrNA(product.analysis?.furnitureAnalysis?.size)}
            {"\n"}Materials: {displayOrNA(product.analysis?.furnitureAnalysis?.materials)}
            {"\n"}Features: {displayOrNA(product.analysis?.furnitureAnalysis?.features)}
            {"\n"}Condition: {displayOrNA(product.analysis?.furnitureAnalysis?.condition)}
            {"\n\n"}Customization:
            {"\n"}- Color Changes: {displayOrNA(product.analysis?.customizationRecommendations?.colorChanges)}
            {"\n"}- Material Changes: {displayOrNA(product.analysis?.customizationRecommendations?.materialChanges)}
            {"\n"}- Structural Modifications: {displayOrNA(product.analysis?.customizationRecommendations?.structuralModifications)}
            {"\n"}- Feature Additions: {displayOrNA(product.analysis?.customizationRecommendations?.featureAdditions)}
            {"\n"}- Style Transformations: {displayOrNA(product.analysis?.customizationRecommendations?.styleTransformations)}
            {"\n"}- Modularity Suggestions: {displayOrNA(product.analysis?.customizationRecommendations?.modularitySuggestions)}
            {"\n\n"}Summary: {displayOrNA(product.analysis?.summary)}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: Colors.inputBackground,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 7,
    marginRight: 10,
  },
  placeholderContainer: {
    width: 75,
    height: 75,
    backgroundColor: Colors.primaryBackground,
    borderRadius: 7,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  price: {
    fontSize: 16,
    color: Colors.buttonBackground,
    marginVertical: 2,
  },
  description: {
    fontSize: 14,
    color: Colors.primaryText,
  },
  cartButton: {
    marginTop: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.buttonBackground,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  cartText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  analysisContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
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
  generatedRoomContainer: {
    marginTop: 15,
    paddingTop: 10,
  },
  generatedRoomLabel: {
    fontWeight: 'bold',
    color: Colors.buttonBackground,
    marginBottom: 5,
  },
  generatedRoomImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },

});
