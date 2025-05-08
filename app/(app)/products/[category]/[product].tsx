import ImageWithLoader from "@/app/components/ImageWithLoader";
import TopBar from "@/app/components/TopBar";
import Colors from "@/app/constants/Colors";
import { RelativePathString, useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";

export default function ProductsScreen() {
    const { category, product } = useLocalSearchParams() 

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <SafeAreaView style={styles.safeAreaView}>
                    <TopBar/>
                    {/* <ImageWithLoader
                        style={styles.homeImage}
                        source={require('../../../assets/images/home_image.jpg')}
                    /> */}
                    <Text>Showing the product {product}</Text>

                    {/* <Text style={styles.categoriesText}>{ categoryCapitalized }</Text> */}
                    
                    {/* <FlatList
                        data={products}
                        renderItem={({ item }) => (
                            <FurnitureProduct
                                redirectPath={('./' + category + '/' + item.id) as RelativePathString}
                                image={item.imageSource}
                                productName={item.name}
                                productDescription={item.description}
                                productPrice={item.price}
                            />
                        )}
                        keyExtractor={item => item.id}
                        // numColumns={1}
                        contentContainerStyle={styles.categoriesList}
                    /> */}
                    <ImageWithLoader 
                        style={styles.homeImage}
                        source={{uri: 'https://picsum.photos/seed/picsum/512/512'}}
                    />
                    <Text>Showing the product {product}</Text>

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
        padding: 10
    },
    homeImage: {
        maxWidth: 400,
        minWidth: 200,
        height: 300,
        aspectRatio: 1,
        alignSelf: 'center',
        marginBottom: 20,
        borderRadius: 15,
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