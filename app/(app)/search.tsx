// app/(app)/search.tsx
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ImageBackground } from "react-native";
import FurnitureProduct from "@/app/components/FurnitureProduct";
import TopBar from "@/app/components/TopBar";
import Colors from "@/app/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function SearchScreen() {
    const { q } = useLocalSearchParams();
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}products/get/search?query=${q}`);
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch search results');
                }
                
                setResults(data);
            } catch (err: any) {
                setError(err.message || 'Search failed');
            } finally {
                setLoading(false);
            }
        };

        if (q) {
            fetchResults();
        }
    }, [q]);

    if (loading) {
        return (
            <View style={styles.container}>
                <TopBar />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Colors.buttonBackground} />
                </View>
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
            <TopBar />
            
            {/* Search Header Section */}
            
                <View style={styles.headerContent}>
                    <View style={styles.searchInfoContainer}>
                        <MaterialIcons 
                            name="search" 
                            size={24} 
                            color={Colors.buttonText} 
                            style={styles.searchIcon}
                        />
                        <Text style={styles.searchQueryText}>"{q}"</Text>
                    </View>
                    
                    <View style={styles.resultsCountContainer}>
                        <Text style={styles.resultsCountText}>
                            {results.length} {results.length === 1 ? 'result' : 'results'} found
                        </Text>
                    </View>
                </View>

            {/* Results List */}
            {results.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <MaterialIcons 
                        name="search-off" 
                        size={50} 
                        color={Colors.placeHolderText} 
                    />
                    <Text style={styles.emptyText}>No results found</Text>
                    <Text style={styles.emptySubtext}>Try different search terms</Text>
                </View>
            ) : (
                <FlatList
                    data={results}
                    renderItem={({ item }) => (
                        <FurnitureProduct
                            redirectPath={`./products/${item.category}/${item._id}`}
                            image={{ uri: `${process.env.EXPO_PUBLIC_API_URL}products/${item._id}/image` }}
                            productName={item.name}
                            productDescription={item.short_description}
                            productPrice={item.price}
                        />
                    )}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContainer}
                    ListHeaderComponent={<View style={styles.listHeaderSpacer} />}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBackground,
        paddingInline: 50
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    headerContainer: {
        width: '100%',
        paddingVertical: 25,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    headerBackground: {
        opacity: 0.8,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerContent: {
        backgroundColor: 'rgba(170, 118, 82, 0.7)',
        borderRadius: 15,
        padding: 15,
    },
    searchInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchQueryText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.buttonText,
        flexShrink: 1,
    },
    resultsCountContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
    },
    resultsCountText: {
        color: Colors.buttonText,
        fontSize: 14,
        fontWeight: '600',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 22,
        color: Colors.primaryText,
        marginTop: 15,
        fontWeight: '600',
    },
    emptySubtext: {
        fontSize: 16,
        color: Colors.placeHolderText,
        marginTop: 5,
    },
    listContainer: {
        paddingHorizontal: 10,
    },
    listHeaderSpacer: {
        height: 15,
    },
});