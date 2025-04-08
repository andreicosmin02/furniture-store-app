import { ReactNode } from "react"
import { GestureResponderEvent, Pressable, StyleSheet, Text } from "react-native";

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
        hitSlop={10} // Exapnds touch area without visual change
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
        backgroundColor: '#AA7652',
        borderRadius: 15,
        maxWidth: 400,
        alignSelf: 'center',
    },
    pressed: {
        backgroundColor: '#d1b39f'
    },
    disabled: {
        backgroundColor: '#CAA991'
    }, 
    text: {
        fontSize: 20,
        color: '#F4EDE2'
    }
})