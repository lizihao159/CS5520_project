import { View, Text, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import React from 'react';

export default function Header({ name, headerStyle, textStyle }) {
    const { width, height } = useWindowDimensions(); // Hook to get current dimensions

    // Define dynamic padding based on screen dimensions
    const paddingVerticalDynamic = height < 415 ? 0 : 10;
    const paddingHorizontalDynamic = width < 380 ? 10 : 20;

    return (
        <View
            style={[
                styles.headerContainer,
                headerStyle,
                {
                    paddingVertical: paddingVerticalDynamic,
                    paddingHorizontal: paddingHorizontalDynamic,
                },
            ]}
        >
            <Text style={[styles.headerText, textStyle]}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        borderWidth: Platform.select({ ios: 2, android: 4 }), // Different border width for iOS and Android
        borderColor: Platform.select({ ios: 'purple', android: 'slateblue' }), // Optional: Different colors per platform
        borderRadius: 10,
        marginBottom: 10,
        alignSelf: 'center',
        backgroundColor: '#e1bee7', // Light purple background for visibility
    },
    headerText: {
        color: 'purple',
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
    },
});
