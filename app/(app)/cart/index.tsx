import FancyInput from "@/app/components/FancyInput";
import TopBar from "@/app/components/TopBar";
import Colors from "@/app/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {View, Text, ScrollView, SafeAreaView, StyleSheet, Pressable, FlatList} from "react-native";
import useCartStore, {CartItem} from "@/app/data/cartStore";
import {Product} from "@/app/types/product";
import ImageWithLoader from "@/app/components/ImageWithLoader";
import Button from "@/app/components/Button";
import {RelativePathString, router} from "expo-router";

export default function Cart() {
    const {items, clearCart} = useCartStore();

    // Calculate total price
    const total = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

    const renderCartItem = ({ item }: { item: CartItem }) => {
        const pathToProduct: RelativePathString = `products/${item.product.category}/${item.product.id}` as RelativePathString;
        return (
            <View style={styles.itemContainer}>
                {item.product.imageSource && (
                    <Pressable
                        onPress={() => {
                            router.navigate(pathToProduct)
                        }}
                    >
                        <ImageWithLoader
                            source={item.product.imageSource}
                            style={styles.itemImage}
                            resizeMode="contain"
                        />
                    </Pressable>
                )}
                <View style={styles.itemDetails}>
                    <Pressable
                        onPress={() => {
                            router.navigate(pathToProduct)
                        }}
                    >
                        <Text style={styles.itemName}>{item.product.name}</Text>
                        <Text style={styles.itemPrice}>{item.product.price.toFixed(2)} Lei</Text>
                    </Pressable>
                    {/* Quantity Controls */}
                    <View style={styles.quantityContainer}>
                        <Pressable
                            style={styles.quantityButton}
                            onPress={() => useCartStore.getState().decrementQuantity(item.product.id)}
                        >
                            <Text style={styles.quantityButtonText}>-</Text>
                        </Pressable>

                        <Text style={styles.quantityText}>{item.quantity}</Text>

                        <Pressable
                            style={styles.quantityButton}
                            onPress={() => useCartStore.getState().incrementQuantity(item.product.id)}
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </Pressable>
                    </View>
                </View>

                <Pressable
                    style={styles.removeButton}
                    onPress={() => useCartStore.getState().removeFromCart(item.product.id)}
                >
                    <Text style={styles.removeText}>×</Text>
                </Pressable>
            </View>
        )
    };


    return (
        <View
            style={styles.container}
        >
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
                                keyExtractor={(item) => item.product.id}
                                scrollEnabled={false}
                            />

                            <View style={styles.totalContainer}>
                                <Text style={styles.totalText}>Total:</Text>
                                <Text style={styles.totalAmount}>{total.toFixed(2)} Lei</Text>
                            </View>

                            <View style={styles.deliveryContainer}>

                                <Text style={styles.sectionTitle}>Delivery Information</Text>

                                <FancyInput
                                    label="Full Name"
                                    placeholder="Enter your full name"
                                    icon="person"
                                />

                                <FancyInput
                                    label="Phone Number"
                                    placeholder="Enter your phone number"
                                    keyboardType="phone-pad"
                                    icon="phone"
                                />

                                <FancyInput
                                    label="Email Address"
                                    placeholder="Enter your email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    icon="email"
                                />

                                <FancyInput
                                    label="Delivery Address"
                                    placeholder="Street, Number, Apartment"
                                    multiline
                                    numberOfLines={3}
                                    icon="home"
                                />

                                <FancyInput
                                    label="Additional Notes"
                                    placeholder="Special instructions (optional)"
                                    multiline
                                    numberOfLines={2}
                                    icon="notes"
                                />

                                <Pressable
                                    style={({ pressed }) => [
                                        styles.submitButton,
                                        { backgroundColor: pressed ? Colors.buttonPressedBackground : Colors.buttonBackground }
                                    ]}
                                    onPress={() => {
                                        // Handle order submission
                                        console.log('Order submitted!');
                                        clearCart();
                                        router.navigate('/home');
                                    }}
                                >
                                    <Text style={styles.submitButtonText}>Place Order</Text>
                                </Pressable>
                            </View>
                        </>
                    )}
                </SafeAreaView>
            </ScrollView>
        </View>
    )
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
    cartTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primaryText,
        marginLeft: 10,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    itemsList: {
        width: '100%'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.inputBackground,
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        // borderWidth: 1,
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
        // borderWidth: 1,
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
    clearButton: {
        backgroundColor: Colors.inputBackground,
        borderRadius: 8,
        padding: 15,
        marginTop: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.error,
    },
    clearButtonText: {
        color: Colors.error,
        fontSize: 16,
        fontWeight: '600',
    },
    checkoutButton: {
        backgroundColor: Colors.buttonBackground,
        borderRadius: 8,
        padding: 15,
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: Colors.buttonText,
        fontSize: 16,
        fontWeight: '600',
    },
    deliveryContainer: {
        backgroundColor: Colors.buttonText,
        borderRadius: 10,
        padding: 15,
        marginTop: 15,
        // borderWidth: 1,
        // borderColor: Colors.border,
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
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonText: {
        color: Colors.buttonText,
        fontSize: 16,
        fontWeight: '600',
    },
});
