
import React, { useState } from 'react';
import { TextInput } from 'react-native';

export default function Input() {
    const [text, setText] = useState('');

    return (
        <TextInput
            placeholder="start typing here"
            autoCorrect={true}
            keyboardType="default"
            value={text}
            style={{ borderBottomColor: 'purple', borderBottomWidth: 2, width: 200, textAlign: 'center' }}
            onChangeText={(text) => setText(text)}
        />
    );
}