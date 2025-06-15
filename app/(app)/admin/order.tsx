import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Pressable,
    ActivityIndicator,
    RefreshControl,
  } from "react-native";
  import Colors from "@/app/constants/Colors";
  import { useAuthStore } from "@/app/data/authStore";
  import { useEffect, useState } from "react";
  import { MaterialIcons } from "@expo/vector-icons";
  import Button from "@/app/components/Button";
  import ImageWithLoader from "@/app/components/ImageWithLoader";
  
  interface Product {
    _id: string;
    name: string;
    price: number;
    imageKey?: string;
  }
  
  interface OrderItem {
    _id: string;
    product: Product;
    quantity: number;
    status: string;
    furnitureImageKey?: string;
    customizationAnalysis?: any;
  }
  
  interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  }
  
  interface DeliveryInfo {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    notes?: string;
  }
  
  interface Order {
    _id: string;
    createdAt: string;
    status: string;
    products: OrderItem[];
    total?: number;
    user: User;
    deliveryInfo: DeliveryInfo;
  }
  
  export default function AdminOrdersScreen() {
    const { token } = useAuthStore();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const [customImages, setCustomImages] = useState<{[key: string]: string}>({});
  
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}orders/get/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await res.json();
        
        // Calculate total for each order
        const ordersWithTotals = data.map((order: Order) => ({
          ...order,
          total: order.products.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
        }));
        
        setOrders(ordersWithTotals);
  
        // Preload custom images
        const imagePromises = data.flatMap((order: Order) => 
          order.products
            .filter(item => item.furnitureImageKey)
            .map(async (item) => {
              try {
                const uri = `${process.env.EXPO_PUBLIC_API_URL}orders/${order._id}/item/${item._id}/image`;
                const response = await fetch(uri, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                const blob = await response.blob();
                return new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const base64 = reader.result as string;
                    resolve({ id: item._id, image: base64 });
                  };
                  reader.readAsDataURL(blob);
                });
              } catch (error) {
                console.error("Error loading custom image:", error);
                return null;
              }
            })
        );
  
        const images = await Promise.all(imagePromises);
        const loadedImages = images.reduce((acc, curr) => {
          if (curr) {
            acc[curr.id] = curr.image;
          }
          return acc;
        }, {} as {[key: string]: string});
  
        setCustomImages(loadedImages);
      } catch (err: any) {
        setError(err.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
  
    const onRefresh = () => {
      setRefreshing(true);
      fetchOrders();
    };
  
    useEffect(() => {
      fetchOrders();
    }, []);
  
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  
    const updateOrderStatus = async (orderId: string, status: string) => {
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}orders/${orderId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        });
  
        if (!res.ok) {
          throw new Error('Failed to update order status');
        }
  
        setOrders(prev => prev.map(order => 
          order._id === orderId ? { ...order, status } : order
        ));
      } catch (err) {
        console.error('Update status error:', err);
        alert('Failed to update order status');
      }
    };
  
    const updateItemStatus = async (orderId: string, itemId: string, status: string) => {
      try {
        const res = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}orders/${orderId}/products/${itemId}/status`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
          }
        );
  
        if (!res.ok) {
          throw new Error('Failed to update item status');
        }
  
        setOrders(prev => prev.map(order => {
          if (order._id === orderId) {
            const updatedProducts = order.products.map(item => 
              item._id === itemId ? { ...item, status } : item
            );
            return { ...order, products: updatedProducts };
          }
          return order;
        }));
      } catch (err) {
        console.error('Update item status error:', err);
        alert('Failed to update item status');
      }
    };
  
    const renderCustomizationAnalysis = (analysis: any) => {
      if (!analysis) return null;
      
      return (
        <View style={styles.analysisContainer}>
          {analysis.summary && (
            <Text style={styles.analysisText}>
              <Text style={styles.analysisKey}>Summary: </Text>
              {analysis.summary}
            </Text>
          )}
          
          {analysis.furnitureAnalysis && (
            <View style={styles.analysisSection}>
              <Text style={styles.analysisTitle}>Furniture Analysis</Text>
              {Object.entries(analysis.furnitureAnalysis).map(([key, value]) => (
                <Text key={key} style={styles.analysisText}>
                  <Text style={styles.analysisKey}>{key}: </Text>
                  {String(value)}
                </Text>
              ))}
            </View>
          )}
          
          {analysis.customizationRecommendations && (
            <View style={styles.analysisSection}>
              <Text style={styles.analysisTitle}>Recommendations</Text>
              {Object.entries(analysis.customizationRecommendations).map(([key, value]) => (
                Array.isArray(value) && value.length > 0 && (
                  <View key={key} style={styles.recommendationCategory}>
                    <Text style={styles.recommendationTitle}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</Text>
                    {(value as string[]).map((item, idx) => (
                      <Text key={idx} style={styles.recommendationItem}>• {item}</Text>
                    ))}
                  </View>
                )
              ))}
            </View>
          )}
        </View>
      );
    };
  
    if (loading && !refreshing) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.buttonBackground} />
        </View>
      );
    }
  
    if (error) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>{error}</Text>
          <Button onPress={fetchOrders}>Retry</Button>
        </View>
      );
    }
  
    if (!orders.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.noOrdersText}>No orders found</Text>
        </View>
      );
    }
  
    return (
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.buttonBackground]}
          />
        }
      >
        {orders.map((order) => (
          <View key={order._id} style={styles.orderCard}>
            <Pressable 
              onPress={() => expandedOrder === order._id ? setExpandedOrder(null) : setExpandedOrder(order._id)} 
              style={styles.orderHeader}
            >
              <View style={styles.orderHeaderContent}>
                <View>
                  <Text style={styles.orderDate}>{formatDate(order.createdAt)}</Text>
                  <Text style={styles.orderId}>Order ID: {order._id.substring(0, 8)}...</Text>
                  <Text style={styles.orderCustomer}>
                    {order.user.firstName} {order.user.lastName}
                  </Text>
                </View>
                <View style={styles.statusContainer}>
                  <View style={[
                    styles.statusBadge,
                    order.status === 'processing' && styles.processingBadge,
                    order.status === 'shipped' && styles.shippedBadge,
                    order.status === 'delivered' && styles.deliveredBadge,
                    order.status === 'cancelled' && styles.cancelledBadge,
                  ]}>
                    <Text style={styles.statusBadgeText}>{order.status.toUpperCase()}</Text>
                  </View>
                  <Text style={styles.orderTotal}>{order.total?.toFixed(2) || '0.00'} Lei</Text>
                </View>
              </View>
              <MaterialIcons 
                name={expandedOrder === order._id ? "expand-less" : "expand-more"} 
                size={24} 
                color={Colors.primaryText} 
              />
            </Pressable>
  
            {expandedOrder === order._id && (
              <View style={styles.orderDetails}>
                <View style={styles.deliveryInfo}>
                  <Text style={styles.sectionTitle}>Delivery Information</Text>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Name:</Text>
                    <Text style={styles.infoValue}>{order.deliveryInfo.fullName}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Address:</Text>
                    <Text style={styles.infoValue}>{order.deliveryInfo.address}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Phone:</Text>
                    <Text style={styles.infoValue}>{order.deliveryInfo.phone}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Email:</Text>
                    <Text style={styles.infoValue}>{order.deliveryInfo.email}</Text>
                  </View>
                  {order.deliveryInfo.notes && (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Notes:</Text>
                      <Text style={styles.infoValue}>{order.deliveryInfo.notes}</Text>
                    </View>
                  )}
                </View>
  
                <Text style={styles.sectionTitle}>Order Items</Text>
                {order.products.map((item) => (
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
                          <View style={[
                            styles.itemStatusBadge,
                            item.status === 'processing' && styles.processingBadge,
                            item.status === 'shipped' && styles.shippedBadge,
                            item.status === 'delivered' && styles.deliveredBadge,
                            item.status === 'cancelled' && styles.cancelledBadge,
                          ]}>
                            <Text style={styles.itemStatusText}>{item.status}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
  
                    {item.furnitureImageKey && (
                      <>
                        <Text style={styles.customizationLabel}>Customized Version</Text>
                        {customImages[item._id] ? (
                          <ImageWithLoader
                            source={{ uri: customImages[item._id] }}
                            style={styles.customizationImage}
                          />
                        ) : (
                          <View style={styles.imageLoading}>
                            <ActivityIndicator size="small" color={Colors.buttonBackground} />
                          </View>
                        )}
                      </>
                    )}
  
                    {item.customizationAnalysis && (
                      <View style={styles.customizationAnalysis}>
                        <Text style={styles.customizationLabel}>Customization Analysis</Text>
                        {renderCustomizationAnalysis(item.customizationAnalysis)}
                      </View>
                    )}
  
                    <View style={styles.statusControls}>
                      <Text style={styles.statusLabel}>Update Item Status:</Text>
                      <View style={styles.statusButtons}>
                        <Button 
                          style={[
                            styles.statusButton, 
                            item.status === 'processing' && styles.activeStatusButton
                          ]}
                          textStyle={styles.statusButtonText}
                          onPress={() => updateItemStatus(order._id, item._id, 'processing')}
                        >
                          Processing
                        </Button>
                        <Button 
                          style={[
                            styles.statusButton, 
                            item.status === 'shipped' && styles.activeStatusButton
                          ]}
                          textStyle={styles.statusButtonText}
                          onPress={() => updateItemStatus(order._id, item._id, 'shipped')}
                        >
                          Shipped
                        </Button>
                        <Button 
                          style={[
                            styles.statusButton, 
                            item.status === 'delivered' && styles.activeStatusButton
                          ]}
                          textStyle={styles.statusButtonText}
                          onPress={() => updateItemStatus(order._id, item._id, 'delivered')}
                        >
                          Delivered
                        </Button>
                      </View>
                    </View>
                  </View>
                ))}
  
                <View style={styles.orderStatusControls}>
                  <Text style={styles.statusLabel}>Update Entire Order Status:</Text>
                  <View style={styles.statusButtons}>
                    <Button 
                      style={[
                        styles.statusButton, 
                        order.status === 'processing' && styles.activeStatusButton
                      ]}
                      textStyle={styles.statusButtonText}
                      onPress={() => updateOrderStatus(order._id, 'processing')}
                    >
                      Processing
                    </Button>
                    <Button 
                      style={[
                        styles.statusButton, 
                        order.status === 'shipped' && styles.activeStatusButton
                      ]}
                      textStyle={styles.statusButtonText}
                      onPress={() => updateOrderStatus(order._id, 'shipped')}
                    >
                      Shipped
                    </Button>
                    <Button 
                      style={[
                        styles.statusButton, 
                        order.status === 'delivered' && styles.activeStatusButton
                      ]}
                      textStyle={styles.statusButtonText}
                      onPress={() => updateOrderStatus(order._id, 'delivered')}
                    >
                      Delivered
                    </Button>
                    <Button 
                      style={[
                        styles.statusButton, 
                        order.status === 'cancelled' && styles.activeStatusButton
                      ]}
                      textStyle={styles.statusButtonText}
                      onPress={() => updateOrderStatus(order._id, 'cancelled')}
                    >
                      Cancel
                    </Button>
                  </View>
                </View>
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
      borderRadius: 12,
      marginBottom: 16,
      overflow: 'hidden',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    orderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    orderHeaderContent: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 8,
    },
    orderDate: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors.primaryText,
    },
    orderId: {
      fontSize: 12,
      color: Colors.placeHolderText,
      marginTop: 2,
    },
    orderCustomer: {
      fontSize: 14,
      color: Colors.primaryText,
      marginTop: 4,
    },
    statusContainer: {
      alignItems: 'flex-end',
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginBottom: 4,
    },
    statusBadgeText: {
      fontSize: 12,
      fontWeight: '600',
      color: 'white',
    },
    customizationAnalysis: {
        marginTop: 12,
        padding: 12,
        backgroundColor: 'rgba(170, 118, 82, 0.1)',
        borderRadius: 8,
    },
    processingBadge: {
    backgroundColor: '#3498db', // Blue for processing
    },
    shippedBadge: {
    backgroundColor: '#f39c12', // Orange for shipped
    },
    deliveredBadge: {
    backgroundColor: '#2ecc71', // Green for delivered
    },
    cancelledBadge: {
    backgroundColor: '#e74c3c', // Red for cancelled
    },

    orderTotal: {
      fontSize: 16,
      fontWeight: '700',
      color: Colors.buttonBackground,
    },
    orderDetails: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: Colors.border,
    },
    deliveryInfo: {
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,
    },
    infoRow: {
      flexDirection: 'row',
      marginTop: 6,
    },
    infoLabel: {
      fontWeight: '600',
      color: Colors.primaryText,
      width: 80,
    },
    infoValue: {
      flex: 1,
      color: Colors.primaryText,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors.buttonBackground,
      marginBottom: 12,
    },
    orderItem: {
      marginBottom: 16,
      paddingBottom: 16,
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
      marginRight: 12,
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
      marginTop: 8,
      alignItems: 'center',
    },
    itemQuantity: {
      fontSize: 14,
      color: Colors.placeHolderText,
    },
    itemPrice: {
      fontSize: 14,
      fontWeight: '600',
      color: Colors.buttonBackground,
    },
    itemStatusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 8,
    },
    itemStatusText: {
      fontSize: 12,
      fontWeight: '600',
      color: 'white',
    },
    customizationLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: Colors.buttonBackground,
      marginTop: 12,
      marginBottom: 8,
    },
    customizationImage: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: 8,
      marginBottom: 12,
    },
    imageLoading: {
      width: '100%',
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.inputBackground,
      borderRadius: 8,
      marginBottom: 12,
    },
    analysisContainer: {
      marginTop: 12,
      padding: 12,
      backgroundColor: 'rgba(170, 118, 82, 0.1)',
      borderRadius: 8,
    },
    analysisSection: {
      marginBottom: 12,
    },
    analysisTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: Colors.buttonBackground,
      marginBottom: 6,
    },
    analysisKey: {
      fontWeight: '600',
      color: Colors.primaryText,
    },
    analysisText: {
      fontSize: 13,
      color: Colors.primaryText,
      lineHeight: 18,
      marginBottom: 4,
    },
    recommendationCategory: {
      marginBottom: 8,
    },
    recommendationTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: Colors.primaryText,
      marginBottom: 2,
    },
    recommendationItem: {
      fontSize: 13,
      color: Colors.primaryText,
      lineHeight: 18,
      marginLeft: 8,
    },
    statusControls: {
      marginTop: 16,
    },
    orderStatusControls: {
      marginTop: 20,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: Colors.border,
    },
    statusLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: Colors.primaryText,
      marginBottom: 12,
    },
    statusButtons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    statusButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 6,
      backgroundColor: Colors.primaryBackground,
      borderWidth: 1,
      borderColor: Colors.buttonBackground,
      minWidth: 90,
    },
    activeStatusButton: {
      backgroundColor: Colors.buttonBackground,
    },
    statusButtonText: {
      fontSize: 12,
      fontWeight: '500',
      color: Colors.inputText
    },
  });