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
        source: require('../../../assets/images/furniture/sofa_1.png'),
        redirectPath: './products/sofa'
    },
    {
        name: 'Chairs',
        source: require('../../../assets/images/furniture/chair_10.png'),
        redirectPath: './products/chair'
    },
    {
        name: 'Tables',
        source: require('../../../assets/images/furniture/table_13.png'),
        redirectPath: './products/table'
    },
    {
        name: 'Beds',
        source: require('../../../assets/images/furniture/bed_18.png'),
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
                        source={require('../../../assets/images/me.jpeg')}
                    />
                    <Text style={styles.categoriesText}>Categories</Text>
                    {categories.map((category, index) => (
                        <FurnitureCategory
                            redirectPath={category.redirectPath}
                            image={category.source}
                            categoryName={category.name}
                            key={index}
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
        paddingInline: 10
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    safeAreaView: {
        maxWidth: 400,
        minWidth: 200,
        // width: '100%',
    },
    homeImage: {
        maxWidth: 400,
        minWidth: 200,
        width: '100%',
        aspectRatio: 2, 
        alignSelf: 'center',
        height: 200,
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
