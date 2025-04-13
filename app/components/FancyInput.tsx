import { TextInput, Text, View, StyleSheet, TextInputProps, Pressable, StyleProp, ViewStyle } from 'react-native';
import { useRef } from 'react';

interface FancyInputProps extends TextInputProps {
    label?: string;
    error?: string;
}; // Inherits all TextInput props

export default function FancyInput({ label, error, ...props } : FancyInputProps) {
    const inputRef = useRef<TextInput>(null);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <View style={[styles.container, error && styles.errorInput]}>
            {label && (
                <Pressable onPress={focusInput} style={styles.pressable as StyleProp<ViewStyle>}>
                    <Text style={styles.label}>{label}</Text>
                </Pressable>
                )}
            <TextInput
                ref={inputRef}
                style={[styles.input && {outlineStyle: 'none'} as StyleProp<TextInputProps>, props.style]} 
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
        paddingVertical: 3,
        borderRadius: 10,
        backgroundColor:"#F0E3D1",
        marginVertical: 3,
        maxWidth: 400,
        alignSelf: 'center',
    },
    label: {
        color: "#5C5248",
        fontWeight: '600',
        paddingTop: 5,
        marginBottom: 3,
    },
    pressable: {
        cursor: "default"
    },
    input: {
        padding: 3
    },
    errorInput: {
        
    },
    errorText: {
        color: 'red'
    }
})