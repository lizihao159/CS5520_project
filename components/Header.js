import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Header({ name }) {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        borderWidth: 2, // Adjust border width
        borderColor: 'purple', // Adjust border color
        padding: 7, // padding around the text
        borderRadius: 10, // Rounded corners
        marginBottom: 10, 
    },
    headerText: {
        color: 'purple', // Purple text color
        fontSize: 20, 
        fontWeight: 'flat', 
        textAlign: 'center', 
    },
});
