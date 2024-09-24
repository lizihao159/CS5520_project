import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Header from './components/Header';
import { useState } from 'react';
import Input from './components/Input';

export default function App() {
  const appName = 'Welcome to My awesome app!';
  const [goals, setGoals] = useState([]); // State to store list of goals
  const [modalVisible, setModalVisible] = useState(false);

  // Callback function to add a new goal
  const handleInputData = (data) => {
    const newGoal = { text: data, id: Math.random() }; // Create new goal object with random id
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

      {/* Bottom section */}
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={true} // Optional: Hides the vertical scroll indicator
      >
        {goals.map((goal) => (
          <View key={goal.id} style={styles.textWrapper}>
            <Text style={styles.goalText}>{goal.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Pass the modal visibility and the callback function*/}
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
    flex: 1, // 1/5 space of the screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1, // This makes the ScrollView grow and fill the available space
    backgroundColor: '#d8bfd8', // Light purple background
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
    fontSize: 20,
    color: 'blue', // Text color set to blue
  },
});
