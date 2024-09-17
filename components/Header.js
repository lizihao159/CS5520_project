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
        borderWidth: 2, // Adding a border
        borderColor: 'purple', // Border color
        padding: 10, // Add padding inside the border
        borderRadius: 10, // Rounded corners
        marginBottom: 10, 
    },
    headerText: {
        color: 'purple', // Purple text color
        fontSize: 18, 
        fontWeight: 'bold', 
        textAlign: 'center', 
    },
});
