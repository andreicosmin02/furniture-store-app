import FancyInput from "@/app/components/FancyInput";
import TopBar from "@/app/components/TopBar";
import Colors from "@/app/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";
import useCartStore, { CartItem } from "@/app/data/cartStore";
import { Product } from "@/app/types/product";
import ImageWithLoader from "@/app/components/ImageWithLoader";
import Button from "@/app/components/Button";
import { RelativePathString, router } from "expo-router";
import { useAuthStore } from "@/app/data/authStore";

export default function Cart() {
  const { items, clearCart } = useCartStore();
  const { token } = useAuthStore();
  
  // Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Calculate total price
  const total = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const CartItemDetails = ({ item }: { item: CartItem }) => {
    const [expanded, setExpanded] = useState(false);
    
    return (
      <View style={styles.itemContainer}>  
        <Pressable
            onPress={() => router.navigate(`products/${item.product.category}/${item.product._id}` as RelativePathString)}
        >
            <ImageWithLoader
                source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}products/${item.product._id}/image` }}
                style={styles.itemImage}
            />
        </Pressable>
        <View style={styles.itemDetails}>
          <Pressable onPress={() => router.navigate(`products/${item.product.category}/${item.product._id}` as RelativePathString)}>
            <Text style={styles.itemName}>{item.product.name}</Text>
            <Text style={styles.itemPrice}>{item.product.price.toFixed(2)} Lei</Text>
          </Pressable>
          
          {/* Quantity Controls */}
          <View style={styles.quantityContainer}>
            <Pressable
              style={styles.quantityButton}
              onPress={() => useCartStore.getState().decrementQuantity(item.product._id)}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </Pressable>

            <Text style={styles.quantityText}>{item.quantity}</Text>

            <Pressable
              style={styles.quantityButton}
              onPress={() => useCartStore.getState().incrementQuantity(item.product._id)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>
          
          {/* Customization Display */}
          {item.customization && (
            <View style={styles.customizationContainer}>
                {item.customization.generatedRoomImage ? (
                <View style={styles.customizationImageWrapper}>
                    <Text style={styles.customizationLabel}>For Your Room</Text>
                    <ImageWithLoader
                    source={{ uri: item.customization.generatedRoomImage }}
                    style={styles.customizationImage}
                    />
                </View>
                ) : item.customization.generatedImage ? (
                <View style={styles.customizationImageWrapper}>
                    <Text style={styles.customizationLabel}>Custom Furniture</Text>
                    <Image
                    source={{ uri: item.customization.generatedImage }}
                    style={styles.customizationImage}
                    />
                </View>
                ) : null}
              
              {/* Show full analysis */}
              {item.customization.analysis && (
                <Pressable 
                  onPress={() => setExpanded(!expanded)}
                  style={styles.analysisToggle}
                >
                  <Text style={styles.analysisLabel}>
                    {expanded ? '▲ Hide Full Analysis' : '▼ Show Full Analysis'}
                  </Text>
                </Pressable>
              )}
              
              {expanded && item.customization.analysis && (
                <View style={styles.analysisContainer}>
                  {/* Furniture Analysis */}
                  {item.customization.analysis.furnitureAnalysis && (
                    <View style={styles.analysisSection}>
                      <Text style={styles.analysisTitle}>Furniture Analysis</Text>
                      {Object.entries(item.customization.analysis.furnitureAnalysis).map(([key, value]) => (
                        <Text key={key} style={styles.analysisText}>
                          <Text style={styles.analysisKey}>{key}:</Text> {String(value)}
                        </Text>
                      ))}
                    </View>
                  )}
                  
                  {/* Room Analysis */}
                  {item.customization.analysis.roomAnalysis && (
                    <View style={styles.analysisSection}>
                      <Text style={styles.analysisTitle}>Room Analysis</Text>
                      {Object.entries(item.customization.analysis.roomAnalysis).map(([key, value]) => (
                        <Text key={key} style={styles.analysisText}>
                          <Text style={styles.analysisKey}>{key}:</Text> {String(value)}
                        </Text>
                      ))}
                    </View>
                  )}
                  
                  {/* Customization Recommendations */}
                  {item.customization.analysis.customizationRecommendations && (
                    <View style={styles.analysisSection}>
                      <Text style={styles.analysisTitle}>Customization Recommendations</Text>
                      {Object.entries(item.customization.analysis.customizationRecommendations).map(([category, options]) => (
                        <View key={category} style={styles.recommendationCategory}>
                          <Text style={styles.recommendationTitle}>{category}:</Text>
                          {Array.isArray(options) && options.map((opt, index) => (
                            <Text key={index} style={styles.recommendationItem}>• {opt}</Text>
                          ))}
                        </View>
                      ))}
                    </View>
                  )}
                  
                  {/* Placement Suggestions */}
                  {item.customization.analysis.placementSuggestions && (
                    <View style={styles.analysisSection}>
                      <Text style={styles.analysisTitle}>Placement Suggestions</Text>
                      {item.customization.analysis.placementSuggestions.map((suggestion: string, index: number) => (
                        <Text key={index} style={styles.placementItem}>• {suggestion}</Text>
                      ))}
                    </View>
                  )}
                  
                  {/* Accessory Recommendations */}
                  {item.customization.analysis.accessoryRecommendations && (
                    <View style={styles.analysisSection}>
                      <Text style={styles.analysisTitle}>Accessory Recommendations</Text>
                      {item.customization.analysis.accessoryRecommendations.map((accessory: string, index: number) => (
                        <Text key={index} style={styles.accessoryItem}>• {accessory}</Text>
                      ))}
                    </View>
                  )}
                  
                  {/* Summary and Confidence */}
                  <View style={styles.analysisSection}>
                    <Text style={styles.analysisTitle}>Summary</Text>
                    <Text style={styles.analysisText}>{item.customization.analysis.summary}</Text>
                    <Text style={styles.confidenceScore}>
                      Confidence Score: {item.customization.analysis.confidenceScore || 'N/A'}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>

        <Pressable
          style={styles.removeButton}
          onPress={() => useCartStore.getState().removeFromCart(item.product._id)}
        >
          <Text style={styles.removeText}>×</Text>
        </Pressable>
      </View>
    );
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <CartItemDetails item={item} />
  );

  const handlePlaceOrder = async () => {
    if (!fullName || !phone || !email || !address) {
      alert("Please fill in all required delivery information");
      return;
    }
    
    setIsPlacingOrder(true);
    
    try {
      // Prepare order payload
      const orderPayload = {
        products: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          // Include customization data if exists
          ...(item.customization && {
            furnitureImageBase64: item.customization.generatedImage 
              ? item.customization.generatedImage.split(',')[1]
              : undefined,
            customizationAnalysis: item.customization.analysis 
              ? JSON.stringify(item.customization.analysis) 
              : undefined
          })
        })),
        deliveryInfo: {
          fullName,
          phone,
          email,
          address,
          notes
        }
      };
      
      // Send to backend
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}orders`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderPayload)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to place order');
      }
      
      // Clear cart on success
      clearCart();
      router.navigate('/home');
      alert('Order placed successfully!');
      
    } catch (error: any) {
      console.error('Order submission error:', error);
      alert(`Failed to place order: ${error.message || 'Please try again'}`);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SafeAreaView style={styles.safeAreaView}>
          <TopBar/>
          
          {items.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Your cart is empty</Text>
            </View>
          ) : (
            <>
              <FlatList
                data={items}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.product._id}
                scrollEnabled={false}
              />

              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalAmount}>{total.toFixed(2)} Lei</Text>
              </View>

              <View style={styles.deliveryContainer}>
                <Text style={styles.sectionTitle}>Delivery Information</Text>

                <FancyInput
                  label="Full Name *"
                  placeholder="Enter your full name"
                  icon="person"
                  value={fullName}
                  onChangeText={setFullName}
                />

                <FancyInput
                  label="Phone Number *"
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  icon="phone"
                  value={phone}
                  onChangeText={setPhone}
                />

                <FancyInput
                  label="Email Address *"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  icon="email"
                  value={email}
                  onChangeText={setEmail}
                />

                <FancyInput
                  label="Delivery Address *"
                  placeholder="Street, Number, Apartment"
                  multiline
                  numberOfLines={3}
                  icon="home"
                  value={address}
                  onChangeText={setAddress}
                />

                <FancyInput
                  label="Additional Notes"
                  placeholder="Special instructions (optional)"
                  multiline
                  numberOfLines={2}
                  icon="notes"
                  value={notes}
                  onChangeText={setNotes}
                />

                <Button
                  onPress={handlePlaceOrder}
                  disabled={isPlacingOrder}
                  style={styles.submitButton}
                >
                  {isPlacingOrder 
                    ? <ActivityIndicator size="small" color="#fff" /> 
                    : 'Place Order'}
                </Button>
              </View>
            </>
          )}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryBackground,
    flex: 1,
    paddingHorizontal: 10
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  safeAreaView: {
    maxWidth: 400,
    minWidth: 200,
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.inputBackground,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderColor: Colors.border,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: Colors.primaryText,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.buttonBackground,
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 15,
    color: Colors.primaryText,
  },
  customizationContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 10,
  },
  customizationImageWrapper: {
    marginBottom: 15,
  },
  customizationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.buttonBackground,
    marginBottom: 5,
  },
  customizationImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 5,
  },
  analysisToggle: {
    paddingVertical: 8,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  analysisLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.buttonBackground,
  },
  analysisContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(170, 118, 82, 0.1)',
    borderRadius: 8,
  },
  analysisSection: {
    marginBottom: 15,
  },
  analysisTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.buttonBackground,
    marginBottom: 5,
  },
  analysisKey: {
    fontWeight: '600',
    color: Colors.primaryText,
  },
  analysisText: {
    fontSize: 12,
    color: Colors.primaryText,
    lineHeight: 16,
    marginBottom: 3,
  },
  recommendationCategory: {
    marginBottom: 8,
  },
  recommendationTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primaryText,
    marginBottom: 2,
  },
  recommendationItem: {
    fontSize: 12,
    color: Colors.primaryText,
    lineHeight: 16,
    marginLeft: 10,
  },
  placementItem: {
    fontSize: 12,
    color: Colors.primaryText,
    lineHeight: 16,
    marginLeft: 10,
    marginBottom: 2,
  },
  accessoryItem: {
    fontSize: 12,
    color: Colors.primaryText,
    lineHeight: 16,
    marginLeft: 10,
    marginBottom: 2,
  },
  confidenceScore: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.buttonBackground,
    marginTop: 5,
  },
  removeButton: {
    padding: 8,
    marginLeft: 10,
  },
  removeText: {
    fontSize: 24,
    color: Colors.error,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.placeHolderText,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: Colors.inputBackground,
    borderRadius: 10,
    marginTop: 10,
    borderColor: Colors.border,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.buttonBackground,
  },
  deliveryContainer: {
    backgroundColor: Colors.buttonText,
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryText,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: Colors.buttonBackground,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});