import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { auth } from '../Firebase/firebaseSetup';
import { signOut } from 'firebase/auth';
import LocationManager from './LocationManager';

export default function Profile({ navigation }) {
  const [user, setUser] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) setUser(currentUser);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Success', 'You have been logged out!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const handleLocationFound = (location) => {
    setUserLocation(location);
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.header}>Welcome, {user.email}</Text>
          <Text>User ID: {user.uid}</Text>

          <LocationManager onLocationFound={handleLocationFound} />

          {userLocation && (
            <View style={styles.locationInfo}>
              <Text>Your Latitude: {userLocation.coords.latitude}</Text>
              <Text>Your Longitude: {userLocation.coords.longitude}</Text>
            </View>
          )}

          <Button title="Log Out" onPress={handleLogout} color="#FF6347" />
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
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  locationInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
});
