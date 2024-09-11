import React, { useState, useEffect, useRef } from 'react';
import { TextInput, Text, View } from 'react-native';

export default function Input({ autoFocus }) {
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

    return (
        <View style={{ alignItems: 'center' }}>
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
        </View>
    );
}
