import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

export default function Map({ route }) {
  const navigation = useNavigation();
  const initialLocation = route.params?.location || { latitude: 37.785834, longitude: -122.406417 };

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleConfirmLocation = () => {
    if (!selectedLocation) {
      Alert.alert('No location selected', 'Please tap on the map to select a location.');
      return;
    }
    // Pass the selected location back to Profile screen
    navigation.navigate('Profile', { selectedLocation });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="Selected Location" />
        )}
      </MapView>

      <View style={styles.buttonContainer}>
        <Button
          title="Confirm Selected Location"
          onPress={handleConfirmLocation}
          disabled={!selectedLocation}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '80%',
    alignSelf: 'center',
  },
});
