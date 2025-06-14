import { RelativePathString, router } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import ImageWithLoader from "./ImageWithLoader";
import { fetchProductImage } from "@/app/services/api";

interface FurnitureCategoryProps {
    redirectPath: RelativePathString;
    categoryName: string;
    imageProductId: string | null;
};

export default function FurnitureCategory({
    redirectPath,
    categoryName,
    imageProductId
}: FurnitureCategoryProps) {
    const handlePress = () => {
        router.navigate(redirectPath);
    }

    return (
        <Pressable onPress={handlePress} style={styles.container}>
            {imageProductId ? (
                <ImageWithLoader
                    style={styles.image}
                    source={{ uri: fetchProductImage(imageProductId) }}
                />
            ) : (
                <View style={styles.placeholderContainer}>
                    <MaterialIcons 
                        name="image" 
                        size={40} 
                        color={Colors.placeHolderText}
                    />
                </View>
            )}
            <View style={styles.textContainer}>
                <Text style={styles.categoryName}>{categoryName}</Text>
            </View>
            <MaterialIcons
                name="arrow-forward"
                size={20}
                style={styles.arrow}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 5,
        padding: 15,
        backgroundColor: Colors.inputBackground,
        borderRadius: 10,
        borderColor: Colors.border,
        width: '100%'
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 7,
        marginRight: 10,
    },
    placeholderContainer: {
        width: 75,
        height: 75,
        backgroundColor: Colors.primaryBackground,
        borderRadius: 7,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primaryText
    },
    arrow: {
        color: Colors.primaryText
    }
});