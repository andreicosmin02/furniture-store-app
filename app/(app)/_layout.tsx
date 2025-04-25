import { router, Stack, Tabs } from "expo-router";
import { Pressable, StatusBar } from "react-native";
import { Colors } from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppLayout() {

    function returnHome() {
        return (
            <Pressable 
                onPress={() => router.replace("/home")}
                style={{
                    // backgroundColor: Colors.buttonBackground, // Red for attention
                    padding: 10,
                    borderRadius: 5,
                    margin: 5
                  }}
                
            >
                <MaterialIcons 
                    style={{
                        color: Colors.inputText
                    }}
                    name="home"
                    size={24}
                />
            </Pressable>
        )
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Stack 
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.primaryBackground,
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.border
                    },
                    headerTitleStyle: {
                        color: Colors.primaryText,
                        fontSize: 20,
                        fontWeight: '600',
                    },
                    headerTintColor: Colors.buttonBackground,
                    // Add these for Android status bar
                    statusBarColor: Colors.primaryBackground, // Matches header background
                    statusBarStyle: 'dark', // Dark text for status bar
                    style:"sticky"
                }}
            >
                <Stack.Screen name='home/index' options={{ 
                    title: 'Home Page', 
                    headerShown: false
                }}/>
                <Stack.Screen name='cart/index' options={{ 
                    title: 'Cart Page',
                    headerRight: returnHome,
                    headerTitleAlign: 'center'
                }}/>
                <Stack.Screen name='account/index' options={{ 
                    title: 'Account Page',
                    headerRight: returnHome,
                    headerTitleAlign: 'center'
                }}/>
            </Stack>
        </>
    );
}