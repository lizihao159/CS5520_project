import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';

// Create the stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Define stack navigator */}
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#fff' }, // Customize header background color
          headerTintColor: '#800080', // Customize header text color
          headerTitleStyle: { fontWeight: 'bold' }, // Additional header text styling
        }}
      >
        {/* Register the Home screen */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'My Awesome App' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
