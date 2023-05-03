import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { AuthContext } from '../context/Authcontex';

export default function KodeScreen({ navigation, route }) {
    const { number } = route.params;
    const [kode, setkode] = useState('');


    const onSubmitForm = () => {
        if (kode != number) {
            Alert.alert("Feil kode");
        }
        else {
            navigation.navigate("LagNyttPassord");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.header}>Skriv inn den 4-siffrede koden her</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="___    ___    ___    ___"
                    value={kode}
                    onChangeText={newText => setkode(newText)}
                />
                <TouchableOpacity
                    style={styles.button1}
                    onPress={() => onSubmitForm()}>
                    <Text
                        style={styles.loginInfoText}>
                        Send
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#66A2BA',
        padding: 20,
    },
    contentContainer: {
        top: '5%',
        textAlign: 'center',
        alignSelf: 'center',
    },
    inputContainer: {
        top: '15%',
        textAlign: 'center',
        alignSelf: 'center',
    },
    header: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#8FD6F2',
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 8,
        width: 270,
        padding: 5,
        margin: '10%',
    },
    button1: {
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width: 200,
        borderColor: '#8FD6F2',
        backgroundColor: '#8FD6F2',
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5
    },
    loginInfoText: {
        textAlign: 'center',
        fontSize: 20,
    },

});
