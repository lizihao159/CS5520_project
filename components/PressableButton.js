import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icons

const PressableButton = ({ onPress, iconName, title, customStyles }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'gray', borderless: false }}
      style={({ pressed }) => [
        customStyles, // Apply custom styles passed from parent component
        pressed ? styles.pressedButton : null,
      ]}
    >
      {/* If iconName is provided, render the icon; otherwise, render the text */}
      {iconName ? (
        <Ionicons name={iconName} size={24} color="white" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 16,
  },
  pressedButton: {
    backgroundColor: 'red', // Change color when pressed
    opacity: 0.7, // Apply opacity for pressed state
  },
});

export default PressableButton;
