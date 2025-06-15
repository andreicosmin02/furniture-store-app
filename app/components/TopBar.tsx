// app/components/TopBar.tsx
import { View, StyleSheet, Pressable, Text } from "react-native";
import FancyInput from "./FancyInput";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useState } from "react";
import { RelativePathString, router } from "expo-router";
import { useCartStore } from "../data/cartStore";

export default function TopBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const cartItems = useCartStore((state) => state.items);

    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            // Navigate to search results page with the query as a parameter
            router.push({
                pathname: "/(app)/search" as RelativePathString,
                params: { q: searchQuery.trim() }
            });
            setSearchQuery(''); // Clear search input after submission
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <FancyInput
                    placeholder="Search for a product..."
                    autoCapitalize="none"
                    icon="search"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearchSubmit}
                    returnKeyType="search"
                />
            </View>
            <View style={styles.iconsContainer}>
                <Pressable onPress={() => router.navigate('/(app)/cart')} style={styles.iconButton}>
                    <View style={styles.cartIconContainer}>
                        <MaterialIcons
                            name="shopping-cart"
                            size={20}
                            style={styles.topbarButton}
                        />
                        {cartItems.length > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>
                                    {cartItems.length > 9 ? '9+' : cartItems.length}
                                </Text>
                            </View>
                        )}
                    </View>
                </Pressable>
                <Pressable onPress={() => router.navigate('/(app)/account')} style={styles.iconButton}>
                    <MaterialIcons
                        name="person"
                        size={20}
                        style={styles.topbarButton}
                    />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 3,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
    },
    searchContainer: {
        flexDirection: 'row',
        flex: 1,
        marginRight: 10,
    },
    iconsContainer: {
        flexDirection: 'row',
    },
    iconButton: {
        width: 'auto',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center'
    },
    topbarButton: {
        color: Colors.inputText,
        borderRadius: 20,
        padding: 5,
        marginHorizontal: 5
    },
    cartIconContainer: {
        position: 'relative'
    },
    badge: {
        position: 'absolute',
        right: 5,
        top: 0,
        borderRadius: 10,
        width: 15,
        height: 15,
        backgroundColor: Colors.buttonBackground,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeText: {
        color: Colors.buttonText,
        fontSize: 10
    }
});