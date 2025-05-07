import { RelativePathString, router } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";
import ImageWithLoader from "./ImageWithLoader";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

interface FurnitureProductProps {
    redirectPath: RelativePathString;
    image: any;
    productName: string;
    productDescription: string;
    productPrice: number,
};

export default function FurnitureProduct({redirectPath, image, productName, productDescription, productPrice}: FurnitureProductProps) {
    const handlePress = () => {
        router.navigate(redirectPath);
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={handlePress} style={styles.container}>
                <View style={styles.imageContainer}>
                    <ImageWithLoader source={image} style={styles.image}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.productName}>{productName}</Text>
                    {/* <Text style={styles.productDescription}>{productDescription}</Text> */}
                    <Text style={styles.productPrice}>{productPrice} Lei</Text>
                    
                    <Pressable
                        // onPress={onPress}
                        // disabled={disabled}
                        style={styles.cartButton}
                        hitSlop={10} // Exapands touch area without visual change
                    >
                        <MaterialIcons
                            name="shopping-cart"
                            size={20}
                            style={styles.cartButtonIcon}
                        />
                        <Text style={styles.cartButtonText}>Add to cart</Text>
                    </Pressable>
                    
                </View>
            </Pressable>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        padding: 5,
        backgroundColor: Colors.inputBackground,
        borderRadius: 10,
        borderColor: Colors.border,
        width: '100%'
    },
    imageContainer: {
        width: '50%',
        height: 150
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 7
    },
    textContainer: {
        width: '50%',
        paddingInline: 10,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primaryText
    },
    productDescription: {
        color: Colors.primaryText,
        padding: 10
    },
    productPrice: {
        alignSelf: 'flex-end',
        padding: 10,
        fontSize: 24
    },
    cartButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: Colors.buttonBackground,
        borderRadius: 10,
        alignItems: 'center',
        padding: 5,

    },
    cartButtonIcon: {
        color: Colors.primaryBackground,
    },
    cartButtonText: {
        paddingEnd: 10,
        color: Colors.buttonText
    }
});