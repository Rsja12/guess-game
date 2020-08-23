import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import colors from '../constants/colors';

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState('');

    const handleInput = (input) => {
        // make numbers are only input
        setEnteredValue(input.replace(/[^0-9]/g, ''));
    };

    return (
        // dismiss keyboard when pressing away from it (iOS)
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start A New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Enter a number</Text>
                    <Input
                        style={styles.inputField}
                        keyboardAppearance='dark'
                        keyboardType='number-pad'
                        maxLength={2}
                        onChangeText={handleInput}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title='Reset' color={colors.secondary} />
                        <Button title='Confirm' color={colors.primary} />
                    </View>
                </Card>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default StartGameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    inputField: {
        width: 50,
        textAlign: 'center',
    },
});
