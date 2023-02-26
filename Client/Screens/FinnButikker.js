
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Button, View, TextInput, Image, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FinnButikkKart from '../Screens/FinnButikkKart';

export default function FinnKjede() {

    const [kjede_navn, setKjedeNavn] = useState(''); // searching for items
    const [kjede, setKjede] = useState([]); // listing items use state
    const [latitude, setLatitude] = useState();
    const [laongitude, setLongitude] = useState();
    //const [dest, setDest] = useState();
    const [dest_lat, setDest_lat] = useState();
    const [dest_long, setDest_long] = useState();



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

    const gåTilKart = async (adresse) => { // listing items
        try {
            const response = await fetch(`http://10.0.2.2:5000/margodatabase/butikker/${adresse}`);
            const destinationList = await response.json();
            const destination = destinationList[0];
            const lat = destination.latitude;
            const long = destination.longitude;
            setDest_lat(lat);
            setDest_long(long);
            console.log(dest_long);
        }
        catch (err) {
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
                                <View style={styles.listItem} >
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

