import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    const [currentGuess, setCurrentGuess] = useState(generateRandomNum(1, 100, props.userNum))
    return (
        <View>
            <Text></Text>
        </View>
    );
};

export default GameScreen;

const styles = StyleSheet.create({});
