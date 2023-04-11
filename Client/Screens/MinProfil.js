import React from 'react';
import { useState, useContext } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/Authcontex';

export default function MinProfil({ navigation }) {

    const { logout } = useContext(AuthContext);

    const handleSlettData = async () => {
        Alert.alert(
            'Slett all data',
            'Er du sikker på at du vil slette all data? Dette kan ikke angres.',
            [
                { text: 'Avbryt', style: 'cancel' },
                { text: 'Slett', style: 'destructive', onPress: slettData },
            ],
        );
    };

    const slettData = async (id) => {
        try {
            id = await AsyncStorage.getItem('userid');
            const response = await fetch(`http://10.0.2.2:5000/margodatabase/slettData/${id}`)
        }
        catch (err) {
            console.error(err.message);

        }
    };

    const handleSlettProfil = async () => {
        Alert.alert(
            'Slett profil',
            'Er du sikker på at du vil slette profilen? Dette kan ikke angres.',
            [
                { text: 'Avbryt', style: 'cancel' },
                { text: 'Slett', style: 'destructive', onPress: slettProfil },
            ],
        );
    };

    const slettProfil = async (id) => {
        try {
            id = await AsyncStorage.getItem('userid');
            const response = await fetch(`http://10.0.2.2:5000/margodatabase/slettProfil/${id}`)
            logout();
        }
        catch (err) {
            console.error(err.message);

        }
    };

    return (
        <View style={styles.Container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/logoM.png')}
                />
            </View>
            <View style={styles.line} />
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title='Slett all data' color="#8FD6F2" onPress={() => handleSlettData()} />
                </View>
                <View style={styles.button}>
                    <Button title='Slett profil' color="#8FD6F2" onPress={() => handleSlettProfil()} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: { // container style 
        flex: 1,
        backgroundColor: '#66A2BA',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: { //image style
        width: 350,
        height: 350,
    },
    line: { // the black line on top 
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        bottom: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        top: '20%',
        justifyContent: 'center'
    },
    button: {  // button styles for all buttons
        overflow: 'hidden',
        borderRadius: 50,
        fontSize: 20,
        padding: 25,
        width: 150,
    },
    slettDataText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
});