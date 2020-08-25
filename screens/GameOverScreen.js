import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import fonts from '../constants/fonts';

import MainButton from '../components/MainButton';

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text style={fonts.titleText}>She Guessed It!</Text>
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri:
                            'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
                    }}
                    // local image -->
                    // source={require('../assets/success.png')}
                    style={styles.image}
                    resizeMode='cover'
                />
            </View>
            <Text style={fonts.titleText}>
                Number of rounds: {props.rounds}
            </Text>
            <MainButton onPress={() => props.onRestart()}>
                Play Again
            </MainButton>
        </View>
    );
};

export default GameOverScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
