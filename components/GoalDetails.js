import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// This component will display details of the goal
export default function GoalDetails({ route, navigation }) {
  // Retrieve the goal details and title from route params
  const { goal, title } = route.params;

  // Function to handle pushing another GoalDetails screen on the stack
  const handleMoreDetails = () => {
      // Navigate to a new screen with title "More Details"
      navigation.push('Details', { goal, title: 'More Details'  });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title || 'Goal Details'}</Text>

      {/* Conditionally render goal details only if title is not "More Details" and goal exists */}
      {title !== 'More Details' && goal && (
        <>
          <Text style={styles.text}>You are seeing the details of the goal with text: {goal.text}</Text>
          <Text style={styles.text}>ID: {goal.id}</Text>
        </>
      )}

      {/* More Details button */}
      <Button title="More details" onPress={handleMoreDetails} color="#007BFF" />
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
