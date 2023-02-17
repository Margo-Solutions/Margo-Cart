import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, TextInput, View, Image, Button, Text, TouchableOpacity, FlatList } from 'react-native';
import { AuthContext } from '../context/Authcontex';
import { handContext } from '../context/listeHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LagHandlelister({navigation}) {
  const [handleliste_tittel, setHandlelisteTittel] = useState(''); // handleliste tittel use state
  const [handleliste, setList] = useState ([]);  // list handlelister use state
  const {ListVarerHandleliste, getHandlelisteName} = useContext(handContext);
  const {email} = useContext(AuthContext);
  const [kunde_id, setKundeID] = useState(''); // kunde id use state

  const getkundeID = async (mail) => { // getting kunde id
    try {
        const response = await fetch(`http://10.0.2.2:5000/margodatabase/kunder/${mail}`, {
        });
        const kunde_id = await response.json();
        setKundeID(kunde_id.id);
        } catch (err) {
        console.error(err.message);
        }
    };
  const make_handleliste = async(e) => { //create a handleliste
    e.preventDefault();
    try {
      getkundeID(await AsyncStorage.getItem('email'));
      const body = { handleliste_tittel, kunde_id };
      const response = await fetch("http://10.0.2.2:5000/margodatabase/handlelister/nyhandleliste", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
      });
      window.location = "/";
      ListHandleliste(await AsyncStorage.getItem('email'));
    } catch (err) {
      console.error(err.message);
      
    }
  };

    const ListHandlelister = async () => { //listing handlelister
    try {
        const response = await fetch("http://10.0.2.2:5000/margodatabase/handlelister");
        const handleliste = await response.json();
        setList(handleliste);
    } catch (err) {
        console.error(err.message);
    }
    };

    const ListHandleliste = async (mail) => {
        try {
            mail = await AsyncStorage.getItem('email');
            const response = await fetch(`http://10.0.2.2:5000/margodatabase/kunder/get/${mail}`);
            const handleliste = await response.json();
            setList(handleliste);
        } catch (err) {
            console.error(err.message);
        }
        };


    const pressHandler = (handleliste_id, handleliste_tittel) =>{ // press handler to handle handleliter button press
        ListVarerHandleliste(handleliste_id)
        getHandlelisteName(handleliste_id)
        navigation.navigate('Handleliste',{
          handlelisteID: handleliste_id,
          handlelisteTittel: handleliste_tittel,
        });
      };
  
    useEffect(() => { // useEffect to refresh the data
        ListHandleliste(email);
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
          <View style={styles.inputContainer}>
            <TextInput 
                  style={styles.textInput}
                  placeholder=""
                  value={handleliste_tittel}
                  onChangeText = {newText => setHandlelisteTittel(newText)}
  
                  />
            <Button title = "Legg til Handleliste" onPress={make_handleliste} />
            </View>     
              <View style={styles.listContainer}>
              <FlatList data={handleliste} renderItem={(itemData) => {
              return(
                <TouchableOpacity onPress={()=>pressHandler(itemData.item.handleliste_id, itemData.item.handleliste_tittel)}>
                <View style={styles.listItem}>
                  <Text style={styles.listText}>{itemData.item.handleliste_tittel}</Text>
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
  inputContainer: { // view style for input title container
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: { // text input style for input title container
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
  listContainer: { // base container
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#CADCFF",
    justifyContent:'center',
  },
  listText: { // text style inside flatlist
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
});