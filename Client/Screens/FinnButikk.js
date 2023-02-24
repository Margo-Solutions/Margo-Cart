import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Button, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { set } from 'react-native-reanimated';

export default function FinnButikk({ navigation }) {
    const [Søk, setSøk] = useState('');
    const [butikker, setButikker] = useState(["kiwi", "rema", "joker", "coop", "spar"]);
    
    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={styles.image}
                    source={require('../assets/images/logoM.png')}
                />
            </View>
            <View style={styles.line} />
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Søk etter butikk eller område"
                    value={Søk}
                    onChangeText={newText => setSøk(newText)}
                    right={
                        <TextInput
                        />
                    }
                />
                 <FlatList data={butikker} renderItem={(itemData) => {
              return(
                <TouchableOpacity >
                <View style={styles.listItem}>
                    <Text style={styles.listText}>{itemData.index} {itemData.item}</Text>
                  <Text style={styles.lineText}>___________________________________________</Text>
                </View>
                </TouchableOpacity>
              );
            }} />
            </View>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#66A2BA',
    },
    image: {
        width: 130,
        height: 130,
        flexDirection: 'row',
    },
    textInputContainer: {
            alignItems: 'center'
        },
        textInput: {
            backgroundColor: 'white',
            fontSize: 20,
            textAlign: 'center',
            height: 35,
            width: 350,
            margin: '10%',
        },
        buttonContainer: {
            padding: 16,
            marginHorizontal: 8,
            flexDirection: 'column',
            height: 200,
            width: 200,
            left: 90,
            bottom: 30,
        },
        button: {
            marginVertical: 15,
            borderColor: 'black',
            borderRadius: 50,
            borderWidth: 1,
            overflow: 'hidden',
            fontSize: 20,

        },
        line: {
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            bottom: 25,
        },
        secondline: {
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            top: 40,
        },
        textStyle: {
            color: 'black',
            marginTop: 50,
        },
        map: {
            height: 300,
            width: 300,
            top: 10,
            left: 70,
        },
        test: {
            flex: 2,
        },
        nexttest: {
            flex: 3,
        },
        listItem: { // view style for the text inside flatlist
            margin: 8,
            padding: 6,
            borderRadius: 10,
            backgroundColor: 'transparent',
          },
    });