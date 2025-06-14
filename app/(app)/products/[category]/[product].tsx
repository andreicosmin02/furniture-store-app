import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Button from "@/app/components/Button";
import ImageWithLoader from "@/app/components/ImageWithLoader";
import TopBar from "@/app/components/TopBar";
import Colors from "@/app/constants/Colors";
import { useCartStore } from "@/app/data/cartStore";
import { Product } from "@/app/types/product";
import { useLocalSearchParams } from "expo-router";

const formatProductDescription = (description: string) => {
  const normalized = description.replace(/\s{2,}/g, "\n");
  const lines = normalized.trim().split(/\n+/);

  return lines.map((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return null;

    if (/^\*\*.+\*\*$/.test(trimmed)) {
      return (
        <Text key={`heading-${index}`} style={styles.descriptionHeading}>
          {trimmed.replace(/\*\*/g, "")}
        </Text>
      );
    }

    if (/^[•\-✔]/.test(trimmed)) {
      return (
        <View key={`bullet-${index}`} style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>{"\u2022"}</Text>
          <Text style={styles.bulletText}>
            {trimmed.replace(/^[•\-✔]\s*/, "")}
          </Text>
        </View>
      );
    }

    if (/^[A-Za-z\s]+:/.test(trimmed)) {
      return (
        <Text key={`kv-${index}`} style={styles.keyValue}>
          {trimmed}
        </Text>
      );
    }

    return (
      <Text key={`para-${index}`} style={styles.descriptionParagraph}>
        {trimmed}
      </Text>
    );
  });
};

export default function ProductScreen() {
  const { product } = useLocalSearchParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const [productObject, setProductObject] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}products/${product}`);
        const data = await res.json();
        setProductObject(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (product) fetchProduct();
  }, [product]);

  if (loading || !productObject) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={Colors.buttonBackground} />
      </View>
    );
  }

  const allDescriptionElements = formatProductDescription(productObject.long_description);
  const visibleDescription = descriptionExpanded ? allDescriptionElements : allDescriptionElements.slice(0, 2);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SafeAreaView style={styles.safeAreaView}>
          <TopBar />

          <View style={styles.titleContainer}>
            <ImageWithLoader
              style={styles.homeImage}
              source={{
                uri: `${process.env.EXPO_PUBLIC_API_URL}products/${productObject._id}/image`,
              }}
            />

            <Text style={styles.categoriesText}>{productObject.name}</Text>
            <Text style={styles.shortDescription}>{productObject.short_description}</Text>
            <Text style={styles.priceText}>{productObject.price} Lei</Text>

            <Button
              onPress={() => {
                addToCart(productObject);
                console.log("added to cart");
              }}
              style={styles.cartButton}
              textStyle={styles.cartButtonText}
            >
              Add to cart
            </Button>
          </View>
          <Pressable onPress={() => setDescriptionExpanded((prev) => !prev)} hitSlop={10}>
            <View style={styles.descriptionContainer}>
                <Text style={styles.longDescriptionHeader}>Description</Text>

                {visibleDescription}

                
                <Text style={styles.readMoreText}>
                    {descriptionExpanded ? "Show Less ▲" : "Read More ▼"}
                </Text>
            </View>
          </Pressable>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryBackground,
    flex: 1,
    paddingInline: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    marginBottom: 50,
  },
  safeAreaView: {
    maxWidth: 400,
    minWidth: 200,
    width: "100%",
    padding: 10,
  },
  homeImage: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 15,
  },
  titleContainer: {
    backgroundColor: Colors.inputBackground,
    padding: 12,
    borderRadius: 20,
    marginBottom: 15,
  },
  descriptionContainer: {
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 20,
  },
  categoriesText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.buttonBackground,
    marginBottom: 5,
  },
  shortDescription: {
    fontSize: 16,
    color: Colors.primaryText,
    marginVertical: 10,
  },
  priceText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.inputText,
    marginTop: 5,
    marginBottom: 10,
  },
  cartButton: {
    width: "100%",
    height: 42,
    borderRadius: 10,
  },
  cartButtonText: {
    fontWeight: "bold",
  },
  longDescriptionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.inputText,
    marginBottom: 15,
  },
  descriptionHeading: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.buttonBackground,
    marginTop: 10,
    marginBottom: 5,
  },
  descriptionParagraph: {
    fontSize: 14,
    color: Colors.primaryText,
    lineHeight: 22,
    marginBottom: 10,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
    marginLeft: 10,
    paddingRight: 10,
  },
  bulletPoint: {
    color: Colors.primaryText,
    fontSize: 14,
    marginRight: 6,
    lineHeight: 22,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: Colors.primaryText,
    lineHeight: 22,
  },
  keyValue: {
    fontSize: 14,
    marginBottom: 4,
    fontStyle: "italic",
    color: Colors.primaryText,
  },
  readMoreText: {
    marginTop: 10,
    textAlign: "right",
    color: Colors.buttonBackground,
    fontSize: 13,
    opacity: 0.8,
  },
});
