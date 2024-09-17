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
        console.log(`User typed: ${text}`);
        if (onConfirm) {
            onConfirm(text); // Call the callback function
        }
        setText(''); // Reset the input
    };

    return (
        <Modal
            visible={isVisible}
            animationType="slide" // Makes the modal slide from the bottom position
        >
            <View style={styles.container}>
                <TextInput
                    ref={inputRef}
                    placeholder="Start typing here"
                    autoCorrect={true}
                    keyboardType="default"
                    value={text}
                    style={{
                        borderBottomColor: 'purple',
                        borderBottomWidth: 2,
                        width: 200,
                        textAlign: 'center',
                        marginBottom: 10,
                    }}
                    onChangeText={(text) => setText(text)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {isFocused && text.length > 0 ? (
                    <Text>Character count: {text.length}</Text>
                ) : null}
                {!isFocused && message ? (
                    <Text>{message}</Text>
                ) : null}
                
                {/* Add Confirm button */}
                <Button title="Confirm" onPress={handleConfirm} />
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
});
