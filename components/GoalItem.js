import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import PressableButton from './PressableButton'; // Import the reusable PressableButton component

const GoalItem = ({ goal, onDelete, onNavigate }) => {
  return (
    <Pressable
      onPress={() => onNavigate(goal)}
      android_ripple={{ color: '#ccc' }} // Android ripple effect
      style={({ pressed }) => [
        styles.goalItem,
        pressed && Platform.OS === 'ios' ? styles.pressedItem : null, // Special effect for iOS
      ]}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.goalText}>{goal.text}</Text>
        
        {/* Use PressableButton for the delete button with a trash icon */}
        <PressableButton 
          iconName="trash"  // Use Ionicons' trash icon
          onPress={() => onDelete(goal.id)}
          customStyles={styles.deleteButton}  // Custom style for delete button
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
    // Since we are using conditional pressed styles, we won't specify iOS pressed styles here
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
    width: 50, // Size suitable for icon
  },
  pressedItem: {
    opacity: 0.7, // Special pressed effect for iOS
  },
});

export default GoalItem;
