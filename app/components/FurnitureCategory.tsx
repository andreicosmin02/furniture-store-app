import { RelativePathString, router } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";
import ImageWithLoader from "./ImageWithLoader";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

interface FurnitureCategoryProps {
    redirectPath: RelativePathString;
    image: any;
    categoryName: string;
};

export default function FurnitureCategory({redirectPath, image, categoryName}: FurnitureCategoryProps) {
    const handlePress = () => {
        router.navigate(redirectPath);
    }

    return (
        <View>

        <Pressable onPress={handlePress} style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageWithLoader source={image} style={styles.image}/>
            </View>
            <Text style={styles.categoryName}>{categoryName}</Text>
            <MaterialIcons
                name="arrow-forward"
                size={20}
                style={styles.arrow}
            />
        </Pressable>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        padding: 10,
        backgroundColor: Colors.inputBackground,
        borderRadius: 10,
        borderColor: Colors.border
    },
    imageContainer: {
        marginRight: 10,
    },
    image: {
        width: 75,
        height: 76,
        borderRadius: 7
    },
    categoryName: {
        margin: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primaryText
    },
    arrow: {
        marginLeft: 'auto',
        color: Colors.primaryText
    }
});