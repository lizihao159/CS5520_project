import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GoalItem = ({ goal, onDelete }) => {
  return (
    <View style={styles.textWrapper}>
      <Text style={styles.goalText}>{goal.text}</Text>
      {/* delete button*/}
      <Button title="X" color="black" onPress={() => onDelete(goal.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    backgroundColor: '#d3d3d3', // Light gray background 
    padding: 10,
    borderRadius: 6, // Rounded corners 
    marginVertical: 10, // Spacing between goals
    flexDirection: 'row', // Layout items in a row (text and button)
    justifyContent: 'space-between', // Spread items horizontally
    alignItems: 'center', // Center items vertically
  },
  goalText: {
    fontSize: 20, // Adjusted font size for readability
    color: 'blue', // Text color set to blue
  },
});

export default GoalItem;
