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
  productPrice: number;
}

export default function FurnitureProduct({
  redirectPath,
  image,
  productName,
  productDescription,
  productPrice,
}: FurnitureProductProps) {
  const handlePress = () => {
    router.navigate(redirectPath);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress} style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageWithLoader source={image} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productName}>{productName}</Text>
          <Text style={styles.productDescription}>{productDescription}</Text>
          <Text style={styles.productPrice}>{productPrice} Lei</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    padding: 5,
    backgroundColor: Colors.inputBackground,
    borderRadius: 10,
    borderColor: Colors.border,
    width: "100%",
  },
  imageContainer: {
    width: "50%",
    aspectRatio: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 7,
  },
  textContainer: {
    width: "50%",
    paddingInline: 10,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  productDescription: {
    color: Colors.primaryText,
    fontSize: 14,
    marginTop: 5,
  },
  productPrice: {
    alignSelf: "flex-end",
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.buttonBackground,
  },
});
