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
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#fff' }, // Default header background color
          headerTintColor: '#800080', // Default header font color
          headerTitleStyle: { fontWeight: 'bold' }, // Default header title style
        }}
      >
        {/* Home Screen with customized header options */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home', // Custom title for Home
            headerStyle: { backgroundColor: 'white' },
            headerTintColor: 'purple', 
            headerTitleStyle: { fontSize: 22, fontWeight: 'bold' },
          }}
        />
        
        {/* GoalDetails screen */}
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={{ title: 'Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
