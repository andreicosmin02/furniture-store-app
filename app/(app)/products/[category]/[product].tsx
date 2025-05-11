import Button from "@/app/components/Button";
import ImageWithLoader from "@/app/components/ImageWithLoader";
import TopBar from "@/app/components/TopBar";
import Colors from "@/app/constants/Colors";
import { useCartStore } from "@/app/data/cartStore";
import { products } from "@/app/data/products";
import { Product } from "@/app/types/product";
import { MaterialIcons } from "@expo/vector-icons";
import { RelativePathString, useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";

const formatProductDescription = (description: string) => {
    return description
      // Split into paragraphs
      .split('\n')
      .map((paragraph, index) => {
        // Format headings
        paragraph = paragraph.trim()
        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
          return (
            <Text key={index} style={[styles.longDescriptionText, styles.heading]}>
              {paragraph.replace(/\*\*/g, '')}
            </Text>
          );
        }
        
        // Format feature lists
        if (paragraph.startsWith('- ') || paragraph.startsWith('✔ ')) {
          return (
            <Text key={index} style={styles.longDescriptionText}>
              {paragraph.split('\n').map((line, i) => (
                <Text key={i}>
                  {'\u2022'} {line.replace(/^- |^✔ /, '')}{'\n'}
                </Text>
              ))}
            </Text>
          );
        }
        
        // Format regular paragraphs
        return (
          <Text key={index} style={styles.longDescriptionText}>
            {'  '}{paragraph}
          </Text>
        );
      });
  };



export default function ProductsScreen() {
    const { category, product } = useLocalSearchParams()
    const productObject: Product | undefined = products.find((item) => item.id === product)
    const addToCart = useCartStore(state => state.addToCart);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <SafeAreaView style={styles.safeAreaView}>
                    <TopBar/>

                    <View style={styles.titleContainer}>
                        <ImageWithLoader
                            style={styles.homeImage}
                            source={productObject?.imageSource}
                        />

                        <Text style={styles.categoriesText}>{productObject?.name}</Text>
                        <Text style={styles.shortDescription}>{productObject?.short_description}</Text>
                        <Text style={styles.priceText}>{productObject?.price} Lei</Text>

                        <Button onPress={() => {addToCart(productObject as Product); console.log('added to cart')}} style={styles.cartButton} textStyle={styles.cartButtonText}>
                            {/* <MaterialIcons
                                name="shopping-cart"
                                size={30}
                                style={styles.cartIcon}
                            /> */}
                            Add to cart</Button>

                    </View>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.longDescriptionHeader}>Description</Text>
                        {formatProductDescription(productObject!.long_description)}
                    </View>
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
        alignItems: 'center',
        marginBottom: 50
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
        width: '100%',
        aspectRatio: 1,
        alignSelf: 'center',
        marginBottom: 20,
        borderRadius: 15,
    },
    titleContainer: {
        backgroundColor: Colors.inputBackground,
        padding: 10,
        borderRadius: 20,
        marginBottom: 15
    },
    descriptionContainer: {
        backgroundColor: Colors.inputBackground,
        paddingInline: 10,
        paddingVertical: 20,
        borderRadius: 20
    },
    categoriesText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.buttonBackground,
        // marginLeft: 10,
        marginBottom: 5,   
    },
    shortDescription: {
        fontSize: 16,
        color: Colors.primaryText,
        marginVertical: 10,
        marginInline: 10
    },
    priceText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.inputText,
        marginLeft: 'auto',
        marginRight: 10
    },
    cartButton: {
        width: '95%',
        height: 40,
    },
    cartButtonText: {
        fontWeight: 'bold',
    },
    longDescriptionHeader: {
        marginInline: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.inputText,
    },
    longDescriptionText: {
        fontSize: 14,
        lineHeight: 20,
        color: Colors.primaryText,
        marginInline: 10
    },
    heading: {
        fontSize: 16,
        fontWeight: '600',
    },
})