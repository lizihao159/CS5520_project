import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// This component will display details of the goal
export default function GoalDetails({ route, navigation }) {
  // Retrieve the goal details from route params
  const { goal } = route.params;

  // Local state to manage the text color
  const [textColor, setTextColor] = useState('black');

  // Function to handle the "Warning" button press
  const handleWarningPress = () => {
    // Change the text color to red
    setTextColor('red');
    // Update the header title to "Warning!"
    navigation.setOptions({ title: 'Warning!' });
  };

  // Function to handle navigating to MoreDetails screen
  const handleMoreDetails = () => {
    // Push another instance of the GoalDetails screen
    navigation.push('Details', { goal, title: 'More Details' });
  };

  // Use useLayoutEffect to add the header button when the component mounts
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Warning" color="#FF6347" onPress={handleWarningPress} />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: textColor }]}>Details of {goal.text}</Text>
      <Text style={[styles.text, { color: textColor }]}>ID: {goal.id}</Text>

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
