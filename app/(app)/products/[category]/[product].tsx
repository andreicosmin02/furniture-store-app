import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function ProductsScreen() {
    const { category, product } = useLocalSearchParams() 

    return (
        <View>
            <Text>Showing the product {product}</Text>
        </View>
    )
}