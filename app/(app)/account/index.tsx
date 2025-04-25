import FancyInput from "@/app/components/FancyInput";
import TopBar from "@/app/components/TopBar";
import Colors from "@/app/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";

export default function Account() {
    return (
        <View
            // style={styles.container}
        >
            <ScrollView >
                <SafeAreaView >
                    <TopBar/>
                    <Text>Account Screen</Text>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

