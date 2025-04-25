import { View, StyleSheet, Pressable, Text } from "react-native";
import FancyInput from "./FancyInput";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useState } from "react";
import { router } from "expo-router";

export default function TopBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [cartItems, setCartItems] = useState(3);

    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            console.log(`${searchQuery.trim()}`)
            // Redirect to search page
            // router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <FancyInput
                    // label="Email Address"
                    placeholder="Search for a product..."
                    autoCapitalize="none"
                    // value={email}
                    // onChangeText={setEmail}
                    // error={error}
                    icon="search"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearchSubmit}
                    returnKeyType="search"
                    />
            </View>
            <View style={styles.iconsContainer}>
                <Pressable onPress={() => router.navigate('../(app)/cart')} style={styles.iconButton}>
                    <View style={styles.cartIconContainer}>
                        <MaterialIcons
                            name="shopping-cart"
                            size={20}
                            style={styles.topbarButton}
                            />
                        {cartItems > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>
                                    {cartItems > 9 ? '9+': cartItems}
                                </Text>
                            </View>
                        )}
                    </View>
                </Pressable>
                <Pressable onPress={() => router.navigate('../(app)/account')} style={styles.iconButton}>
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
        paddingInline: 15,
        paddingVertical: 3,
        borderRadius: 10,
        marginVertical: 3,
        maxWidth: 400,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchContainer: {
        flex: 1,
        marginRight: 10
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
        // borderWidth: 2,
        // borderColor: Colors.inputText,
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
})