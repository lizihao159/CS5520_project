import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { auth } from '../Firebase/firebaseSetup'; // Firebase Auth instance
import { signOut } from 'firebase/auth'; // Sign out function

export default function Profile({ navigation }) {
  const [user, setUser] = useState(null);

  // Fetch the current user
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out user
      Alert.alert('Success', 'You have been logged out!');

      // Reset the navigation stack to the Login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text>{user.email}</Text>
          <Text>{user.uid}</Text>
        </>
      ) : (
        <Text>Loading user info...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
