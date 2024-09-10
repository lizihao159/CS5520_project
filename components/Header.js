import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function Header() {
    return (
        <View>
            <Text>Welcome to {props.name}</Text>
        </View>
    );
}