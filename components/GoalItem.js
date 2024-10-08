import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const GoalItem = ({ goal, onDelete }) => {
  const [isPressed, setIsPressed] = useState(false); // Track pressed state
  const navigation = useNavigation(); // Get the navigation object

  // Function to handle navigation to GoalDetails screen
  const handlePress = () => {
    navigation.navigate('Details', { goal }); // Navigate to the GoalDetails screen
  };

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}  // Set pressed state on press
      onPressOut={() => setIsPressed(false)} // Reset state on release
      onPress={handlePress}
      android_ripple={{borderless: false, foreground: false }} // Adding ripple effect for Android
    >
      <View style={isPressed ? styles.ripplestyle : styles.textWrapper}>
        <Text style={styles.goalText}>{goal.text}</Text>
        {/* Delete button */}
        <Button title="X" color="black" onPress={() => onDelete(goal.id)} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    backgroundColor: '#d3d3d3',
    padding: 15,
    borderRadius: 6,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalText: {
    fontSize: 20,
    color: 'blue',
  },
  ripplestyle: {
    backgroundColor: 'blue',  // Light blue background when pressed
    padding: 15,
    borderRadius: 6,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default GoalItem;
