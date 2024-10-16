import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PressableButton from './PressableButton'; // Import the reusable PressableButton component
import { setWarningFlag } from '../Firebase/firestoreHelper'; // Import the new helper function

// This component will display details of the goal
export default function GoalDetails({ route, navigation }) {
  // Retrieve the goal details from route params
  const { goal } = route.params;

  // Local state to manage the text color
  const [textColor, setTextColor] = useState('black');

  // Function to handle the "Warning" button press
  const handleWarningPress = async () => {
    // Change the text color to red
    setTextColor('red');
    // Update the header title to "Warning!"
    navigation.setOptions({ title: 'Warning!' });

    // Update the Firestore document to set warning: true
    try {
      await setWarningFlag(goal.id);
      console.log(`Warning flag set for goal with id: ${goal.id}`);
    } catch (error) {
      console.error('Error setting warning flag:', error);
    }
  };

  // Use useLayoutEffect to add the header button when the component mounts
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          iconName="warning" // Use warning icon
          onPress={handleWarningPress}
          customStyles={{
            backgroundColor: 'transparent', // Transparent background for the header button
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

      {/* More Details button */}
      <Button title="More details" onPress={() => navigation.push('Details', { goal })} color="#007BFF" />
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
