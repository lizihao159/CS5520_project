import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import Firebase Auth methods
import { auth } from './Firebase/firebaseSetup'; // Firebase Auth instance

import Home from './components/Home';
import GoalDetails from './components/GoalDetails';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import PressableButton from './components/PressableButton'; // Reusable button component

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null); // State to track authentication status
  const [loading, setLoading] = useState(true); // Loading indicator state

  // Firebase listener to monitor authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('User logged in:', {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || 'N/A',
          emailVerified: currentUser.emailVerified,
        });
        setUser(currentUser); // Update the user state with the logged-in user
      } else {
        console.log('User is logged out');
        setUser(null); // Clear the user state
      }
      setLoading(false); // Stop the loading indicator
    });

    return unsubscribe; // Clean up the listener on unmount
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  // Define the AuthStack for unauthenticated users
  const AuthStack = (
    <>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </>
  );

  // Define the AppStack for authenticated users
  const AppStack = (
    <>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: 'All My Goals',
          headerRight: () => (
            <PressableButton
              iconName="person-outline"
              onPress={() => navigation.navigate('Profile')}
              customStyles={{ backgroundColor: 'transparent', padding: 10 }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Details"
        component={GoalDetails}
        options={({ route }) => ({
          title: route.params.goal.text,
        })}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          title: 'Profile',
          headerRight: () => (
            <PressableButton
              iconName="exit-outline"
              onPress={async () => {
                try {
                  await signOut(auth); // Log out the user
                } catch (error) {
                  console.error('Error signing out:', error);
                }
              }}
              customStyles={{ backgroundColor: 'transparent', padding: 10 }}
            />
          ),
        })}
      />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'purple' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 22 },
        }}
      >
        {/* Render either the AuthStack or AppStack based on the user's authentication state */}
        {user ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
