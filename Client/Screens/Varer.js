
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Button, View, TextInput, Image, FlatList, Text, TouchableOpacity } from 'react-native';
import { handContext } from '../context/listeHandler';
export default function Varer({navigation, route}) {
  const [vare_navn, setVareNavn] = useState(''); // searching for items
  const [vare, setVare] = useState([]); // listing items use state
  const [handleliste_id, setHandlelisteID] = useState('');  //use state for updating handleliste id 
  const {handlelisteID} = route.params; // getting handleliste id from previous screen
  const {ListVarerHandleliste} = useContext(handContext);

  const ListVarer = async () => { // listing items
    try {
      const response = await fetch("http://10.0.2.2:5000/Margodatabase/varer");
      const vare = await response.json();
      setVare(vare);
    } catch (err) {
      console.error(err.message);
      
    }
  };
  const SearchVarer = async (vare_navn) => { // searching for items
    if (vare_navn == ''){
        ListVarer();
    }
    else{
    try {
        const response = await fetch(`http://10.0.2.2:5000/Margodatabase/varer/Search/${vare_navn}`, {
            method: "GET",
        });
        const vare = await response.json();
        setVare(vare);

      } catch (err) {
        console.error(err.message);
        
      }
    }
    };

  const updateVare = async (antall, vare_id) => { // updating items
    try {
        const body = { handleliste_id};
        const response = await fetch(`http://10.0.2.2:5000/Margodatabase/varer/update/add/${antall}/${vare_id}` ,{
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }
        );
        const vare = await response.json();
        ListVarerHandleliste(handleliste_id);
      } catch (err) {
        console.error(err.message);
        
      }
    };

  const checkHandleliste = async (handleliste_id, vare_id) => {
    try{
    const response = await fetch(`http://10.0.2.2:5000/margodatabase/handleliste/check/${handleliste_id}/${vare_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        });
    const handleliste = await response.json();
    if (handleliste.antall > 0){
        let antall = handleliste.antall + 1;
        updateVare(antall, vare_id);
    }
    else{
        AddVare(vare_id);
    }
    }
    catch (err) {
        console.error(err.message);
    }
}

  const AddVare = async (vare_id) => { // adding items
    try {
        const antall = 1;
        const body = { handleliste_id, vare_id, antall };
        const response = await fetch("http://10.0.2.2:5000/Margodatabase/handleliste/varer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const parseRes = await response.json();
        ListVarerHandleliste(handlelisteID);
  
    }catch (err) {
            console.error(err.message);
    }
    };

        
  useEffect(() => { // use effect to refresh the data
    ListVarer();
    setHandlelisteID(handlelisteID);
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
                placeholder=""
                value={vare_navn}
                onChangeText={newText => setVareNavn(newText)}
                />
          <Button title = "Søk etter vare" onPress={() =>SearchVarer(vare_navn)}/>
          </View>      
          <View style={styles.listContainer}>
          <FlatList data={vare} renderItem={(itemData) => {
            return(
            <TouchableOpacity onPress={() => checkHandleliste(handleliste_id, itemData.item.vare_id)}>
              <View style={styles.listItem}>
                <Text style={styles.listText}>{itemData.item.vare_navn} </Text>
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
            justifyContent:'center',
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
    });

  