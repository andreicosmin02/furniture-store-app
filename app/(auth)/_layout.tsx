import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AuthLayout() {
    return (
        <>
            <StatusBar style="dark" />
            <Stack 
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#EBDAC2',
                        borderBottomWidth: 1,
                        borderBottomColor: '#AA765250',
                    },
                    headerTitleStyle: {
                        color: '#58524A',
                        fontSize: 20,
                        fontWeight: '600',
                    },
                    headerTintColor: '#AA7652',
                    // Add these for Android status bar
                    statusBarColor: '#EBDAC2', // Matches header background
                    statusBarStyle: 'dark', // Dark text for status bar
                }}
            >
                <Stack.Screen name='login' options={{ title: 'Login Screen' }}/>
                <Stack.Screen name='register' options={{ title: 'Register Screen' }}/>
            </Stack>
        </>
    );
}