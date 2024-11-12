import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function LocationManager({ onLocationFound }) {
  const [location, setLocation] = useState(null);

  const locateUserHandler = async () => {
    // Request permission to access location
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location access is required to use this feature.');
      return;
    }

    try {
      // Fetch the user's current location
      const locationResult = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(locationResult);
      
      // Pass location data back to the parent component if provided
      if (onLocationFound) {
        onLocationFound(locationResult);
      }
    } catch (err) {
      console.error('Error fetching location:', err);
      Alert.alert('Error', 'Failed to get location. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Locate Me" onPress={locateUserHandler} />

      {location && (
        <View style={styles.locationInfo}>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  locationInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
});
