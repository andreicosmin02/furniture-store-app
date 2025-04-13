import { useState } from "react";
import { StyleSheet, ActivityIndicator, ImageProps, View, Image, ViewProps } from "react-native";

export default function ImageWithLoader({ style, ...props }: ImageProps ) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <View style={[styles.container, style as ViewProps]}>
            <Image
                {...props}
                onLoadEnd={() => setIsLoading(false)}
                style={[styles.image, style]}
            />
            {isLoading && (
                <View style={styles.loader}>
                    <ActivityIndicator size="small" color="#AA7652"/>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        overflow: 'hidden'
    },
    image: {
        width: "100%",
        height: "100%",
    },
    loader: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBDAC2'
    }
})