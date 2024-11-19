import * as Notifications from 'expo-notifications'; // Import the Notifications API
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, StyleSheet, Alert } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup';

import Home from './components/Home';
import GoalDetails from './components/GoalDetails';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Map from './components/Map';
import PressableButton from './components/PressableButton';

// Configure notification handling
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true, // Show a notification alert
      shouldPlaySound: true, // Play a notification sound
      shouldSetBadge: false, // Do not update the app badge
    };
  },
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Add notification received listener
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      Alert.alert(
        "Notification Received",
        `Title: ${notification.request.content.title}\nMessage: ${notification.request.content.body}`
      );
    });

    // Cleanup listener on unmount
    return () => subscription.remove();
  }, []);

  // Add notification interaction listener
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const { title, body, data } = response.notification.request.content;
      Alert.alert(
        "Notification Interaction",
        `Title: ${title}\nMessage: ${body}\nData: ${JSON.stringify(data)}`
      );
    });

    // Cleanup listener on unmount
    return () => subscription.remove();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  const AuthStack = (
    <>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </>
  );

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
                  await signOut(auth);
                } catch (error) {
                  console.error('Error signing out:', error);
                }
              }}
              customStyles={{ backgroundColor: 'transparent', padding: 10 }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          title: 'Map',
        }}
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
