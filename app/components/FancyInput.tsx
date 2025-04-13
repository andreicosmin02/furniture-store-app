import { TextInput, Text, View, StyleSheet, TextInputProps, Pressable, StyleProp, ViewStyle } from 'react-native';
import { useRef } from 'react';
import { MaterialIcons } from '@expo/vector-icons'

interface FancyInputProps extends TextInputProps {
    label?: string;
    error?: string;
    icon?: keyof typeof MaterialIcons.glyphMap;
}; // Inherits all TextInput props

export default function FancyInput({ label, error, icon, ...props } : FancyInputProps) {
    const inputRef = useRef<TextInput>(null);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <Pressable onPress={focusInput} style={styles.pressable as StyleProp<ViewStyle>}>
            <View style={[styles.container, error && styles.errorInput]}>
                {label && (
                    
                        <Text style={styles.label}>{label}</Text>
                
                    )}
                <View style={styles.inputContainer}>
                    {icon && (
                        <MaterialIcons
                            name={icon}
                            size={20}
                            color="#5C5248"
                            style={styles.icon}
                        />
                    )}
                    <TextInput
                        ref={inputRef}
                        style={[
                            styles.input && {outlineStyle: 'none'} as StyleProp<TextInputProps>
                        ]} 
                        placeholderTextColor="#999"
                        {...props}
                    />
                </View>
            </View>
        </Pressable>
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
        borderWidth: 1,
        borderColor: 'transparent'
    },
    label: {
        color: "#5C5248",
        fontWeight: '600',
        paddingTop: 5,
        marginBottom: 3,
    },
    pressable: {
        cursor: "default",
        
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        padding: 3,
        width: '80%',
        maxWidth: '80%'
    },
    errorInput: {
        // borderColor: 'red',
        // borderWidth: 1,
    },
    errorText: {
        color: 'red'
    }
})