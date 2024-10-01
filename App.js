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
        screenOptions={{
          headerStyle: { backgroundColor: 'purple' }, // Default header background color
          headerTintColor: 'white', // Default header font color
          headerTitleStyle: { fontWeight: 'bold', fontSize: 22 }, // Default header title style
        }}
      >
        {/* Home Screen with customized header options */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
          }}
        />
        
        {/* GoalDetails screen with dynamic header title and header button */}
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ route, navigation }) => ({
            // Dynamically set the header title based on goal text
            title: route.params.goal.text, 
            
            // Add a button to the right side of the header
            headerRight: () => (
              <Button
                title="Warning"
                color="yellow"
                onPress={() => Alert.alert('Warning', 'warning message')}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
