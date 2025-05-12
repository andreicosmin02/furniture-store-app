import { Link, router } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from "react-native";
import FancyInput from "../components/FancyInput";
import Button from "../components/Button";
import ImageWithLoader from "../components/ImageWithLoader";
import { isValidEmail, isValidPassword } from "../utils/validation";
import { Colors } from "../constants/Colors";

export default function Register() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    
    const handleRegister = () => {
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            setError("Please fill in all the fields");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!isValidPassword(password)) {
            setError("Weak password");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        // TODO: Register logic

        router.replace('/(app)/home')
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <SafeAreaView style={styles.container}>
                    {/* <Text style={styles.header}>Register Screen</Text> */}
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
                    <Button onPress={handleRegister}>Register</Button>
                    <Link href='/login' style={{ color: Colors.primaryText, margin: 10, textAlign:"center" }}>
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
        backgroundColor: Colors.primaryBackground,//'#EBDAC2',
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
        color: Colors.primaryText,
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
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    }
})