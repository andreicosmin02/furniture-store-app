import { Link, router } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import FancyInput from "../components/FancyInput";
import Button from "../components/Button";
import ImageWithLoader from "../components/ImageWithLoader";
import { isValidEmail, isValidPassword } from "../utils/validation";
import { Colors } from "../constants/Colors";
import { useAuthStore } from "../data/authStore";

export default function Register() {
    const { login } = useAuthStore();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        // Reset error state
        setError('');
        
        // Validate inputs
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError("Please fill in all the fields");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!isValidPassword(password)) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setIsLoading(true);
            
            // Create customer registration payload
            const payload = {
                firstName,
                lastName,
                email,
                password
            };

            // Make API call to register customer
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}auth/register/customer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // If registration is successful, automatically log the user in
            await login(email, password);
            
            // Redirect to home after successful login
            router.replace('/(app)/home');
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <SafeAreaView style={styles.container}>
                    <ImageWithLoader 
                        style={styles.homeImage}
                        source={require('../../assets/images/register_page.jpg')}
                    />
                    <FancyInput
                        label="First Name"
                        placeholder="John"
                        value={firstName}
                        onChangeText={setFirstName}
                        error={error}
                        icon="person"
                    />
                    <FancyInput
                        label="Last Name"
                        placeholder="Doe"
                        value={lastName}
                        onChangeText={setLastName}
                        error={error}
                        icon="person"
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
                        placeholder="********"
                        secureTextEntry
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                        error={error}
                        icon="lock"
                    />
                    <FancyInput
                        label="Confirm Password"
                        placeholder="********"
                        secureTextEntry
                        autoCapitalize="none"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        error={error}
                        icon="lock"
                    />
                    <Button 
                        onPress={handleRegister}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : 'Register'}
                    </Button>
                    <Link href='/login' style={styles.loginLink}>
                        You have an account? Log in.
                    </Link>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </SafeAreaView>
            </ScrollView>                                   
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBackground,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    homeImage: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
        height: 250,
        marginBottom: 20,
        borderRadius: 15
    },
    loginLink: {
        color: Colors.primaryText,
        margin: 10,
        textAlign: "center",
    },
    errorText: {
        color: Colors.error,
        textAlign: 'center',
        marginBottom: 10,
    }
});