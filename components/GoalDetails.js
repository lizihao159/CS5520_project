import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// This component will display details of the goal
export default function GoalDetails({ route }) {
  // Retrieve the goal details passed through navigation
  const { goal } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Goal Details</Text>
      <Text style={styles.text}>ID: {goal.id}</Text>
      <Text style={styles.text}>Text: {goal.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
