import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

export default function App() {
    const [userNum, setUserNum] = useState();
    const [rounds, setRounds] = useState(0);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    if (!isDataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setIsDataLoaded(true)}
                onError={(error) => console.log(error)}
            />
        );
    }

    const handleNewGame = () => {
        setRounds(0);
        setUserNum(null);
    };

    const handleStartGame = (selectedNum) => {
        setUserNum(selectedNum);
        setRounds(0);
    };

    const handleGameOver = (numOfRounds) => {
        setRounds(numOfRounds);
    };

    let content = <StartGameScreen onStartGame={handleStartGame} />;
    if (userNum && rounds <= 0) {
        content = <GameScreen userNum={userNum} onGameOver={handleGameOver} />;
    } else if (rounds > 0) {
        content = <GameOverScreen rounds={rounds} onRestart={handleNewGame} />;
    }

    return (
        <View style={styles.screen}>
            <StatusBar style='auto' />

            <Header title='Guess' />
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});
