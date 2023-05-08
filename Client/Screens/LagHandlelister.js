import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, TextInput, View, Image, Button, Text, TouchableOpacity, FlatList } from 'react-native';
import { AuthContext } from '../context/Authcontex';
import { handContext } from '../context/listeHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LagHandlelister({ navigation }) {
  const [handleliste_tittel, setHandlelisteTittel] = useState(''); // handleliste tittel use state
  const [handleliste, setList] = useState([]);  // list handlelister use state
  const { ListVarerHandleliste, getHandlelisteName } = useContext(handContext);
  const [kunde_id, setKundeID] = useState(''); // kunde id use state

  const getkundeID = async () => { // getting kunde id
    try {
      setKundeID(await AsyncStorage.getItem('userid'));
    } catch (err) {
      console.error(err.message);
    }
  };

  const make_handleliste = async (e) => { //create a handleliste
    e.preventDefault();
    try {
      getkundeID();
      const body = { handleliste_tittel, kunde_id };
      const response = await fetch("http://10.0.2.2:5000/margodatabase/handlelister/nyhandleliste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location = "/";
      ListHandleliste(await AsyncStorage.getItem('userid'));
    } catch (err) {
      console.error(err.message);

    }
  };
  const ListHandleliste = async (id) => {
    try {
      id = await AsyncStorage.getItem('userid');
      const response = await fetch(`http://10.0.2.2:5000/margodatabase/kunder/get/${id}`);
      const handleliste = await response.json();
      setList(handleliste);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteHandleliste = async (handleliste_id) => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/margodatabase/handlelister/sletthandleliste/${kunde_id}/${handleliste_id}`, {
        method: "DELETE",
      });
      ListHandleliste(await AsyncStorage.getItem('userid'));
    } catch (err) {
      console.error(err.message);
    }
  };

  const pressHandler = (handleliste_id, handleliste_tittel) => { // press handler to handle handleliter button press
    ListVarerHandleliste(handleliste_id);
    navigation.navigate('Handleliste', {
      handlelisteID: handleliste_id,
      handlelisteTittel: handleliste_tittel,
    });
  };

  const refreshData = async () => {
    getkundeID();
    ListHandleliste(await AsyncStorage.getItem('userid'));
  };

  useEffect(() => { // useEffect to refresh the data when the screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      refreshData();
    });
    return unsubscribe;
  }, [navigation]);

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
          onChangeText={newText => setHandlelisteTittel(newText)}

        />
        <Button title="Legg til Handleliste" onPress={make_handleliste} />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={handleliste}
          renderItem={(itemData) => {
            return (
              <View style={styles.listItemContainer}>
                <TouchableOpacity onPress={() => pressHandler(itemData.item.handleliste_id, itemData.item.handleliste_tittel)}>
                  <View style={styles.listItem}>
                    <Text style={styles.listText}>{itemData.item.handleliste_tittel}</Text>
                    <Text style={styles.listText}>__________________</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteHandleliste(itemData.item.handleliste_id)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Slett</Text>
                </TouchableOpacity>
              </View>
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
    justifyContent: 'center',
  },
  listText: { // text style inside flatlist
    color: '#646161',
    fontSize: 20,
    textAlign: 'center',
  },
  listItem: { // view style for the text inside flatlist
    margin: 20,
    padding: 6,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: -10,
    paddingHorizontal: 20,
  },
  deleteButton: {
    //backgroundColor: '#03025c',
    padding: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});