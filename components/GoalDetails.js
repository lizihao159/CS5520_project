import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../Firebase/firebaseSetup';

export default function GoalDetails({ route }) {
  const { goal } = route.params;
  const [imageUrl, setImageUrl] = useState(null);

  // Fetch the download URL from Firebase Storage
  useEffect(() => {
    const fetchImageUrl = async () => {
      if (goal.imageUri) {
        try {
          // Create a reference to the image using the stored path
          const imageRef = ref(storage, goal.imageUri);
          const downloadURL = await getDownloadURL(imageRef);
          setImageUrl(downloadURL);
        } catch (error) {
          console.error('Error fetching image URL:', error);
          Alert.alert('Error', 'Failed to fetch the image. Please try again.');
        }
      }
    };

    fetchImageUrl();
  }, [goal.imageUri]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Details of {goal.text}</Text>
      <Text style={styles.text}>ID: {goal.id}</Text>
      
      {/* Display the image if the download URL is available */}
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text style={styles.loadingText}>Loading image...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  loadingText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
});
