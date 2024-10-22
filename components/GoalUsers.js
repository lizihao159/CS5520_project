import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const GoalUsers = () => {
  // Initialize users state with an empty array
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data from API inside useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json(); // Parse the JSON response
        setUsers(data); // Update users state with fetched data
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // Stop the loading indicator
      }
    };

    fetchUsers(); // Call the async function to fetch data
  }, []); // Run once on component mount

  // Show a loading indicator while data is being fetched
  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />;
  }

  // Render the users list using FlatList
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users Associated with Goals</Text>
      <FlatList
        data={users} // Set the data source for the FlatList
        keyExtractor={(item) => item.id.toString()} // Extract unique key for each item
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

// Component styles
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
});

export default GoalUsers;
