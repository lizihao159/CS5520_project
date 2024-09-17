import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import { useState } from 'react';
import Input from './components/Input';

export default function App() {
  const appName = 'Welcome to My Awesome app!';
  const [inputText, setInputText] = useState('');

  
  const handleInputData = (text) => {
    setInputText(text); 
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}></Header>
  
        {/* Input component with autoFocus and onConfirm props */}
      <Input autoFocus={true} onConfirm={handleInputData} />


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
