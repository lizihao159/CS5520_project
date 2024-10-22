import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PressableButton from './PressableButton';
import { setWarningFlag } from '../Firebase/firestoreHelper';
import GoalUsers from './GoalUsers';

export default function GoalDetails({ route, navigation }) {
  const { goal } = route.params;
  const [textColor, setTextColor] = useState('black');

  const handleWarningPress = async () => {
    setTextColor('red');
    navigation.setOptions({ title: 'Warning!' });

    try {
      await setWarningFlag(goal.id);
      console.log(`Warning flag set for goal with id: ${goal.id}`);
    } catch (error) {
      console.error('Error setting warning flag:', error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          iconName="warning"
          onPress={handleWarningPress}
          customStyles={{ backgroundColor: 'transparent', padding: 10 }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: textColor }]}>Details of {goal.text}</Text>
      <Text style={[styles.text, { color: textColor }]}>ID: {goal.id}</Text>

      <Button
        title="More details"
        onPress={() => navigation.push('Details', { goal })}
        color="#007BFF"
      />

      {/* Pass the goal ID to GoalUsers */}
      <GoalUsers goalId={goal.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
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
