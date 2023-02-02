import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { StackActions } from '@react-navigation/native';

export default function RegisterScreen({ navigation }) {

    const [passwordVisible, setPasswordVisible] = useState(true);


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
                            style={styles.mailIconImage}
                            source={require('../assets/images/mailIcon.png')}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="E-mail"
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
                            secureTextEntry={passwordVisible}
                            right={
                                <TextInput.Icon
                                    icon={passwordVisible ? 'eye' : 'eye-off'}
                                    onPress={() => setPasswordVisible(!passwordVisible)}
                                />
                            }
                        />
                    </View>
                    <View style={styles.outIconContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Passord"
                            secureTextEntry={passwordVisible}
                            right={
                                <TextInput.Icon
                                    icon={passwordVisible ? 'eye' : 'eye-off'}
                                    onPress={() => setPasswordVisible(!passwordVisible)}
                                />
                            }
                        />
                    </View>
                </View>
                <View style={styles.textBox}>
                    <Text>
                        Ved registrering bekrefter du at du har lest og godtatt vår betingelser og vilkår
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate("Tilbake")}>
                            <Text
                                style={styles.loginInfoText}>
                                Registrer
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    Container: {
        felx: 1,
        justifyContent: 'center',
        backgroundColor: '#66A2BA',
    },
    toppContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    image: {
        padding: 2,
        width: 300,
        height: 300,
        margin: 0,
    },
    mittContainer: {
        bottom: 200,
        alignItems: 'stretch',
    },
    textBox: {
        bottom: '15%',
        left: '18%',
        width: 250,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#8FD6F2',
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        height: 30,
        width: 260,
        padding: 5,
        margin: '15%',
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
        bottom: '8%',
        alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    outIconContainer: {
        left: '42%'
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
    mailIconImage: {
        marginLeft: 10,
        width: 55,
        height: 55,
        margin: 20,
    },
    button: {
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
});