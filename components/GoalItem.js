import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GoalItem = ({ goal, onDelete, onNavigate }) => {
  return (
    <View style={styles.textWrapper}>
      <Text style={styles.goalText}>{goal.text}</Text>
      {/* Delete button */}
      <Button title="X" color="black" onPress={() => onDelete(goal.id)} />
      {/* Navigate button */}
      <Button title="i" color="#007BFF" onPress={() => onNavigate(goal)} />
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
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
    color: 'blue',
  },
});

export default GoalItem;
