import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';

export default function Header({ name, headerStyle, textStyle }) {
    const { width, height } = useWindowDimensions(); // Hook to get current width and height

    // Define dynamic padding based on the height and width of the screen
    const paddingVerticalDynamic = height < 415 ? 0 : 10;
    const paddingHorizontalDynamic = width < 380 ? 10 : 20;

    return (
        <View
            style={[
                styles.headerContainer,
                headerStyle,
                { 
                    paddingVertical: paddingVerticalDynamic, 
                    paddingHorizontal: paddingHorizontalDynamic 
                }
            ]}
        >
            <Text style={[styles.headerText, textStyle]}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        borderWidth: 2,
        borderColor: 'purple',
        borderRadius: 10,
        marginBottom: 10,
        alignSelf: 'center',
        backgroundColor: '#e1bee7', // Light purple background
    },
    headerText: {
        color: 'purple',
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
    },
});
