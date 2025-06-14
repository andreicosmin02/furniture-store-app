import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet,  SafeAreaView, ScrollView } from 'react-native'
import FancyInput from "../components/FancyInput";
import Button from "../components/Button";
import ImageWithLoader from "../components/ImageWithLoader";
import { isValidEmail, isValidPassword } from "../utils/validation";
import { Colors } from "../constants/Colors";
import { useAuthStore } from "../data/authStore";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    const { login, isLoading, error } = useAuthStore();

    const handleLogin = async () => {
        try {
            await login(email, password);
            router.replace('/(app)/home');
        } catch (error) {
            console.error('Login error: ', error)
        }
    };

    return (
        <View
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <SafeAreaView style={styles.container}>
                    {/* <Text style={styles.header}>Login Screen</Text> */}
                    <ImageWithLoader 
                        style={styles.homeImage}
                        source={require('../../assets/images/login_furniture.jpg')}
                    />
                    <FancyInput
                        label="Email Address"
                        placeholder="example@example.com"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                        error={error}
                        icon="email"
                    />
                    <FancyInput
                        label="Password"
                        placeholder="Enter your password"
                        secureTextEntry
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                        error={error}
                        icon='lock'
                    />
                    <Button 
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...': 'Log In'}
                    </Button>
                    <Link href='/register' style={{ color: Colors.primaryText, margin: 10, textAlign:"center" }}>
                        Don't you have an account? Sign up.
                    </Link>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBackground//'#EBDAC2',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    header: {
        width: '100%',
        maxWidth: 400,
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.primaryText,//'#58524A',
        textAlign: 'center',
        marginBottom: 20,
        alignSelf: 'center'
    },
    homeImage: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
        height: 250,
        marginBottom: 20,
        borderRadius: 15
    },
    login: {
        maxWidth: 400,
        margin: 3,
        borderRadius: 15,
        alignSelf: 'center',
    },
    errorText: {
        color: Colors.error,
        textAlign: 'center',
        marginBottom: 10,
    }
})