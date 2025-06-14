import TopBar from "@/app/components/TopBar";
import Colors from "@/app/constants/Colors";
import { fetchCategoriesWithImages } from "@/app/services/api";
import { RelativePathString } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import FurnitureCategory from "@/app/components/FurnitureCategory";

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
    }
});