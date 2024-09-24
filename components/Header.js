// components/Header.js

import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Header({ name, headerStyle, textStyle }) {
    return (
        <View style={[styles.headerContainer, headerStyle]}>
            <Text style={[styles.headerText, textStyle]}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        borderWidth: 2,
        borderColor: 'purple',
        padding: 7,
        borderRadius: 10,
        marginBottom: 10, 
    },
    headerText: {
        color: 'purple',
        fontSize: 20, 
        fontWeight: 'flat', 
        textAlign: 'center', 
    },
});
