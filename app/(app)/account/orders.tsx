import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Pressable,
    ActivityIndicator,
  } from "react-native";
  import Colors from "@/app/constants/Colors";
  import { useAuthStore } from "@/app/data/authStore";
  import { useEffect, useState } from "react";
  import { MaterialIcons } from "@expo/vector-icons";
  import Button from "@/app/components/Button";
  import ImageWithLoader from "@/app/components/ImageWithLoader";
  
  interface Customization {
    analysis?: any;
    generatedImage?: string;
  }
  
  interface OrderItem {
    _id: string;
    product: {
      _id: string;
      name: string;
      price: number;
    };
    quantity: number;
    status: string;
    customization?: Customization;
  }
  
  interface Order {
    _id: string;
    orderDate: string;
    status: string;
    items: OrderItem[];
    total: number;
  }
  
  export default function OrdersScreen() {
    const { token } = useAuthStore();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [customImageMap, setCustomImageMap] = useState<{ [itemId: string]: string }>({});
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
  
        for (const order of data) {
          for (const item of order.items) {
            const uri = `${process.env.EXPO_PUBLIC_API_URL}orders/${order._id}/item/${item._id}/image`;
            try {
              const imgRes = await fetch(uri, {
                headers: { Authorization: `Bearer ${token}` },
              });
              const blob = await imgRes.blob();
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64 = reader.result?.toString().split(',')[1];
                if (base64) {
                  setCustomImageMap((prev) => ({ ...prev, [item._id]: base64 }));
                }
              };
              reader.readAsDataURL(blob);
            } catch (e) {
              console.error(`Could not load custom image for item ${item._id}`, e);
            }
          }
        }
        setOrders(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchOrders();
    }, []);
  
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  
    const renderAnalysis = (analysis: any) => {
        if (!analysis || Object.keys(analysis).length === 0) return null;
      
        return (
          <View style={styles.analysisContainer}>
            {analysis.summary && (
              <Text style={styles.analysisText}><Text style={styles.analysisKey}>Summary:</Text> {analysis.summary}</Text>
            )}
            {typeof analysis.confidenceScore !== 'undefined' && (
              <Text style={styles.analysisText}><Text style={styles.analysisKey}>Confidence Score:</Text> {analysis.confidenceScore}</Text>
            )}
            {analysis.furnitureAnalysis && (
              <View style={styles.analysisSection}>
                <Text style={styles.analysisTitle}>Furniture Analysis</Text>
                {Object.entries(analysis.furnitureAnalysis).map(([k, v]) => (
                  <Text key={k} style={styles.analysisText}>
                    <Text style={styles.analysisKey}>{k}:</Text> {String(v)}
                  </Text>
                ))}
              </View>
            )}
            {analysis.roomAnalysis && (
              <View style={styles.analysisSection}>
                <Text style={styles.analysisTitle}>Room Analysis</Text>
                {Object.entries(analysis.roomAnalysis).map(([k, v]) => (
                  <Text key={k} style={styles.analysisText}>
                    <Text style={styles.analysisKey}>{k}:</Text> {String(v)}
                  </Text>
                ))}
              </View>
            )}
            {Array.isArray(analysis.placementSuggestions) && analysis.placementSuggestions.length > 0 && (
              <View style={styles.analysisSection}>
                <Text style={styles.analysisTitle}>Placement Suggestions</Text>
                {analysis.placementSuggestions.map((s: string, idx: number) => (
                  <Text key={idx} style={styles.analysisText}>• {s}</Text>
                ))}
              </View>
            )}
            {Array.isArray(analysis.accessoryRecommendations) && analysis.accessoryRecommendations.length > 0 && (
              <View style={styles.analysisSection}>
                <Text style={styles.analysisTitle}>Accessory Recommendations</Text>
                {analysis.accessoryRecommendations.map((s: string, idx: number) => (
                  <Text key={idx} style={styles.analysisText}>• {s}</Text>
                ))}
              </View>
            )}
          </View>
        );
      };
  
    if (loading) return <View style={styles.loadingContainer}><ActivityIndicator size="large" color={Colors.buttonBackground} /></View>;
    if (error) return <View style={styles.container}><Text style={styles.errorText}>{error}</Text><Button onPress={fetchOrders}>Retry</Button></View>;
    if (!orders.length) return <View style={styles.container}><Text style={styles.noOrdersText}>You have no orders yet</Text></View>;
  
    return (
      <ScrollView style={styles.container}>
        {orders.map(order => (
          <View key={order._id} style={styles.orderCard}>
            <Pressable onPress={() => expandedOrder === order._id ? setExpandedOrder(null) : setExpandedOrder(order._id)} style={styles.orderHeader}>
              <View>
                <Text style={styles.orderDate}>{formatDate(order.orderDate)}</Text>
                <Text style={styles.orderStatus}>Status: {order.status}</Text>
                <Text style={styles.orderTotal}>Total: {order.total.toFixed(2)} Lei</Text>
              </View>
              <MaterialIcons name={expandedOrder === order._id ? "expand-less" : "expand-more"} size={24} color={Colors.primaryText} />
            </Pressable>
   
            {expandedOrder === order._id && (
              <View style={styles.orderItemsContainer}>
                {order.items.map(item => (
                  <View key={item._id} style={styles.orderItem}>
                    <View style={styles.itemHeader}>
                      <ImageWithLoader
                        source={{
                          uri: `${process.env.EXPO_PUBLIC_API_URL}products/${item.product._id}/image`,
                          headers: { Authorization: `Bearer ${token}` },
                        }}
                        style={styles.itemImage}
                      />
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.product.name}</Text>
                        <View style={styles.itemDetails}>
                          <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                          <Text style={styles.itemPrice}>{item.product.price.toFixed(2)} Lei</Text>
                          <Text style={styles.itemStatus}>Status: {item.status}</Text>
                        </View>
                      </View>
                    </View>
  
                    <Text style={styles.customizationLabel}>Customized Version</Text>
                    {customImageMap[item._id] ? (
                      <ImageWithLoader
                        source={{ uri: `data:image/png;base64,${customImageMap[item._id]}` }}
                        style={styles.customizationImage}
                      />
                    ) : (
                      <ActivityIndicator size="small" color={Colors.buttonBackground} />
                    )}
  
                    {item.customization?.analysis && renderAnalysis(item.customization.analysis)}
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primaryBackground,
      padding: 15,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primaryBackground,
    },
    errorText: {
      color: Colors.error,
      fontSize: 16,
      textAlign: 'center',
      marginVertical: 20,
    },
    noOrdersText: {
      fontSize: 18,
      color: Colors.primaryText,
      textAlign: 'center',
      marginTop: 50,
    },
    orderCard: {
      backgroundColor: Colors.inputBackground,
      borderRadius: 10,
      marginBottom: 15,
      overflow: 'hidden',
    },
    orderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
    },
    orderDate: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.primaryText,
    },
    orderStatus: {
      fontSize: 14,
      color: Colors.primaryText,
      marginTop: 5,
    },
    orderTotal: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.buttonBackground,
      marginTop: 5,
    },
    orderItemsContainer: {
      padding: 15,
      borderTopWidth: 1,
      borderTopColor: Colors.border,
    },
    orderItem: {
      marginBottom: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,
    },
    itemHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 10,
    },
    itemInfo: {
      flex: 1,
    },
    itemName: {
      fontSize: 16,
      color: Colors.primaryText,
      fontWeight: '600',
    },
    itemDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
    },
    itemQuantity: {
      fontSize: 14,
      color: Colors.placeHolderText,
    },
    itemPrice: {
      fontSize: 14,
      color: Colors.buttonBackground,
    },
    itemStatus: {
      fontSize: 14,
      color: Colors.placeHolderText,
    },
    customizationLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: Colors.buttonBackground,
      marginTop: 10,
    },
    customizationImage: {
      width: '75%',
      aspectRatio: 1,
      borderRadius: 8,
      marginBottom: 10,
      alignSelf: 'center'
    },
    analysisToggle: {
      paddingVertical: 8,
      marginTop: 10,
      borderTopWidth: 1,
      borderTopColor: Colors.border,
    },
    analysisToggleText: {
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
  });
  