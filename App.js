import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, Button, FlatList } from 'react-native';
import Header from './components/Header';
import { useState } from 'react';
import Input from './components/Input';
import GoalItem from './components/GoalItem'; 

export default function App() {
  const appName = 'Welcome to My awesome app!';
  const [goals, setGoals] = useState([]); // State to store list of goals
  const [modalVisible, setModalVisible] = useState(false);

  // Callback function to add a new goal
  const handleInputData = (text) => {
    const newGoal = { text: text, id: Math.random().toString() }; // Create new goal object with random id
    setGoals((currentGoals) => {return[...currentGoals, newGoal]}); // Add new goal to the list using spread operator
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

      {/* Use FlatList to display goals */}
      <FlatList
        style={styles.flatList}
        data={goals} // Data source for FlatList
        renderItem={({ item }) => <GoalItem goal={item} />} // Use GoalItem component to render each goal
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
    borderRadius: 6,
  },
  topSection: {
    height: 120, // Fixed height for the top section
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 60,
    marginBottom: 30,
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
});
