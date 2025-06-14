import TopBar from "@/app/components/TopBar";
import Colors from "@/app/constants/Colors";
import { fetchCategoriesWithImages } from "@/app/services/api";
import { RelativePathString, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import FurnitureCategory from "@/app/components/FurnitureCategory";
import Button from "@/app/components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { ImageBackground, TouchableOpacity, Image } from "react-native";

// Update the Category interface
interface Category {
    name: string;
    redirectPath: RelativePathString;
    imageProductId: string | null;
}

export default function Home() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const loadCategories = async () => {
        setLoading(true);
        setError(null);

        try {
            const categoriesWithImages = await fetchCategoriesWithImages();
            setCategories(categoriesWithImages);
        } catch (err) {
        const message =
            err instanceof Error ? err.message : 'Failed to load categories';
            console.error('loadCategories error:', message);
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    loadCategories();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.buttonBackground} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <TopBar />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <SafeAreaView style={styles.safeAreaView}>
                    <TopBar/>

                    <View style={styles.generateContainer}>
                        <TouchableOpacity onPress={() => router.push('/generate-room')}>
                            <ImageBackground
                            source={require('../../../assets/images/generate.jpeg')}
                            style={styles.generateImage}
                            imageStyle={{ borderRadius: 16 }}
                            >
                            <View style={styles.generateOverlay}>
                                <Text style={styles.generateText}>Design Your Dream Room Now</Text>
                            </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.categoriesText}>Categories</Text>
                    
                    {categories.map((category, index) => (
                        <FurnitureCategory
                            redirectPath={category.redirectPath}
                            categoryName={category.name}
                            key={index}
                            imageProductId={category.imageProductId}
                        />
                    ))}
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

// Keep the same styles as before
// Add this interface
interface Category {
    name: string;
    imageProductId: string | null;
    redirectPath: RelativePathString;
}

// Update styles to include loading container
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryBackground,
        flex: 1,
        paddingInline: 10
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    safeAreaView: {
        maxWidth: 400,
        minWidth: 200,
        paddingTop: 30
        // width: '100%',
    },
    categoriesText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.buttonBackground,
        marginLeft: 10,
        marginBottom: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryBackground,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: Colors.error,
        fontSize: 16,
        textAlign: 'center',
    },
    generateContainer: {
        marginHorizontal: 10,
        marginBottom: 20,
    },
    generateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        marginRight: 10,
    },
    generateImage: {
        width: '100%',
        height: 200,
        justifyContent: 'flex-end',
        borderRadius: 16,
        overflow: 'hidden',
    },
    
    generateOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: '100%',
        paddingVertical: 75,
        paddingInline: 100,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    
    generateText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});