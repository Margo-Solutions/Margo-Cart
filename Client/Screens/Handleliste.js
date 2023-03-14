import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, TextInput, View, Image, Button, Text, TouchableOpacity, FlatList } from 'react-native';
import { handContext } from '../context/listeHandler';


export default function Handleliste({navigation, route}) {
    const {handlelisteID} = route.params; // getting handleliste id from previous screen
    const {handleliste_tittel, getHandlelisteName, ListVarerHandleliste, handleliste, updateHandleliste } = useContext(handContext);

    const updateOrRemove = async (id, antall) => { // update or remove item from handleliste
        let Numb = antall - 1;
        if (antall == 1) {
            removeItem(id);
        }
            else {
                updateHandleliste(Numb, id, handlelisteID);
            }
        ListVarerHandleliste(handlelisteID);
        };

    const removeItem = async (id) => { // remove item from handleliste
        try {
            const body = { id };
            const response = await fetch(`http://10.0.2.2:5000/margodatabase/handleliste/remove/`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();
            ListVarerHandleliste(handlelisteID);
            
        }catch (err) {
                console.error(err.message);
        }
        };

        const pressHandler = (handleliste_id) =>{ // press handler to handle item clicks  
          navigation.navigate('Varer',{
              handlelisteID: handleliste_id
            });
          };

    useEffect(() => { // use effect to refresh handleliste and items
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
              <View style={styles.titleContainer}>
              <TextInput 
                  style={styles.textInput}
                  placeholder=""
                  value={handleliste_tittel}
                  />
                  <Button title = "Lagre endringer" />
              </View>
              <View style={styles.listContainer}>
              <View>
                <TouchableOpacity style={styles.varerButtonStyle} onPress={() => pressHandler(handlelisteID) }>
                  <Text style={styles.opacityText}>Legg til varer</Text>
                </TouchableOpacity>
              </View>
              <FlatList data={handleliste} renderItem={(itemData) => {
              return(
                <TouchableOpacity onPress={()=> updateOrRemove(itemData.item.id, itemData.item.antall)} >
                <View style={styles.listItem}>
                  <Text style={styles.listText}>{itemData.item.antall}x {itemData.item.vare_navn}</Text>
                  <Text style={styles.lineText}>___________________________________________</Text>
                </View>
                </TouchableOpacity>
              );
              
            }}
              alwaysBounceVertical={false}
             />
             <View style={styles.buttonStyleNavigation}> 
                <Button
                    title="Naviger"
                    color = "#8FD6F2"
                    onPress={()=> navigation.navigate("ButikkSøk")}/>
                </View>
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
  titleContainer: { // title container
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: { // base container
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#CADCFF",
    justifyContent:'center',
  },
  titleStyle: {  // text style for handleliste
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  listText: { // text style inside flatlist
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  listItem: { // view style for the text inside flatlist
    margin: 8,
    padding: 6,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  varerButtonStyle: { // button for varer style
      backgroundColor: 'transparent',
    },
    opacityText: { // text for add items 
      color: '#646161',
      textAlign: 'center',
      fontSize: 18,
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
    lineText: { // line style for lines in flatlist
      textAlign: 'center',
    },
    buttonStyleNavigation: {
      height: 35,
      width: 255, 
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      marginLeft:80,
    },
});