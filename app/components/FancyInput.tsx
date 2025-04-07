import { TextInput, Text, View, StyleSheet, TextInputProps, Pressable } from 'react-native';
import { useRef } from 'react';

type FancyInputProps = {
    label?: string;
    error?: string;
} & TextInputProps; // Inherits all TextInput props

export default function FancyInput({ label, error, ...props } : FancyInputProps) {
    const inputRef = useRef<TextInput>(null);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <View style={styles.container}>
            {label && (
                <Pressable onPress={focusInput} style={styles.pressable}>
                    <Text style={styles.label}>{label}</Text>
                </Pressable>
                )}
            <TextInput
                ref={inputRef}
                style={[styles.input, error && styles.errorInput]} 
                placeholderTextColor="#999"
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingInline: 15,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor:"#F0E3D1",
        marginVertical: 3
    },
    label: {
        marginBottom: 5,
        color: "#5C5248",
        fontWeight: '600'
    },
    pressable: {
        cursor: "default"
    },
    input: {
        outlineStyle: 'none',
        padding: 3,
    },
    errorInput: {

    },
    errorText: {

    }
})