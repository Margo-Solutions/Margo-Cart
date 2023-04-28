
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Alert } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/Authcontex';
import { TextInput } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";

export default function RegisterScreen({ navigation }) {

    const [passwordVisible, setPasswordVisible] = useState(true);
    const [navn, setnavn] = useState('');
    const [email, setemail] = useState('');
    const [kjonn, setkjonn] = useState('');
    const [alder, setalder] = useState('');
    const [passord, setpassord] = useState('');
    const [bekreftpassord, setbekreftpassord] = useState('');
    const { setAuth, getuserid, userid } = useContext(AuthContext);
    const
        onsubmitform = async (e) => {
            e.preventDefault();
            try {
                if (passord != bekreftpassord) {
                    Alert.alert("passorene er ikke like!.")
                    throw null;
                }
                if (navn == 0 | email == 0 | passord == 0 | kjonn == 0 | alder == 0) { 
                    Alert.alert("Alle felt må fylles inn.");
                    return; 
                  };

                const body = { navn, email, passord, kjonn, alder};
                const response = await fetch("http://10.0.2.2:5000/margodatabase/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                const parseRes = await response.json();
                
                if (parseRes.token) {
                    getuserid(email);
                    AsyncStorage.setItem("token", parseRes.token);
                    setAuth(true);
                    AsyncStorage.setItem("userid", JSON.stringify(userid));
                }
                else {
                    console.log("no token");
                }

                // console.log(response);  
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
                            placeholder="Fullt navn"
                            value={navn}
                            onChangeText={newText => setnavn(newText)}
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
                            value={email}
                            onChangeText={newText => setemail(newText)}
                        />
                    </View>
                    <View style={styles.alderKjønncontainer}>
                        <TextInput
                            style={styles.textInputAlder}
                            placeholder="Alder"
                            value={alder}
                            onChangeText={newText => setalder(newText)}
                        />
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={kjonn}
                                onValueChange={(value, index) => setkjonn(value)}
                                mode="dropdown" // Android only
                                style={styles.picker}
                            >
                                <Picker.Item label="Velg kjønn" value="Unknown" />
                                <Picker.Item label="Mann" value="Mann" />
                                <Picker.Item label="Kvinne" value="Kvinne" />
                                <Picker.Item label="Annet" value="Annet" />
                            </Picker>
                        </View>
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
                    <View style={styles.outIconContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder=" Bekreft Passord"
                            value={bekreftpassord}
                            onChangeText={newText => setbekreftpassord(newText)}
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
                            onPress={onsubmitform}>
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
    textInputAlder: {
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#8FD6F2',
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        height: 30,
        width: 105,
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
    alderKjønncontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: -72,
        marginHorizontal: -178,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#000000', // Setter bordercolor til rød
        borderRadius: 5,
        overflow: 'hidden',
        height: 40,
        width: 145,
        marginVertical: 10,
        marginHorizontal: -75,
        justifyContent: 'center',
        alignItems: 'center',
        right: 60
    },
    picker: {
        color: '#434343',
        backgroundColor: '#8FD6F2',
        height: 20,
        width: 150,
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