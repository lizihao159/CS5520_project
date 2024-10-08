import React from 'react';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const GoalItem = ({ goal, onDelete }) => {
  const navigation = useNavigation(); // Get the navigation object

  // Function to handle navigation to GoalDetails screen
  const handlePress = () => {
    navigation.navigate('Details', { goal }); // Navigate to the GoalDetails screen
  };

  return (
    <View style={styles.textWrapper}>
      <Text style={styles.goalText}>{goal.text}</Text>
      {/* Delete button */}
      <Button title="X" color="black" onPress={() => onDelete(goal.id)} />
      
      {/* Replace the i button with a Pressable */}
      <Pressable onPress={handlePress} style={styles.pressable}>
        <Text style={styles.pressableText}>i</Text>
      </Pressable>
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
  pressable: {
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 3,
  },
  pressableText: {
    color: 'white',
    fontSize: 16,
  },
});

export default GoalItem;
