import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, Image } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { mapsApiKey } from '@env';

export default function LocationManager({ onLocationFound }) {
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();

  // Verify and request location permissions
  const verifyPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'You need to grant location permissions to use this feature.'
      );
      return false;
    }
    return true;
  };

  // Get the current location of the user
  const locateUserHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    try {
      const locationResult = await Location.getCurrentPositionAsync();
      const userLocation = {
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
      };

      setLocation(userLocation);
      onLocationFound(locationResult); // Pass the location back to Profile.js
    } catch (error) {
      Alert.alert('Error', 'Could not fetch location. Please try again.');
    }
  };

  // Generate Google Maps Static Map URL
  const getMapUrl = () => {
    if (!location) return null;
    return `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`;
  };

  return (
    <View style={styles.container}>
      <Button title="Find My Location" onPress={locateUserHandler} color="#1E90FF" />

      {location && (
        <>
          <Image source={{ uri: getMapUrl() }} style={styles.mapImage} resizeMode="cover" />
          <Button
            title="Open Interactive Map"
            onPress={() => navigation.navigate('Map', { location })}
            color="#32CD32"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  mapImage: {
    width: 400,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
