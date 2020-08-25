import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import GameOverScreen from '../screens/GameOverScreen';
import fonts from '../constants/fonts'

const generateRandomNum = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNum = Math.floor(Math.random() * (max - min)) + min;
    if (randomNum === exclude) {
        return generateRandomNum(min, max, exclude);
    } else {
        return randomNum;
    }
};

const GameScreen = (props) => {
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomNum(1, 100, props.userNum)
    );
    const [numOfRounds, setNumOfRounds] = useState(0);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userNum, onGameOver } = props;
    useEffect(() => {
        if (currentGuess === userNum) {
            onGameOver(numOfRounds);
        }
    }, [currentGuess, userNum, numOfRounds]);

    const handleNextGuess = (direction) => {
        if (
            (direction === 'lower' && currentGuess < props.userNum) ||
            (direction === 'higher' && currentGuess > props.userNum)
        ) {
            Alert.alert("Don't lie!", "You know damn well that's not right", [
                { text: 'Sorry', style: 'cancel' },
            ]);
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }

        const nextNum = generateRandomNum(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );
        setCurrentGuess(nextNum);
        setNumOfRounds((prevState) => prevState + 1);
    };

    return (
        <View style={styles.screen}>
            <Text style={fonts.titleText}>AI guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button
                    title='Lower'
                    onPress={() => handleNextGuess('lower')}
                />
                <Button
                    title='Higher'
                    onPress={() => handleNextGuess('higher')}
                />
            </Card>
        </View>
    );
};

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    },
});
