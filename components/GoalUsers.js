import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button, Alert } from 'react-native';
import { addUsersToSubcollection, isUsersSubcollectionEmpty } from '../Firebase/firestoreHelper';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../Firebase/firebaseSetup'; 

const GoalUsers = ({ goalId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasCheckedSubcollection, setHasCheckedSubcollection] = useState(false); // New state to track subcollection check

  useEffect(() => {
    const fetchAndStoreUsers = async () => {
      try {
        const isEmpty = await isUsersSubcollectionEmpty(goalId);

        if (isEmpty) {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          const data = await response.json();
          await addUsersToSubcollection(goalId, data);
          setUsers(data);
        } else {
          console.log('Users already exist in the subcollection.');
          const usersCollectionRef = collection(database, 'goals', goalId, 'users');
          const querySnapshot = await getDocs(usersCollectionRef);
          const existingUsers = querySnapshot.docs.map((doc) => doc.data());
          setUsers(existingUsers);
        }
      } catch (error) {
        console.error('Error fetching or storing users:', error);
      } finally {
        setLoading(false);
        setHasCheckedSubcollection(true); // Mark the subcollection check as completed
      }
    };

    if (!hasCheckedSubcollection) {
      fetchAndStoreUsers(); // Ensure this only runs once
    }
  }, [goalId, hasCheckedSubcollection]); // Add dependency to control the fetch logic

  const handlePostUser = async (user) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert('Success', `User ${result.name} added successfully!`);
      } else {
        Alert.alert('Error', 'Failed to add user.');
      }
    } catch (error) {
      console.error('Error posting user:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users Associated with Goal</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userName}>{item.name}</Text>
            <Button title="Post User" onPress={() => handlePostUser(item)} color="#007BFF" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  userItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default GoalUsers;
