import React, { useState, useEffect, useRef } from 'react';
import { TextInput, Text, View, Button, Modal, StyleSheet, Alert, Image } from 'react-native';

export default function Input({ autoFocus, onConfirm, onCancel, isVisible }) {
    const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [message, setMessage] = useState('');
    const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);
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

    // Handle Confirm button press
    const handleConfirm = () => {
        onConfirm(text); // Pass text to the parent via callback
        setText(''); // Clear the input
    };

    // Handle Cancel button press with Alert message
    const handleCancel = () => {
        Alert.alert(
            "Cancel Confirmation",
            "Are you sure you want to cancel?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "OK", 
                    onPress: () => {
                        onCancel(); // Call the cancel callback
                        setText(''); // Clear the input
                    }
                }
            ]
        );
    };

    // Disable confirm button until minimum characters are typed
    useEffect(() => {
        setIsConfirmDisabled(text.length < 3);
    }, [text]);

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.modalBackground}>
                <View style={styles.innerContainer}>
                    {/* Two images */}
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }} // url image
                        style={styles.image}
                        alt="Target Icon from URL"
                    />
                    <Image
                        source={require('../assets/target.png')} // Local image
                        style={styles.image}
                        alt="Local Target Icon"
                    />

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

                    {/* Button Row for Confirm and Cancel */}
                    <View style={styles.buttonRow}>
                        <Button title="Cancel" color="gray" onPress={handleCancel} />
                        <View style={styles.buttonSpacing} />
                        <Button title="Confirm" onPress={handleConfirm} disabled={isConfirmDisabled} />
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
        borderRadius: 10,
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
        marginBottom: 20,
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonSpacing: {
        width: 20, 
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
});
