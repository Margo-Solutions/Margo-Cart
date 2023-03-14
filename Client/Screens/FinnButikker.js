
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Button, View, TextInput, Image, FlatList, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FinnButikkKart from '../Screens/FinnButikkKart';

export default function FinnButikk({ navigation }) {

    const [kjede_navn, setKjedeNavn] = useState(''); // searching for items
    const [kjede, setKjede] = useState([]); // listing items use state
    const [dest_lat, setDest_lat] = useState();
    const [dest_long, setDest_long] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState();
    const [secondModalData, setSecondModalData] = useState();
    const [adresse, setAdresse] = useState();


    const ListVarer = async () => { // listing items
        try {
          const response = await fetch("http://10.0.2.2:5000/Margodatabase/varer");
          const vare = await response.json();
          setVare(vare);
        } catch (err) {
          console.error(err.message);
          
        }
      };

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
            return {lat, long}; // returnerer en oppdatert verdi for dest_lat og dest_long
        }
        catch (err) {
            console.error(err.message);

        }
    };

    const pressHandler = async (adresse) => { // press handler to..
        try {
            const { lat, long } = await gåTilKart(adresse); // venter på at gåTilKart skal fullføres og returnere en oppdatert verdi for dest_lat og dest_long
            setModalVisible(!modalVisible)
            setModalData(lat);
            setSecondModalData(long);
            setAdresse(adresse);
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
        navigation.navigate("Finn Butikk", { dest_lat: modalData, dest_long: secondModalData, adresse: adresse });
       } catch (err) {
        console.log(err);
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
                <Modal visible={modalVisible} transparent={true} animationType="slide" >
                    <View style={styles.modalView}>
                        <Text>Hello!</Text>
                        <View style={styles.combinedModalView}>
                        <View style={styles.firstModalButton}>
                        <Button
                            title="Innendørs Navigering"
                            color= "#8FD6F2"  >
                               
                            </Button>  
                            </View>
                            <View style={styles.secondModalButton}>
                            <Button
                            title="Utendørs Navigering"
                            color= "#8FD6F2" onPress={() => pressHandlerTest(modalData, secondModalData, adresse)} >
                            </Button>
                          </View>
                          </View>
                        <View style={styles.buttonStyle}>
                            <Button
                            title="Tilbake"
                            color= "#8FD6F2" onPress={() =>setModalVisible(!modalVisible)}>
                            </Button>
                        </View>

                    </View>
                </Modal>
                <FlatList
                    data={kjede}
                    renderItem={(itemData) => {
                        return (
                            <TouchableOpacity onPress={() => pressHandler(itemData.item.adresse) } >
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
        width: "100%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
    },
    buttonStyleSave: {
        height: 35,
        width: 255, 
      },
    firstModalButton:{
        margin: 5,
    },
    secondModalButton:{
        margin: 5,
    },
    combinedModalView:{
        flexDirection: "row",
        
    }
});

