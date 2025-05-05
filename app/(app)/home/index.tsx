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
        redirectPath: './products/sofas'
    },
    {
        name: 'Chairs',
        source: require('../../../assets/images/furniture/chair.jpg'),
        redirectPath: './products/chairs'
    },
    {
        name: 'Tables',
        source: require('../../../assets/images/furniture/table.jpg'),
        redirectPath: './products/tables'
    },
    {
        name: 'Beds',
        source: require('../../../assets/images/furniture/bed.jpg'),
        redirectPath: './products/Beds'
    },
    {
        name: 'Tables',
        source: { uri: 'https://picsum.photos/200/300/?blur&random=8' },
        redirectPath: './products/tables'
    },
    {
        name: 'Desks',
        source: { uri: 'https://picsum.photos/200/300/?blur&random=9' },
        redirectPath: './products/Desks'
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
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    safeAreaView: {
        maxWidth: 400
    },
    homeImage: {
        width: '100%',
        maxWidth: 400,
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
