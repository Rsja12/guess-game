import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import fonts from '../constants/fonts';
import MainButton from '../components/MainButton';

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>She Guessed It!</Text>
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
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.70,
        height: Dimensions.get('window').width * 0.70,
        borderRadius: Dimensions.get('window').width * 0.70 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        marginVertical: Dimensions.get('window').height / 20
    }
});
