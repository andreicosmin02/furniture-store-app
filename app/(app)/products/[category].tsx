import { useEffect, useState } from "react";
import FurnitureProduct from "@/app/components/FurnitureProduct";
import TopBar from "@/app/components/TopBar";
import Colors from "@/app/constants/Colors";
import { RelativePathString, useLocalSearchParams } from "expo-router";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

export default function ProductsScreen() {
  const { category } = useLocalSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const categoryCapitalized: string = category[0].toUpperCase() + category.slice(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}products/category/${category}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SafeAreaView style={styles.safeAreaView}>
          <TopBar />
          <Text style={styles.categoriesText}>{categoryCapitalized}</Text>

          {loading ? (
            <ActivityIndicator size="large" color={Colors.buttonBackground} />
          ) : (
            <FlatList
              data={products}
              renderItem={({ item }) => (
                <FurnitureProduct
                  redirectPath={
                    (`./${category}/${item._id}` as RelativePathString)
                  }
                  image={{ uri: `${process.env.EXPO_PUBLIC_API_URL}products/${item._id}/image` }}
                  productName={item.name}
                  productDescription={item.short_description}
                  productPrice={item.price}
                />
              )}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.categoriesList}
            />
          )}
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
  },
  safeAreaView: {
    maxWidth: 400,
    minWidth: 200,
  },
  categoriesList: {
    width: "100%",
  },
  categoriesText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.buttonBackground,
    marginLeft: 10,
    marginBottom: 10,
  },
});
