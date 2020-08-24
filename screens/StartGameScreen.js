import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import colors from '../constants/colors';

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(null);

    const handleInput = (input) => {
        // make numbers are only input
        setEnteredValue(input.replace(/[^0-9]/g, ''));
    };

    const handleReset = () => {
        setEnteredValue('');
        setIsConfirmed(false);
    };

    const handleSubmit = () => {
        const num = parseInt(enteredValue);
        if (isNaN(num) || num <= 0) {
            Alert.alert('Invalid input', 'number must be between 1 and 99', [
                { text: 'Ok', style: 'destructive', onPress: handleReset },
            ]);
            return;
        }

        setIsConfirmed(true);
        setSelectedNumber(parseInt(enteredValue));
        setEnteredValue('');
    };

    let confirmedOutput;
    if (isConfirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>Chosen number:</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
            </Card>
        );
    }

    return ( 
        // dismiss keyboard when pressing away from it
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                        <Button
                            title='Reset'
                            onPress={handleReset}
                            color={colors.secondary}
                        />
                        <Button
                            title='Confirm'
                            onPress={handleSubmit}
                            color={colors.primary}
                        />
                    </View>
                </Card>
                {confirmedOutput}
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
    summaryContainer: {
        marginTop: 20,
    },
});
