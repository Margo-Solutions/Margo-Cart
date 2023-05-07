
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Button, View, TextInput, Image, FlatList, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FinnButikkKart from '../Screens/FinnButikkKart';
import { Picker } from '@react-native-picker/picker';
import { handContext } from '../context/listeHandler';
import { set } from 'react-native-reanimated';

export default function FinnButikk({ navigation }) {
    const [sted_navn, setStedNavn] = useState(''); 
    const [kjede_navn, setKjedeNavn] = useState(''); // searching for items
    const [kjede, setKjede] = useState([]); // listing items use state
    const [dest_lat, setDest_lat] = useState();
    const [dest_long, setDest_long] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState();
    const [secondModalData, setSecondModalData] = useState();
    const [adresse, setAdresse] = useState();
    const [kj, setKj] = useState();
    const [sortedData, setSortedData] = useState(kjede);
    const [selectedBrand, setSelectedBrand] = useState();
    const [butikk_id, setButikkID] = useState();


    const ListKjeder = async () => { // listing items
        try {
            const response = await fetch("http://10.0.2.2:5000/margodatabase/kjeder");
            const kjede = await response.json();
            setSortedData(kjede);
            setKjede(kjede);
        } catch (err) {
            console.error(err.message);

        }
    };
    const SearchKjeder = async (sted_navn) => { // searching for items
        if (sted_navn == '') {
            ListKjeder();
        }
        else {
            try {
                const response = await fetch(`http://10.0.2.2:5000/margodatabase/kjeder/Search/${sted_navn}`, {
                    method: "GET",
                });
                const sted = await response.json();
                setSortedData(sted);
                setKjede(sted);

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
            setButikkID(destination.butikk_id);
            return { lat, long }; // returnerer en oppdatert verdi for dest_lat og dest_long
        }
        catch (err) {
            console.error(err.message);

        }
    };

    const pressHandler = async (adresse, kjede) => { // press handler to..
        try {
            const { lat, long } = await gåTilKart(adresse); // venter på at gåTilKart skal fullføres og returnere en oppdatert verdi for dest_lat og dest_long
            setModalVisible(!modalVisible)
            setModalData(lat);
            setSecondModalData(long);
            setAdresse(adresse);
            setKj(kjede);
        }
        catch (err) {
            console.log(err);
        }
    };

    const pressHandlerTest = (modalData, secondModalData, adresse) => {
        try {
            setModalVisible(!modalVisible)
            console.log(adresse);
            console.log(secondModalData);
            console.log(modalData);
            console.log(butikk_id)
            navigation.navigate("Veibeskrivelse", { dest_lat: modalData, dest_long: secondModalData, adresse: adresse, butikk_id: butikk_id });
        } catch (err) {
            console.log(err);
        }
    };
    const pressHandlerTest2 = (modalData, secondModalData, adresse) => {
        try {
            setModalVisible(!modalVisible)
            console.log(adresse);
            navigation.navigate("innendørskart", { dest_lat: modalData, dest_long: secondModalData, adresse: adresse, butikk_id: butikk_id });
        } catch (err) {
            console.log(err);
        }
    };

    const sortDataByBrand = (brand) => {
        if (brand === '') {
            setSortedData(kjede);
        } else {
            const sorted = [...kjede].filter(item => item.kjede_navn === brand);
            setSortedData(sorted);
        }
        setSelectedBrand(brand);
    }

    useEffect(() => { // use effect to refresh the data
        ListKjeder();
        sortDataByBrand('');
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
                    onChangeText={newText => setStedNavn(newText)}
                />
                <TouchableOpacity style={styles.søkButton} onPress={() => SearchKjeder(sted_navn)}>
                    <Text > Søk
                        <Icon name="search" size={20} />
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                <Modal visible={modalVisible} animationType="slide" transparent={false}  >
                    <View style={styles.modalView}>
                        <Image
                            style={styles.modalImage}
                            source={require('../assets/images/navigation.png')}
                        />
                        <Text style={styles.modalText}>Du har valgt {kj} {adresse}. {'\n'}</Text>
                        <View style={styles.combinedModalView}>
                            <View style={styles.firstModalButton}>
                                <Button
                                    title="Innendørs Navigering"
                                    color="#03025c" onPress={() => pressHandlerTest2(modalData, secondModalData, adresse)} >

                                </Button>
                            </View>
                            <View style={styles.secondModalButton}>
                                <Button
                                    title="Veibeskrivelse"
                                    color="#03025c" onPress={() => pressHandlerTest(modalData, secondModalData, adresse)} >
                                </Button>
                            </View>
                        </View>
                        <View style={styles.buttonStyle}>
                            <Button
                                title="Tilbake"
                                color="#b30b10" onPress={() => setModalVisible(!modalVisible)}>
                            </Button>
                        </View>

                    </View>
                </Modal>
                <View style={styles.lineSecond} />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedBrand}
                        onValueChange={(itemValue) => sortDataByBrand(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Alle Butikker" value="" />
                        <Picker.Item label="KIWI" value="KIWI" />
                        <Picker.Item label="REMA 1000" value="REMA1000" />
                        <Picker.Item label="MENY" value="MENY" />
                        <Picker.Item label="EXTRA" value="EXTRA" />
                        <Picker.Item label="SPAR" value="SPAR" />

                        {/* Add more brands as needed */}
                    </Picker>
                    <Picker
                        selectedValue={selectedBrand}
                        onValueChange={(itemValue) => sortDataByBrand(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Avstand" />
                        <Picker.Item label="Kongsberg" value="Kongsberg" />
                        {/* legg til steder fra stedsdatabasen*/}
                    </Picker>
                    <Picker
                        selectedValue={selectedBrand}
                        onValueChange={(itemValue) => sortDataByBrand(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Pris" />
                        <Picker.Item label="Kongsberg" value="Kongsberg" />
                        {/* legg til steder fra stedsdatabasen*/}
                    </Picker>
                </View>
                <FlatList
                    data={sortedData}
                    renderItem={(itemData) => {
                        return (
                            <TouchableOpacity onPress={() => pressHandler(itemData.item.adresse, itemData.item.kjede_navn)} >
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
    modalView: {
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#66A2BA',
    },
    buttonStyle: {
        height: 50,
        width: 180,
        padding: 8,
    },
    firstModalButton: {
        height: 50,
        width: 200,
        padding: 8,
    },
    secondModalButton: {
        height: 50,
        width: 200,
        padding: 8,
    },
    combinedModalView: {
        flexDirection: "row",

    },
    modalText: {
        fontSize: 20,
    },
    modalImage: {
        height: 150,
        width: 150,
        marginBottom: 30,
    },
    pickerContainer: {
        flexDirection: 'row',

    },
    picker: {
        backgroundColor: '#66A2BA',
        width: '33.3333333%',
    },
    pickerText: {
        color: 'black',
    },
    lineSecond: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        bottom: 2,
    },
});

