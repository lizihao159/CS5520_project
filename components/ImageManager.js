import React, { useState } from 'react';
import { View, Button, Alert, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager() {
  const [imageUri, setImageUri] = useState(null);

  const takeImageHandler = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true, // Allow user to edit the image
        aspect: [4, 3], // Set aspect ratio for editing
        quality: 1, // High quality
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri); // Set the image URI to display
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      Alert.alert('Error', 'Unable to access the camera. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take Image" onPress={takeImageHandler} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});
