import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GoalItem = ({ goal }) => {
  return (
    <View style={styles.textWrapper}>
      <Text style={styles.goalText}>{goal.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    backgroundColor: '#d3d3d3', // Light gray background 
    padding: 10,
    borderRadius: 6, // Rounded corners 
    marginVertical: 10, // Spacing between goals
  },
  goalText: {
    fontSize: 100, // Adjusted font size for readability
    color: 'blue', // Text color set to blue
  },
});

export default GoalItem;
