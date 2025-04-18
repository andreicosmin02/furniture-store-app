import { TextInput, Text, View, StyleSheet, TextInputProps, Pressable, StyleProp, ViewStyle } from 'react-native';
import { useRef } from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors';

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
            {label && (
                
                    <Text style={styles.label}>{label}</Text>
            
                )}
            <View style={styles.inputContainer}>
                {icon && (
                    <MaterialIcons
                        name={icon}
                        size={20}
                        color={Colors.inputText}//"#5C5248"
                        style={styles.icon}
                    />
                )}
                <TextInput
                    ref={inputRef}
                    style={[
                        styles.input, 
                        {outlineStyle: 'none'} as StyleProp<TextInputProps>,
                    ]} 
                    
                    placeholderTextColor={Colors.placeHolderText}
                    {...props}
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressable: {
        width: '100%',
        paddingInline: 15,
        paddingVertical: 3,
        borderRadius: 10,
        backgroundColor: Colors.inputBackground,//"#F0E3D1",
        marginVertical: 3,
        maxWidth: 400,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
        cursor: "default",
    },
    label: {
        color: Colors.inputText,//"#5C5248",
        fontWeight: '600',
        paddingTop: 5,
        marginBottom: 3,
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
        width: '100%',
        flex: 1,
        padding: 3,
    },
    errorInput: {
        
    },
    errorText: {
        color: Colors.error
    }
})