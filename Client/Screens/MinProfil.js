import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';


const slettData = async (adresse) => {
    try {
        const response = await fetch(`http://10.0.2.2:5000/margodatabase/slettData`);
    }
    catch (err) {
        console.error(err.message);

    }
};

export default function MinProfil({ navigation }) {
    return (
        <View style={styles.Container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}
                    onPress={() => alert('slett data')}>
                    <Text
                        style={styles.slettDataText}>
                        Slett all data
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={() => alert('slett profil')}>
                    <Text
                        style={styles.slettDataText}>
                        Slett profil
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: { // container style 
        flex: 1,
        backgroundColor: '#66A2BA',
    },
    buttonContainer: {
        flexDirection: 'row',
        top:'20%'
    },
    button: {
        width: 150,
        borderRadius: 50,
        padding: 25
    },
    slettDataText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
});