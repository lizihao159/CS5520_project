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
    setInputText(text); 
    setModalVisible(false); // Hide the modal after user make a confirm action
  };

  // Callback for canceling the input
  const handleCancel = () => {
    setModalVisible(false); // Hide the modal after user make a cancel action
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
        <View style={styles.textWrapper}>
          <Text style={styles.goalText}>{inputText ? inputText : ''}</Text>
        </View>
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
    borderRadius: 10, // Rounded corners 
  },
  goalText: {
    fontSize: 20,
    color: 'blue', // Text color set to blue
  },
});
