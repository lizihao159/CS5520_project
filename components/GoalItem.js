import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton'; // Import the new PressableButton

const GoalItem = ({ goal, onDelete }) => {
  const [isPressed, setIsPressed] = useState(false);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Details', { goal });
  };

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={handlePress}
      android_ripple={{ borderless: false, foreground: false }}
    >
      <View style={isPressed ? styles.ripplestyle : styles.textWrapper}>
        <Text style={styles.goalText}>{goal.text}</Text>

        {/* Use the new PressableButton component for delete */}
        <PressableButton title="X" onPress={() => onDelete(goal.id)} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    backgroundColor: '#d3d3d3',
    padding: 15,
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
  ripplestyle: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 6,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default GoalItem;
