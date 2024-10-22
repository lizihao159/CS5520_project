import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PressableButton from './PressableButton'; // Import the reusable PressableButton component
import { setWarningFlag } from '../Firebase/firestoreHelper'; // Import the Firestore helper function
import GoalUsers from './GoalUsers'; // Import GoalUsers component

// This component displays the goal details
export default function GoalDetails({ route, navigation }) {
  // Retrieve goal details from route params
  const { goal } = route.params;

  // Local state to manage the text color
  const [textColor, setTextColor] = useState('black');

  // Function to handle the "Warning" button press
  const handleWarningPress = async () => {
    // Update text color to red and change header title to "Warning!"
    setTextColor('red');
    navigation.setOptions({ title: 'Warning!' });

    // Set the warning flag in Firestore
    try {
      await setWarningFlag(goal.id);
      console.log(`Warning flag set for goal with id: ${goal.id}`);
    } catch (error) {
      console.error('Error setting warning flag:', error);
    }
  };

  // Add the warning icon button in the header when the component mounts
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          iconName="warning" // Warning icon
          onPress={handleWarningPress} // Call handleWarningPress on click
          customStyles={{
            backgroundColor: 'transparent',
            padding: 10,
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: textColor }]}>Details of {goal.text}</Text>
      <Text style={[styles.text, { color: textColor }]}>ID: {goal.id}</Text>

      {/* Button to push more details onto the stack */}
      <Button
        title="More details"
        onPress={() => navigation.push('Details', { goal })}
        color="#007BFF"
      />

      {/* Render the GoalUsers component */}
      <GoalUsers />
    </View>
  );
}

// Styles for the component
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
