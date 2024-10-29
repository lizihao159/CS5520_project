import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';
import Login from './components/Login'; // Import Login screen
import Signup from './components/Signup'; // Import Signup screen
import PressableButton from './components/PressableButton'; // Import reusable PressableButton component

// Create the stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login" // Set initial route to Login screen
        screenOptions={{
          headerStyle: { backgroundColor: 'purple' }, // Unified header background color
          headerTintColor: 'white', // Header text color
          headerTitleStyle: { fontWeight: 'bold', fontSize: 22 }, // Title text styling
        }}
      >
        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />

        {/* Signup Screen */}
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ title: 'Signup' }}
        />

        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}
        />

        {/* GoalDetails Screen with dynamic header */}
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ route, navigation }) => ({
            title: route.params.goal.text, // Use goal text as title
            headerRight: () => (
              <PressableButton
                iconName="warning"
                onPress={() => Alert.alert('Warning', 'This is a warning message')}
                customStyles={{
                  backgroundColor: 'transparent',
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
