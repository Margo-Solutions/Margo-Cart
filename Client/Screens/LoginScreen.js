import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/Authcontex';
import { TextInput } from 'react-native-paper';
import { string } from 'yup';


export default function LoginScreen({ navigation }) {
    const [email, setemail] = useState('');
    const [passord, setpassord] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const { setAuth, getuserid, userid } = useContext(AuthContext);
    const
        onsubmitform = async (e) => {
            e.preventDefault();
            try {
                const body = { email, passord };
                const response = await fetch("http://10.0.2.2:5000/margodatabase/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                const parseRes = await response.json();
                // console.log(parseRes);   
                if (parseRes.token) {
                    getuserid(email);
                    AsyncStorage.setItem("token", parseRes.token);
                    setAuth(true);
                    AsyncStorage.setItem("userid", JSON.stringify(userid));
                }
                else {
                    console.log("no token");
                }
            }
            catch (err) {
                console.error(err.message);
            }
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
                            placeholder="Email"
                            value={email}
                            onChangeText={newText => setemail(newText)}
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
                            value={passord}
                            onChangeText={newText => setpassord(newText)}
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
            </View>
            <View style={styles.buttonContainer}>
                <View>
                    <TouchableOpacity
                        style={styles.buttonGlemtPassord}
                        onPress={() => navigation.navigate("GlemtPassord")}
                    >
                        <Text
                            style={styles.glemtPassordText}>
                            Glemt passord
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.button1}
                        onPress={onsubmitform}>
                        <Text
                            style={styles.loginInfoText}>
                            Logg Inn
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.button1}
                        onPress={() => navigation.navigate("Register")}>
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
        justifyContent: 'center',
        alignItems: 'center',
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