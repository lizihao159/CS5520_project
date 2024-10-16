import React from 'react';
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import PressableButton from './PressableButton'; // Import the reusable PressableButton component

const GoalItem = ({ goal, onDelete, onNavigate, onHighlight, onUnhighlight }) => {
  // Function to handle long press and show alert
  const handleLongPress = () => {
    Alert.alert(
      "Delete Goal", // Alert title
      "Are you sure you want to delete this goal?", // Alert message
      [
        {
          text: "Cancel", // Cancel button
          style: "cancel"
        },
        {
          text: "Delete", // Delete button
          onPress: () => onDelete(goal.id), // Call onDelete function if user confirms
          style: "destructive" // Use a destructive style for the delete button
        }
      ]
    );
  };

  return (
    <Pressable
      onPress={() => {
        onNavigate(goal); // Navigate to details on press
      }}
      onLongPress={handleLongPress} // Handle long press to delete
      android_ripple={{ color: '#ccc' }} // Android ripple effect
      onPressIn={onHighlight} // Highlight separator when pressed
      onPressOut={onUnhighlight} // Unhighlight separator when released
      style={({ pressed }) => [
        styles.goalItem,
        pressed ? styles.pressedItem : null, // Apply pressed style for iOS
      ]}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.goalText}>{goal.text}</Text>

        {/* Use PressableButton for the delete button with a trash icon */}
        <PressableButton
          iconName="trash" // Use Ionicons' trash icon
          onPress={() => onDelete(goal.id)} // Delete directly if the trash icon is pressed
          customStyles={styles.deleteButton} // Custom style for delete button
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalText: {
    fontSize: 20,
    color: 'purple',
  },
  deleteButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40, // Size suitable for icon
  },
  pressedItem: {
    opacity: 0.7, // Apply opacity change for pressed effect
  },
});

export default GoalItem;
