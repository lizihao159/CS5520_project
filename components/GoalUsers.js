import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { addUsersToSubcollection, isUsersSubcollectionEmpty } from '../Firebase/firestoreHelper'; // Import helper functions

const GoalUsers = ({ goalId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndStoreUsers = async () => {
      try {
        const isEmpty = await isUsersSubcollectionEmpty(goalId);

        if (isEmpty) {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          const data = await response.json();
          await addUsersToSubcollection(goalId, data); // Store users in Firestore
          setUsers(data); // Update state with fetched users
        } else {
          console.log('Users already exist in the subcollection.');
        }
      } catch (error) {
        console.error('Error fetching or storing users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndStoreUsers();
  }, [goalId]);

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
            <Text style={styles.userEmail}>{item.email}</Text>
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
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
  },
});

export default GoalUsers;
