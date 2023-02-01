import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    Button,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';

export default function LoginScreen({ navigation }) {

    function mybutton() {
        Alert.alert('you clicked', 'logg inn', [{ text: 'OK' }]);
    }

    return (
        <View style={styles.Container}>
            <View style={styles.toppContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/logoM.png')}
                />
            </View>
            <View style={styles.mittContainer}>
                <View style={styles.logiInfoncontainer}>
                    <View style={styles.iconContainer}>
                        <Image
                            style={styles.personIconImage}
                            source={require('../assets/images/personIcon.png')}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Brukernavn"
                        />
                    </View>
                    <View style={styles.iconContainer}>
                        <Image
                            style={styles.lockIconImage}
                            source={require('../assets/images/lockIcon.png')}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Passord"
                            secureTextEntry={true}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <View>
                    <TouchableOpacity
                        style={styles.buttonGlemtPassord}
                        onPress={() => navigation.navigate("GlemtPassord")}>
                        <Text
                            style={styles.glemtPassordText}>
                            Glemt passord eller brukernavn
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.button1}
                        onPress={() => navigation.navigate("Hjemmeside")}>
                        <Text
                            style={styles.loginInfoText}>
                            Logg Inn
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.button1}
                        onPress={() => navigation.navigate("Tilbake")}>
                        <Text
                            style={styles.loginInfoText}>
                            Registrer
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        felx: 1,
        justifyContent: 'center',
        backgroundColor: '#66A2BA',
    },
    toppContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    mittContainer: {
        bottom: 200,
        alignItems: 'stretch',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#8FD6F2',
        fontSize: 20,
        textAlign: 'center',
        borderRadius: 8,
        width: 270,
        padding: 5,
        margin: '10%',
        right: '40%'
    },
    brukercontainer: {
        flexDirection: 'row',
    },
    logiInfoncontainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 130
    },
    buttonContainer: {
        flexDirection: 'column',
        marginHorizontal: '30%',
        bottom: '25%',
        alignItems: 'center',
    },
    image: {
        padding: 2,
        width: 300,
        height: 300,
        margin: 0,
    },
    iconContainer: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    personIconImage: {
        marginleft: 10,
        width: 25,
        height: 25,
        margin: 20,
    },
    lockIconImage: {
        marginLeft: 15,
        width: 30,
        height: 30,
        margin: 20,
    },
    buttonGlemtPassord: {
        padding: 25,
        marginBottom: '10%',
        width: 400,
        left: '42%',
    },
    glemtPassordText: {
        color: "#CADCFF",
        fontSize: 16,
    },
    button1: {
        alignItems: 'center',
        left: '1%',
        padding: 10,
        bottom: '60%',
        margin: 10,
        borderRadius: 5,
        width: 150,
        borderColor: '#8FD6F2',
        backgroundColor: '#8FD6F2',
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5
    },
    button2: {
        width: 150,
        borderRadius: 50,
        padding: 25
    },
    loginInfoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
    appContainer: {
        paddingTop: 50,
        paddingHorizontal: 16,
    },
});