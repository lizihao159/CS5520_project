import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PressableButton from './PressableButton'; // Import the reusable PressableButton component

const GoalItem = ({ goal, onDelete }) => {
  return (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{goal.text}</Text>
      {/* Use PressableButton for the delete button with a trash icon */}
      <PressableButton 
        iconName="trash"  // Use Ionicons' trash icon
        onPress={() => onDelete(goal.id)}
        customStyles={styles.deleteButton}  // Custom style for delete button
      />
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
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
});

export default GoalItem;
