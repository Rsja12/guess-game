import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import Card from '../components/Card';
import colors from '../constants/colors';

const StartGameScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Start A New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text>Enter a number</Text>
                <TextInput />
                <View style={styles.buttonContainer}>
                    <Button title='Reset' color={colors.secondary} />
                    <Button title='Confirm' color={colors.primary} />
                </View>
            </Card>
        </View>
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
});
