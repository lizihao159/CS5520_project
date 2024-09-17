import React, { useState, useEffect, useRef } from 'react';
import { TextInput, Text, View, Button, Modal, StyleSheet } from 'react-native';

export default function Input({ autoFocus, onConfirm, isVisible }) {
    const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);

    // This effect handles autoFocus if the prop is passed
    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    const handleBlur = () => {
        setIsFocused(false);
        if (text.length >= 3) {
            setMessage('Thank you');
        } else {
            setMessage('Please type more than 3 characters');
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
        setMessage(''); // Clear message on focus
    };

    // Event handler for Confirm button
    const handleConfirm = () => {
        console.log(`User typed: ${text}`); // Logs text input
        if (onConfirm) {
            onConfirm(text); // Call the callback function and pass the text as a parameter
        }
        setText(''); // Reset the input after confirm
    };

    return (
        <Modal
            visible={isVisible}
            animationType="slide" // Makes the modal slide from the bottom
        >
            <View style={styles.container}>
                <TextInput
                    ref={inputRef}
                    placeholder="Start typing here"
                    autoCorrect={true}
                    keyboardType="default"
                    value={text}
                    style={styles.input}
                    onChangeText={(text) => setText(text)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {isFocused && text.length > 0 ? (
                    <Text style={styles.charCount}>Character count: {text.length}</Text>
                ) : null}
                {!isFocused && message ? (
                    <Text style={styles.message}>{message}</Text>
                ) : null}
                
                {/* Add Confirm button */}
                <View style={styles.buttonContainer}>
                    <Button title="Confirm" onPress={handleConfirm} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderBottomColor: 'purple',
        borderBottomWidth: 2,
        width: '80%', // Adjust width
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 20, // Space below the input field
    },
    charCount: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        color: 'red',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '30%', // Make button take 30% of the available width
        marginTop: 20,
    }
});
