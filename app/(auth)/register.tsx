import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Register() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Register Screen</Text>
            <Link href='/login' style={{ color: 'blue' }}>
                Go to Login
            </Link>
        </View>
    );
}