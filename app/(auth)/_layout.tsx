import { Redirect, router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Colors';
import { useAuthStore } from '../data/authStore';
import { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function AuthLayout() {
    const { token, isLoading } = useAuthStore();

    useEffect(() => {
      if (!isLoading && !token) {
        router.replace('/login');
      }
    }, [token, isLoading]);
  
    if (isLoading) {
      return <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.buttonBackground} />
      </View>;
    }
  
    if (!token) {
      return <Redirect href="/login" />;
    }

    return (
        <>
            <StatusBar style="dark" />
            <Stack 
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.primaryBackground,//'#EBDAC2',
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.border,//'#AA765250'
                        
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

const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primaryBackground,
    },
  });