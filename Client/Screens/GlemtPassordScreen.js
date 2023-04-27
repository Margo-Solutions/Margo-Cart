import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useState } from 'react';


export default function GlemtPassordScreen({ navigation }) {
    const [email, setemail] = useState('');

    const SendMail = async (email) => {
        try {
            const response = await fetch(`http://10.0.2.2:5000/margodatabase/glemtPassord/${email}`);
            const passord = await response.json();
        }
        catch (err) {
            console.error(err.message);
        }
    }


    const pressHandler = async (email) => {
        try {
          const response = await fetch(`http://10.0.2.2:5000/margodatabase/sjekkEmail/${email}`);
          const { exists } = await response.json();
          if (exists) {
            navigation.navigate("LagNyttPassord");
          } else {
            Alert.alert("Ingen bruker er koblet til denne epostadressen");
          }
        } catch (error) {
          console.log(error);
        }
      };

    function mybutton() {
        Alert.alert('you clicked', 'Send E-post', [{ text: 'OK' }]);
    }



    return (
        <View style={styles.Container}>
            <View style={styles.textContainer}>
                <Text style={styles.topText}>
                    Glemt passord
                </Text>
                <Text style={styles.underText}>
                    Skriv inn e-postadressen din. Vi sender deg en e-post for å nullstille passordet
                </Text>
            </View>
            <View style={styles.mittContainer}>
                <View style={styles.logiInfoncontainer}>
                    <View style={styles.iconContainer}>
                        <Image
                            style={styles.mailIconImage}
                            source={require('../assets/images/mailIcon.png')}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder=" skriv inn E-mail"
                            value={email}
                            onChangeText={newText => setemail(newText)}
                        />
                    </View>
                </View>
                <View >
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => pressHandler(email)}>
                        <Text style={styles.TextStyle}>
                            Send
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
    textContainer: {
        marginTop: '70%',
        paddingHorizontal: 24,
    },
    topText: {
        fontSize: 35,
        color: 'white',
    },
    underText: {
        margin: 16,
        fontSize: 20,
        color: 'black',
    },
    logiInfoncontainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 130,
        bottom: '15%',
    },
    iconContainer: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    mailIconImage: {
        marginLeft: 10,
        width: 55,
        height: 55,
        margin: 20,
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
        right: '40%'
    },
    mittContainer: {
        justifyContent: 'center',
        padding: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        left: '20%',
        padding: 10,
        marginBottom: '100%',
        bottom: '60%',
        margin: 10,
        width: 200,
        borderRadius: 5,
        borderColor: '#8FD6F2',
        backgroundColor: '#8FD6F2',
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5
    },
    TextStyle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
    }
});