import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, FlatList } from 'react-native';
import Header from './components/Header';
import { useState } from 'react';
import Input from './components/Input';

export default function App() {
  const appName = 'Welcome to My awesome app!';
  const [goals, setGoals] = useState([]); // State to store list of goals
  const [modalVisible, setModalVisible] = useState(false);

  // Callback function to add a new goal
  const handleInputData = (text) => {
    const newGoal = { text: text, id: Math.random().toString() }; // Create new goal object with random id
    setGoals((currentGoals) => [...currentGoals, newGoal]); // Add new goal to the list using spread operator
    setModalVisible(false); // Hide modal
  };

  // Callback for canceling the input
  const handleCancel = () => {
    setModalVisible(false); // Hide the modal after user cancels
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {/* Top section */}
      <View style={styles.topSection}>
        <Header name={appName}></Header>
        <Button title="Add a goal" onPress={() => setModalVisible(true)} />
      </View>

      {/* Replacing ScrollView with FlatList */}
      <FlatList
        style={styles.flatList}
        data={goals} // Data source for FlatList
        renderItem={({ item }) => (
          <View style={styles.textWrapper}>
            <Text style={styles.goalText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id} // Unique key for each item
        showsVerticalScrollIndicator={true} // Optional: Show vertical scroll indicator
        contentContainerStyle={styles.scrollContentContainer} // Style for the content inside the FlatList
      />

      {/* Pass the modal visibility and the callback function */}
      <Input autoFocus={true} isVisible={modalVisible} onConfirm={handleInputData} onCancel={handleCancel} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    height: 120, // Fixed height for the top section
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  flatList: {
    flex: 1, // FlatList will take the remaining space
  },
  scrollContentContainer: {
    flexGrow: 1, // Allow content to grow
    backgroundColor: '#d8bfd8',
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center',
    paddingVertical: 20, // Space between the goals and the edges
  },
  textWrapper: {
    backgroundColor: '#d3d3d3', // Light gray background 
    padding: 10,
    borderRadius: 10, // Rounded corners 
    marginVertical: 10, // Spacing between goals
  },
  goalText: {
    fontSize: 150, // Adjusted font size for readability
    color: 'blue', // Text color set to blue
  },
});
