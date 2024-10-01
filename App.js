import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';

// Create the stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Define stack navigator */}
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#800080',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Register Home screen */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}
        />
        {/* Register GoalDetails screen */}
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={{ title: 'Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
