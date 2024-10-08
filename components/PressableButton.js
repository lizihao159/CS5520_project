// PressableButton.js
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const PressableButton = ({ title, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'gray', borderless: false }} // Ripple effect for Android
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.pressedButton : null, // Apply pressed style for iOS
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  pressedButton: {
    backgroundColor: 'red', // Change color when pressed (for iOS)
    opacity: 0.7, // Apply opacity for pressed state
  },
});

export default PressableButton;
