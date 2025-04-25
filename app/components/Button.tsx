import { ReactNode } from "react"
import { GestureResponderEvent, Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/Colors";

type ButtonProps = {
    children: ReactNode;
    onPress?: (event: GestureResponderEvent) => void;
    disabled?: boolean;
    style?: object;
    textStyle?: object;
}

export default function Button({
    children,
    onPress,
    disabled = false,
    style,
    textStyle,
}: ButtonProps) {
    return (
        <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
            styles.base,
            style,
            pressed && styles.pressed,
            disabled && styles.disabled
        ]}
        hitSlop={10} // Exapands touch area without visual change
        >
            <Text style={[styles.text, textStyle]}>{children}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        margin: 3,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: Colors.buttonBackground,//'#AA7652',
        borderRadius: 15,
        maxWidth: 400,
        alignSelf: 'center',
    },
    pressed: {
        backgroundColor: Colors.buttonPressedBackground,
    },
    disabled: {
        backgroundColor: Colors.buttonDisabledBackground,
    }, 
    text: {
        fontSize: 20,
        color: Colors.buttonText,//'#F4EDE2'
    }
})