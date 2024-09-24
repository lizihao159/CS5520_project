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

      {/* Bottom section */}
      <View style={styles.bottomSection}>
        <FlatList
          data={goals}
          renderItem={(itemData) => (
            <View style={styles.textWrapper}>
              <Text style={styles.goalText}>{itemData.item.text}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

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
  bottomSection: {
    flex: 4, // 4/5 space of the screen
    backgroundColor: '#d8bfd8', // Light purple background
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center',
    paddingTop: 20, 
  },
  textWrapper: {
    backgroundColor: '#d3d3d3', // Light gray background 
    padding: 10,
    borderRadius: 6, // Rounded corners 
    marginVertical: 10, // Spacing between goals
  },
  goalText: {
    fontSize: 20,
    color: 'blue', // Text color set to blue
    borderRadius: 6, // Rounded corners
  },
});
