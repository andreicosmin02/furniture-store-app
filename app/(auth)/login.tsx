import { Link, Redirect, router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View, StyleSheet, Image } from 'react-native'
import FancyInput from "../components/FancyInput";
import Button from "../components/Button";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        // TODO: Login Logic

        router.replace('/(app)/home');
    }

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <Text style={styles.header}>Login Screen</Text>
                <Image 
                    style={styles.homeImage}
                    source={require('../../assets/images/login_furniture.jpg')}
                />
                <FancyInput
                    label="Email Address"
                    placeholder="example@example.com"
                />
                <FancyInput
                    label="Password"
                    placeholder="Enter your password"
                    secureTextEntry
                />
                <Button onPress={handleLogin}>Log In</Button>
                <Link href='/register' style={{ color: '#58524A', margin: 10 }}>
                    Don't you have an account? Sign up.
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#EBDAC2",
        height: "100%",
        width: '100%',
        alignItems: 'center'
    },
    container: {
        padding: 30,
        flex:1,
        alignItems: 'center',
        backgroundColor: "#EBDAC2",
        width: 350,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#58524A'
    },
    homeImage: {
        width: '100%',
        height: 175,
        margin: 20,
        borderRadius: 15
    },
    login: {
        margin: 3,
        width: 300, 
        borderRadius: 15
    }
})