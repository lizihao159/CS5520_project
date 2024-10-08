import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';
import PressableButton from './components/PressableButton'; // Import the reusable PressableButton component

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
            
            // Add a PressableButton with an icon to the right side of the header
            headerRight: () => (
              <PressableButton
                iconName="warning" // Only pass iconName to show the icon
                onPress={() => Alert.alert('Warning', 'This is a warning message')}
                customStyles={{
                  backgroundColor: 'transparent', // Transparent background for the header button
                  padding: 10,
                }}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
