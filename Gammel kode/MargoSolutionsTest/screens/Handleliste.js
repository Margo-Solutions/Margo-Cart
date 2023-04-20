import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Image, Text, FlatList, TouchableOpacity } from 'react-native';


export default function Handleliste({navigation, route}) {
  const [handleliste, setHandleliste] = useState([]); //brukt for å liste database variabler 
  const ListHandlelister = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5000/margosolutions/handlelister");
      const handleliste= await response.json();

      setHandleliste(handleliste);
    } catch (err) {
      console.error(err.message);
      
    }
  };
    useEffect(() => {
      ListHandlelister();
    }, []);
  
  
    const pressHandler = (vare_id, handleliste_id, handleliste_tittel) =>{
      navigation.navigate('Opprett Handleliste',{
        itemID: vare_id,
        handlelisteID: handleliste_id,
        handlelisteTittel: handleliste_tittel
      });
    };

    const secondPressHandler=() =>{
      navigation.navigate('Opprett Handleliste',{

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
         <View style={styles.buttonContainer}>
          <Button
          title = "Opprett handleliste"
          color = "#CADCFF"
          onPress={() => secondPressHandler() }
          />
        </View>
      </View>
      <View style={styles.listContainer}>
      <FlatList data={handleliste} renderItem={(itemData) => {
            return(
              <TouchableOpacity onPress={()=>pressHandler(itemData.item.vare_id, itemData.item.handleliste_id, itemData.item.handleliste_tittel)}>
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