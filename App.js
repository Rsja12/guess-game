import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
    const [userNum, setUserNum] = useState()

    const handleStartGame = (selectedNum) => {
        setUserNum(selectedNum)
    }

    let content = <StartGameScreen onStartGame={handleStartGame} />
    if (userNum) {
        content = <GameScreen userNum={userNum} />
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
