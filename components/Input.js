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
        setMessage(''); 
    };

    // Event handler for Confirm button
    const handleConfirm = () => {
        console.log(`User typed: ${text}`); // Logs text input
        if (onConfirm) {
            onConfirm(text);
        }
        setText(''); // Reset the input after confirm
    };

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true} // Make the modal background transparent
        >
            <View style={styles.modalBackground}>
                <View style={styles.innerContainer}>
                    <TextInput
                        ref={inputRef}
                        placeholder="Type something"
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
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    innerContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10, // Rounded corners
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderBottomColor: 'purple',
        borderBottomWidth: 2,
        width: '80%',
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
        width: '30%', // Make button take 30% of the rest width
        marginTop: 20, 
    }
});
