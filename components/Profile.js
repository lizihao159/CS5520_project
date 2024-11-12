import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { auth } from '../Firebase/firebaseSetup';
import { signOut } from 'firebase/auth';
import LocationManager from './LocationManager';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Profile() {
  const navigation = useNavigation();
  const route = useRoute();

  const [user, setUser] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) setUser(currentUser);
  }, []);

  // Update selected location when coming back from Map screen
  useEffect(() => {
    if (route.params?.selectedLocation) {
      setSelectedLocation(route.params.selectedLocation);
    }
  }, [route.params?.selectedLocation]);

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

  const openMapHandler = () => {
    navigation.navigate('Map', { location: userLocation?.coords });
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

          <Button title="Open Map" onPress={openMapHandler} color="#007BFF" />

          {selectedLocation && (
            <View style={styles.locationInfo}>
              <Text>Selected Latitude: {selectedLocation.latitude}</Text>
              <Text>Selected Longitude: {selectedLocation.longitude}</Text>
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
