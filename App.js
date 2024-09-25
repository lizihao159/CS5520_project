import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, Button, FlatList, Text } from 'react-native';
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
    const newGoal = { text: text, id: Math.random() }; // Create new goal object with random id
    setGoals((currentGoals) => {return [...currentGoals, newGoal]}); // Add new goal to the list using spread operator
    setModalVisible(false); // Hide modal
  };

  // Callback function to delete a goal
  const handleDeleteGoal = (goalId) => {
    setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== goalId)); // Filter out the goal with the given id
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
        renderItem={({ item }) => (
          <GoalItem goal={item} onDelete={handleDeleteGoal} /> // Pass the onDelete callback
        )}
        keyExtractor={(item) => item.id.toString()} // Unique key for each item
        showsVerticalScrollIndicator={true} // Show vertical scroll indicator
        contentContainerStyle={styles.scrollContentContainer} // Style for the content inside the FlatList
        ListEmptyComponent={() => (
          <View style={styles.noGoalsContainer}>
            <Text style={styles.noGoalsText}>No goals to show</Text>
          </View>
        )} // Component to render when list is empty
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
  noGoalsContainer: {
    alignItems: 'center',
    padding: 20,
  },
  noGoalsText: {
    fontSize: 20,
    color: '#800080', // Dark purple text
    textAlign: 'center',
  },
});
