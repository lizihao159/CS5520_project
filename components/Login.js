import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { auth } from '../Firebase/firebaseSetup'; // Firebase Auth instance
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import login function

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Helper function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  // Helper function to validate password strength
  const validatePassword = (password) => {
    // Password must be at least 6 characters and contain letters or numbers
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async () => {
    // Basic input validation
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 6 characters long and contain letters and numbers.'
      );
      return;
    }

    // Attempt to log in with Firebase authentication
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Logged in user:', user);
      Alert.alert('Success', 'Logged in successfully!');
      navigation.navigate('Home'); // Navigate to Home screen on success
    } catch (error) {
      console.error('Error logging in:', error);

      // Handle known Firebase authentication errors
      switch (error.code) {
        case 'auth/user-not-found':
          Alert.alert('Error', 'No user found with this email.');
          break;
        case 'auth/wrong-password':
          Alert.alert('Error', 'Incorrect password. Please try again.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Error', 'Invalid email format.');
          break;
        case 'auth/too-many-requests':
          Alert.alert('Error', 'Too many failed attempts. Please try again later.');
          break;
        case 'auth/invalid-credential':
          Alert.alert('Error', 'Invalid credentials. Please check your input.');
          break;
        default:
          console.error('Unhandled Firebase error:', error);
          Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
          break;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Log In" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>New User? Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  linkText: {
    color: 'blue',
    marginTop: 12,
    textAlign: 'center',
  },
});
