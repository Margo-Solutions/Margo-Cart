import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Image, Button, Text, TouchableOpacity, FlatList } from 'react-native';


export default function OpHandleliste({navigation, route}) {
  const [handleliste_tittel, setHandlelisteTittel] = useState('');
  const [listVarer, setListVarer] = useState ([]);
  const {itemID, handlelisteID, handlelisteTittel} = route.params;
  const
  onsubmitform = async(e) => {
    e.preventDefault();
    try {
      const body = { handleliste_tittel };
      const response = await fetch("http://10.0.2.2:5000/margosolutions/handlelister:handleliste_tittel", {
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
      const response = await fetch("http://10.0.2.2:5000/margosolutions/handlelister");
      const listVarer= await response.json();

      setListVarer(listVarer);
    } catch (err) {
      console.error(err.message);
      
    }
  };
    useEffect(() => {
      ListHandlelister();
    }, []);

    const pressHandler = (handleliste_id) =>{
      navigation.navigate('Legg til Varer',{
        handlelisteID: handleliste_id,
      });
    };
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
          <View style={styles.buttonContainer}>
          <FlatList data={listVarer} removeClippedSubviews={false} renderItem={(itemData) => {
            return(
        
              <View style={styles.listItem}>
                <Text style={styles.listText}>{itemData.item.vare_id}</Text>
              </View>
              
            );
          }}
            alwaysBounceVertical={false}
           />
            <View>
              <TouchableOpacity style={styles.secondButtonStyle} onPress={() => pressHandler(handlelisteID) }>
                <Text style={styles.opacityText}>Legg til varer</Text>
              </TouchableOpacity>
            </View>
            <Text>itemID: {JSON.stringify(itemID)}</Text>
            <Text>handlelisteID: {JSON.stringify(handlelisteID)}</Text>
            <Text>handlelisteTittel: {JSON.stringify(handlelisteTittel)}</Text>
            <Text>{route.params.message}</Text>
            <View style={styles.buttonStyleSave}> 
                <Button
                    title="Lagre"
                    color = "#8FD6F2"
                    onPress={onsubmitform}
                />
                </View>
                <View style={styles.buttonStyleNavigation}> 
                <Button
                    title="Naviger"
                    color = "#8FD6F2"
                />
                </View>
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
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
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
  buttonContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#CADCFF",
    justifyContent:'center',
    alignItems: 'center',
  },
  buttonStyleNavigation: {
    height: 35,
    width: 255, 
    marginTop: 10,
  },
  secondButtonStyle: {
    backgroundColor: 'transparent',
  },
  opacityText: {
    color: '#646161'
  },
  buttonStyleSave: {
    height: 35,
    width: 255, 
    marginTop: 150,
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