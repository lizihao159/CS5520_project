import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Alert } from 'react-native';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';

// Create the stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        // Unified header styling for all screens
        screenOptions={{
          headerStyle: { backgroundColor: 'purple' }, // Consistent header background color
          headerTintColor: 'white', // Consistent header font color
          headerTitleStyle: { fontWeight: 'bold', fontSize: 22 }, // Consistent header title style
        }}
      >
        {/* Home Screen with default header options */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
          }}
        />
        
        {/* GoalDetails screen with dynamic header title */}
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ route, navigation }) => ({
            title: route.params.goal.text, 
            
            // Add a button to the right side of the header
            headerRight: () => (
              <Button
                title="Warning"
                color="#FF6347"
                onPress={() => Alert.alert('Warning', 'This is a warning message')}
              />
            ),

            // Optional: Add a button to the left side of the header
            headerLeft: () => (
              <Button
                title="Back"
                color="#FFFFFF"
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
