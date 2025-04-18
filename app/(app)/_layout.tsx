import { Stack, Tabs } from "expo-router";
import { StatusBar } from "react-native";
import { Colors } from "../constants/Colors";

export default function AppLayout() {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Stack 
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.primaryBackground,
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.border,//'#AA765250',
                    },
                    headerTitleStyle: {
                        color: Colors.primaryText,//'#58524A',
                        fontSize: 20,
                        fontWeight: '600',
                    },
                    headerTintColor: Colors.buttonBackground,//'#AA7652',
                    // Add these for Android status bar
                    statusBarColor: Colors.primaryBackground,//'#EBDAC2', // Matches header background
                    statusBarStyle: 'dark', // Dark text for status bar
                }}
            >
                <Stack.Screen name='home/home' options={{ title: 'Home Page', headerShown: false}}/>
            </Stack>
        </>
    );
}