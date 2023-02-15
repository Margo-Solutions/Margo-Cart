import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, TextInput, View, Image, Button, Text, TouchableOpacity, FlatList } from 'react-native';
import { handContext } from '../context/listeHandler';



export default function Handleliste({navigation, route}) {
   // const [handleliste_tittel, setHandlelisteTittel] = useState(''); // legger til handlelister
    const {handlelisteID} = route.params;
    const {handleliste_tittel, getHandlelisteName, ListVarerHandleliste, handleliste, updateHandleliste } = useContext(handContext);

    const updateOrRemove = async (id, antall) => {
        let Numb = antall - 1;
        if (antall == 1) {
            removeItem(id);
        }
            else {
                updateHandleliste(Numb, id, handlelisteID);
                console.log(Numb, id, handlelisteID, "update");
            }
        ListVarerHandleliste(handlelisteID);
        };

    const removeItem = async (id) => {
        try {
            const body = { id };
            console.log(body);
            const response = await fetch(`http://10.0.2.2:5000/margodatabase/handleliste/remove/`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();
            console.log(parseRes);
            ListVarerHandleliste(handlelisteID);
            
        }catch (err) {
                console.error(err.message);
        }
        };

        const pressHandler = (handleliste_id) =>{
            navigation.navigate('Varer',{
              handlelisteID: handleliste_id
            });
          };

    useEffect(() => {
        console.log(handlelisteID);
        getHandlelisteName(handlelisteID);
        ListVarerHandleliste(handlelisteID);
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
                  <Text style={styles.textStyle}> {handleliste_tittel} </Text>
              </View>
              <View style={styles.listContainer}>
              <View>
                <TouchableOpacity style={styles.secondButtonStyle} onPress={() => pressHandler(handlelisteID) }>
                  <Text style={styles.opacityText}>Legg til varer</Text>
                </TouchableOpacity>
              </View>
              <FlatList data={handleliste} renderItem={(itemData) => {
              return(
                <TouchableOpacity onPress={()=> updateOrRemove(itemData.item.id, itemData.item.antall)} >
                <View style={styles.listItem}>
                  <Text style={styles.listText}>{itemData.item.vare_navn} {itemData.item.antall}</Text>
                  
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
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  listItem: {
    margin: 8,
    padding: 6,
    borderRadius: 10,
    backgroundColor: '#B2BEB5',
  },
  secondButtonStyle: {
      backgroundColor: 'transparent',
    },
    opacityText: {
      color: '#646161',
      textAlign: 'center',
      fontSize: 18,
    },
    buttonStyleSave: {
      height: 35,
      width: 255, 
      marginTop: 150,
    },
});