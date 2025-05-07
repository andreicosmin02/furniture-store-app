import FancyInput from "@/app/components/FancyInput";
import FurnitureCategory from "@/app/components/FurnitureCategory";
import ImageWithLoader from "@/app/components/ImageWithLoader";
import TopBar from "@/app/components/TopBar";
import Colors from "@/app/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { RelativePathString } from "expo-router";
import React from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Image } from "react-native";

interface Category {
    name: string;
    source: any; 
    redirectPath: RelativePathString;
}

const categories: Category[] = [
    {
        name: 'Sofas',
        source: require('../../../assets/images/furniture/sofa.jpg'),
        redirectPath: './products/sofa'
    },
    {
        name: 'Chairs',
        source: require('../../../assets/images/furniture/chair.jpg'),
        redirectPath: './products/chair'
    },
    {
        name: 'Tables',
        source: require('../../../assets/images/furniture/table.jpg'),
        redirectPath: './products/table'
    },
    {
        name: 'Beds',
        source: require('../../../assets/images/furniture/bed.jpg'),
        redirectPath: './products/bed'
    },
];
 
export default function Home() {
    return (
        <View
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <SafeAreaView style={styles.safeAreaView}>
                    <TopBar/>
                    <ImageWithLoader
                        style={styles.homeImage}
                        source={require('../../../assets/images/home_image.jpg')}
                    />
                    <Text style={styles.categoriesText}>Categories</Text>
                    {categories.map((category) => (
                        <FurnitureCategory
                            redirectPath={category.redirectPath}
                            image={category.source}
                            categoryName={category.name}
                        />
                    ))}
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryBackground,
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        // paddingHorizontal: 20,
        alignItems: 'center'
    },
    safeAreaView: {
        maxWidth: 400
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
    categoriesText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.buttonBackground,
        marginLeft: 10,
        marginBottom: 10,
    }
})
