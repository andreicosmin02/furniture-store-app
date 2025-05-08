import FurnitureCategory from "@/app/components/FurnitureCategory";
import FurnitureProduct from "@/app/components/FurnitureProduct";
import ImageWithLoader from "@/app/components/ImageWithLoader";
import TopBar from "@/app/components/TopBar";
import Colors from "@/app/constants/Colors";
import { products } from "@/app/data/products";
import { RelativePathString, useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, FlatList } from "react-native";

export default function ProductsScreen() {
    const { category } = useLocalSearchParams();
    const categoryCapitalized: string = category[0].toUpperCase() + category.slice(1);
    const products = getProductsByCategory(category.toString());
    console.log(products)


    return (
        <View
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <SafeAreaView style={styles.safeAreaView}>
                    <TopBar/>
                    {/* <ImageWithLoader
                        style={styles.homeImage}
                        source={require('../../../assets/images/home_image.jpg')}
                    /> */}
                    <Text style={styles.categoriesText}>{ categoryCapitalized }</Text>
                    
                    <FlatList
                        data={products}
                        renderItem={({ item }) => (
                            <FurnitureProduct
                                redirectPath={('./' + category + '/' + item.id) as RelativePathString}
                                image={item.imageSource}
                                productName={item.name}
                                productDescription={item.short_description}
                                productPrice={item.price}
                            />
                        )}
                        keyExtractor={item => item.id}
                        // numColumns={1}
                        contentContainerStyle={styles.categoriesList}
                    />
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryBackground,
        flex: 1,
        paddingInline: 10
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center'
    },
    safeAreaView: {
        maxWidth: 400,
        minWidth: 200,
        width: '100%',
    },
    homeImage: {
        maxWidth: 400,
        minWidth: 200,
        width: '100%',
        alignSelf: 'center',
        height: 175,
        marginBottom: 20,
        borderRadius: 15
    },
    categoriesList: {
        width: '100%'
    },
    categoriesText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.buttonBackground,
        marginLeft: 10,
        marginBottom: 10,
        
    }
})

// Filtering functions
const getProductsByCategory = (category: string) => {
    // Replace with your actual data source
    const allProducts = products;
    
    return allProducts.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
    );
};