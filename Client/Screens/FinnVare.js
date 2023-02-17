
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Button, View, TextInput, Image, FlatList, Text, TouchableOpacity } from 'react-native';
export default function Varer({navigation, route}) {
  const [vare_navn, setVareNavn] = useState(''); // searching for items
  const [vare, setVare] = useState([]); // listing items use state

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
        
  useEffect(() => { // use effect to refresh the data
    ListVarer();
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
            <TouchableOpacity>
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

  