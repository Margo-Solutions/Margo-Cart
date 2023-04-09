import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert, Image, Button } from 'react-native';


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
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/logoM.png')}
                />
            </View>
            <View style={styles.line} />
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title='Slett all data' color="#8FD6F2" onPress={() => alert('slett data')} />
                </View>
                <View style={styles.button}>
                    <Button title='Slett profil' color="#8FD6F2" onPress={() => alert('slett profil')} />
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