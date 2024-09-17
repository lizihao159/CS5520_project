import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import Header from './components/Header';
import { useState } from 'react';
import Input from './components/Input';

export default function App() {
  const appName = 'Welcome to My awesome app!';
  const [inputText, setInputText] = useState(''); 
  const [modalVisible, setModalVisible] = useState(false); 

  // Callback function
  const handleInputData = (text) => {
    setInputText(text); // Set the input text
    setModalVisible(false); // Hide the modal after user type the goal
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {/* Top section with header */}
      <View style={styles.topSection}>
        <Header name={appName}></Header>

        {/* Align button at the bottom of the white area */}
        <View style={styles.buttonContainer}>
          <Button title="Add a goal" onPress={() => setModalVisible(true)} />
        </View>
      </View>

      {/* Bottom section where the goal is displayed */}
      <View style={styles.bottomSection}>
        <View style={styles.textWrapper}>
          <Text style={styles.goalText}>{inputText ? inputText : ''}</Text>
        </View>
      </View>

      {/* Pass the modal and the callback function to the Input */}
      <Input autoFocus={true} isVisible={modalVisible} onConfirm={handleInputData} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    flex: 1, // 1/5 of the screen
    justifyContent: 'space-between', // Space between header and button
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 30, // Padding to give space at the top
  },
  buttonContainer: {
    alignSelf: 'stretch', 
    justifyContent: 'flex-end', // place the button at the bottom
    alignItems: 'center', // place the button in the center
  },
  bottomSection: {
    flex: 4, // 4/5 of the screen
    backgroundColor: '#d8bfd8', // Light purple background
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center', // Align horizontally in the center
    paddingTop: 20, // Add some padding at the top
  },
  textWrapper: {
    backgroundColor: '#d3d3d3', 
    padding: 10,
    borderRadius: 10, // Rounded corners
  },
  goalText: {
    fontSize: 20,
    color: 'blue', // set the text color into blue
  },
});
