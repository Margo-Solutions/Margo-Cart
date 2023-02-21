
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Button, View, TextInput, Image, FlatList, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function FinnButikk() {
    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={styles.image}
                    source={require('../assets/images/logoM.png')}
                />
            </View>
            <View style={styles.line} />
            <View style={styles.searchingContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder=" Søk etter butikk her..."
                //value={}
                //onChangeText={}
                />
                <TouchableOpacity style={styles.søkButton}>
                    <Text > Søk 
                    <Icon name="search" size={20} />
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                <FlatList data={'Butikk'} renderItem={(itemData) => {
                    return (
                        <TouchableOpacity>
                            <View style={styles.listItem}>
                                <Text style={styles.listText}>{itemData.item.Butikk_Navn}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                    alwaysBounceVertical={false}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { // top bar container
        flex: 1,
        backgroundColor: '#66A2BA',
    },
    image: { // image styling 
        width: 130,
        height: 130,
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    line: { // top line style
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        bottom: 25,
    },
    listContainer: { //base container
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: "#CADCFF",
        justifyContent: 'center',
    },
    searchingContainer: { // searching input bar container
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: { // text input style for search container
        width: 350,
        height: 35,
        borderColor: '#e4d0ff',
        backgroundColor: '#CADCFF',
        color: '#120438',
        borderWidth: 1,
        borderRadius: 6,
        textAlign: 'center',
        fontSize: 20,
    },
    listText: { //text styles inside flatlist
        color: '#646161',
        fontSize: 20,
        textAlign: 'center',
    },
    listItem: { // view style for the text inside flatlist 
        margin: 8,
        padding: 6,
        borderRadius: 10,
        backgroundColor: 'transparent',
    },
    søkButton: {
        padding: 8,
    },
});

