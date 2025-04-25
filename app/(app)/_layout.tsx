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
                        borderBottomColor: Colors.border,
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
                }}
            >
                <Stack.Screen name='home/index' options={{ title: 'Home Page', headerShown: false}}/>
            </Stack>
        </>
    );
}