import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import fonts from '../constants/fonts';
import MainButton from '../components/MainButton';

const renderListItem = (value) => {
    return (
        <View key={value} style={styles.listItem}>
            <Text>{value}</Text>
        </View>
    );
};

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
    const initialGuess = generateRandomNum(1, 100, props.userNum);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guesses, setGuesses] = useState([initialGuess]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userNum, onGameOver } = props;
    useEffect(() => {
        if (currentGuess === userNum) {
            onGameOver(guesses.length);
        }
    }, [currentGuess, userNum, guesses.length]);

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
            currentLow.current = currentGuess + 1;
        }

        const nextNum = generateRandomNum(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );

        setCurrentGuess(nextNum);
        setGuesses((prevState) => [nextNum, ...prevState]);
    };

    return (
        <View style={styles.screen}>
            <Text style={fonts.titleText}>AI guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => handleNextGuess('lower')}>
                    <Ionicons name='ios-remove' size={24} color='white' />
                </MainButton>
                <MainButton onPress={() => handleNextGuess('higher')}>
                    <Ionicons name='ios-add' size={24} color='white' />
                </MainButton>
            </Card>
            <View style={styles.listItemContainer}>
                <ScrollView>
                    {guesses.map((guess) => renderListItem(guess))}
                </ScrollView>
            </View>
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
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 300,
        maxWidth: '80%',
    },
    listItem: {
        borderColor: 'black',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 3,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    listItemContainer: {
        flex: 1,
        width: '60%',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10
    },
});
