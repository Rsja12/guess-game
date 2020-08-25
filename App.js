import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
    const [userNum, setUserNum] = useState()
    const [rounds, setRounds] = useState(0)

    const handleNewGame = () => {
        setRounds(0)
        setUserNum(null)
    }

    const handleStartGame = (selectedNum) => {
        setUserNum(selectedNum)
        setRounds(0)
    }

    const handleGameOver = (numOfRounds) => {
        setRounds(numOfRounds)
    }

    let content = <StartGameScreen onStartGame={handleStartGame} />
    if (userNum && rounds <= 0) {
        content = <GameScreen userNum={userNum} onGameOver={handleGameOver} />
    } else if (rounds > 0) {
        content = <GameOverScreen rounds={rounds} onRestart={handleNewGame} />
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
