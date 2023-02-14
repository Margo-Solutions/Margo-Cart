import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, TextInput, View, Image, Button, Text, TouchableOpacity, FlatList } from 'react-native';
import { handContext } from '../context/listeHandler';


export default function LagHandlelister({navigation}) {
  const [handleliste_tittel, setHandlelisteTittel] = useState('');
  const [handleliste, setList] = useState ([]);
  const {ListVarerHandleliste, getHandlelisteName} = useContext(handContext);

  const make_handleliste = async(e) => {
    e.preventDefault();
    try {
      const body = { handleliste_tittel };
      const response = await fetch("http://10.0.2.2:5000/margodatabase/handlelister/registrer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
      
    }
  };

    const ListHandlelister = async () => {
    try {
        const response = await fetch("http://10.0.2.2:5000/margodatabase/handlelister");
        const handleliste = await response.json();
        setList(handleliste);
    } catch (err) {
        console.error(err.message);
    }
    };

    const pressHandler = (handleliste_id, handleliste_tittel) =>{
        ListVarerHandleliste(handleliste_id)
        getHandlelisteName(handleliste_id)
        navigation.navigate('Handleliste',{
          handlelisteID: handleliste_id,
          handlelisteTittel: handleliste_tittel,
        });
      };
  
    useEffect(() => {
    ListHandlelister();
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
                placeholder="Legg til Tittel"
                value={handleliste_tittel}
                onChangeText={newText => setHandlelisteTittel(newText)}
                />
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
    container: {
      flex: 1,
      backgroundColor: '#66A2BA',
    },
    image: {
      width: 130,
      height: 130,
      flexDirection: 'row',
      alignSelf: 'flex-end',
    },
    line: {
      borderBottomColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
      bottom: 25,
    },
    buttonContainer: {
      borderRadius: 10,
      overflow: 'hidden',
      width: 350,
      height: 35,
      textAlign: 'center',
    },
    inputContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContainer: {
      flex: 1,
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: "#CADCFF",
      justifyContent:'center',
    },
    textStyle: {  
      textAlign: 'center',
      fontSize: 20,
    },
    listText: {
      color: 'white',
      fontSize: 20,
    },
    listItem: {
      margin: 8,
      padding: 6,
      borderRadius: 10,
      backgroundColor: '#5e0acc',
    },
  });