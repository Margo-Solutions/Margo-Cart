
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Button, View, TextInput, Image, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LatLng } from 'react-native-maps';
import FinnButikkKart from '../Screens/FinnButikkKart';

export default function FinnKjede() {

    const [kjede_navn, setKjedeNavn] = useState(''); // searching for items
    const [kjede, setKjede] = useState([]); // listing items use state
    const [dest, setDest] = useState();

    const ListKjeder = async () => { // listing items
        try {
            const response = await fetch("http://10.0.2.2:5000/margodatabase/kjeder");
            const kjede = await response.json();
            setKjede(kjede);
        } catch (err) {
            console.error(err.message);

        }
    };
    const SearchKjeder = async (kjede_navn) => { // searching for items
        if (kjede_navn == '') {
            ListKjeder();
        }
        else {
            try {
                const response = await fetch(`http://10.0.2.2:5000/margodatabase/kjeder/Search/${kjede_navn}`, {
                    method: "GET",
                });
                const kjede = await response.json();
                setKjede(kjede);

            } catch (err) {
                console.error(err.message);

            }
        }
    };

    const gåTilKart = async (adresse) => { // searching for items
        try {
            const body = {adresse}
            const response = await fetch(`http://10.0.2.2:5000//margodatabase/butikker/adresse`,{
                method: "GET",
            });
            const dest = await response.json();
            setDest(dest)
            console.log('text')
        } catch (err) {
            console.error(err.message);

        }
        
    };

    useEffect(() => { // use effect to refresh the data
        ListKjeder();
    }, []);


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
                    value={kjede_navn}
                    onChangeText={newText => setKjedeNavn(newText)}
                />
                <TouchableOpacity style={styles.søkButton} onPress={() => SearchKjeder(kjede_navn)}>
                    <Text > Søk
                        <Icon name="search" size={20} />
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={kjede}
                    renderItem={(itemData) => {
                        return (
                            <TouchableOpacity onPress={() => gåTilKart(itemData.item.adresse)}>
                                <View style={styles.listItem}>
                                    <Text style={styles.listText}>{itemData.item.kjede_navn}, {itemData.item.adresse}</Text>
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

