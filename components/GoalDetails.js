import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function GoalDetails({ route }) {
  const { goal } = route.params;
  const [imageUrl, setImageUrl] = useState(goal.imageUri);

  useEffect(() => {
    if (goal.imageUri) {
      setImageUrl(goal.imageUri); // Use the direct download URL
    }
  }, [goal.imageUri]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Details of {goal.text}</Text>
      <Text style={styles.text}>ID: {goal.id}</Text>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
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
  },
});
