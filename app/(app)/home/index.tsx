import FancyInput from "@/app/components/FancyInput";
import FurnitureCategory from "@/app/components/FurnitureCategory";
import ImageWithLoader from "@/app/components/ImageWithLoader";
import TopBar from "@/app/components/TopBar";
import Colors from "@/app/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Image } from "react-native";

export default function Home() {
    return (
        <View
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <SafeAreaView style={styles.safeAreaView}>
                    <TopBar/>
                    <Image
                        style={styles.homeImage}
                        source={{uri: 'https://picsum.photos/200/300/?blur&random=1'}}
                    />
                    <Text style={styles.categoriesText}>Categories</Text>
                    <FurnitureCategory 
                        redirectPath="./products/sofas"
                        image={{uri: 'https://picsum.photos/200/300/?blur&random=2'}}
                        categoryName="Sofas"
                    />
                    <FurnitureCategory 
                        redirectPath="./products/chairs"
                        image={{uri: 'https://picsum.photos/200/300/?blur&random=3'}}
                        categoryName="Chairs"
                    />
                    <FurnitureCategory 
                        redirectPath="./products/tables"
                        image={{uri: 'https://picsum.photos/200/300/?blur&random=4'}}
                        categoryName="Tables"
                    />
                    <FurnitureCategory 
                        redirectPath="./products/Desks"
                        image={{uri: 'https://picsum.photos/200/300/?blur&random=5'}}
                        categoryName="Beds"
                    />
                    <FurnitureCategory 
                    redirectPath="./products/sofas"
                    image={{uri: 'https://picsum.photos/200/300/?blur&random=6'}}
                    categoryName="Sofas"
                    />
                    <FurnitureCategory 
                        redirectPath="./products/chairs"
                        image={{uri: 'https://picsum.photos/200/300/?blur&random=7'}}
                        categoryName="Chairs"
                    />
                    <FurnitureCategory 
                        redirectPath="./products/tables"
                        image={{uri: 'https://picsum.photos/200/300/?blur&random=8'}}
                        categoryName="Tables"
                    />
                    <FurnitureCategory 
                        redirectPath="./products/Desks"
                        image={{uri: 'https://picsum.photos/200/300/?blur&random=9'}}
                        categoryName="Beds"
                    />
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
        height: 250,
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
