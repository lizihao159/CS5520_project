import React, { useState } from 'react';
import { View, Button, Alert, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager() {
  const [imageUri, setImageUri] = useState(null);
  const [permissionResponse, requestPermission] = ImagePicker.useCameraPermissions();

  // Function to verify camera permissions
  const verifyPermission = async () => {
    if (permissionResponse?.granted) {
      return true; // Permission already granted
    }

    // Request permission if not already granted
    const response = await requestPermission();
    return response.granted;
  };

  // Handler to take an image
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Camera access is required to take pictures.');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri); // Store the uri of the taken image
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      Alert.alert('Error', 'Unable to access the camera. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take Image" onPress={takeImageHandler} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});
