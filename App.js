import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from './components/Header';
import { useState } from 'react';
import Input from './components/Input';

export default function App() {
  const appName = 'Welcome to My Awesome app!';
  const [inputText, setInputText] = useState(''); // State to store input from child
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

  // Callback function to handle the data received from Input.js
  const handleInputData = (text) => {
    setInputText(text); // Set the input text
    setModalVisible(false); // Hide the modal after the user adds a goal
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}></Header>

      {/* Button to trigger the modal visibility */}
      <Button title="Add a goal" onPress={() => setModalVisible(true)} />

      {/* Pass the modal visibility and the callback function to the Input component */}
      <Input autoFocus={true} isVisible={modalVisible} onConfirm={handleInputData} />

      {/* Display the input text after user typed*/}
      <Text>{inputText ? `You typed: ${inputText}` : ''}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
