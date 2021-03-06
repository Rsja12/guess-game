import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import MainButton from '../components/MainButton';

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
        Keyboard.dismiss();
    };

    let confirmedOutput;
    if (isConfirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text style={fonts.bodyText}>Chosen number:</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                    Start Game Now!
                </MainButton>
            </Card>
        );
    }

    return (
        // dismiss keyboard when pressing away from it
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <Text style={fonts.titleText}>Start A New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text style={fonts.bodyText}>Enter a number</Text>
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
        width: Dimensions.get('window').width / 8,
        textAlign: 'center',
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});
