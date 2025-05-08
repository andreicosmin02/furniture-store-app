import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Colors';

export default function AuthLayout() {
    return (
        <>
            <StatusBar style="dark" />
            <Stack 
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.primaryBackground,//'#EBDAC2',
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.border//'#AA765250',
                    } as any,
                    headerTitleStyle: {
                        color: Colors.primaryText,//'#58524A',
                        fontSize: 20,
                        fontWeight: '600',
                    },
                    headerTintColor: Colors.buttonBackground,//'#AA7652',
                    // Add these for Android status bar
                    statusBarColor: Colors.primaryBackground,//'#EBDAC2', // Matches header background
                    statusBarStyle: 'dark', // Dark text for status bar
                } as any}
            >
                <Stack.Screen name='login' options={{ title: 'Login Screen' }}/>
                <Stack.Screen name='register' options={{ title: 'Register Screen' }}/>
            </Stack>
        </>
    );
}