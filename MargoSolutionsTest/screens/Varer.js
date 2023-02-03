
import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Button, View, TextInput, Image, FlatList, Text, TouchableOpacity } from 'react-native';


export default function Varer({navigation}) {
  
  const [handleliste, sethandleliste] = useState('');
  const [todos, setTodos] = useState([]);


  const
  onsubmitform = async(e) => {
    e.preventDefault();
    try {
      const body = { handleliste };
      const response = await fetch("http://10.0.2.2:5000/varer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
      
    }
  };

  const ListTodos = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5000/varer");
      const todos = await response.json();

      setTodos(todos);
    } catch (err) {
      console.error(err.message);
      
    }
  };

  const pressHandler = (handleliste) =>{
    console.log(handleliste);
  }


  useEffect(() => {
    ListTodos();
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
                value={handleliste}
                onChangeText={newText => sethandleliste(newText)}
                />
          <Button title = "Add Vare" onPress={onsubmitform} />
          </View>      
          <View style={styles.listContainer}>
          <FlatList data={todos}  renderItem={(itemData) => {
            return(
            <TouchableOpacity onPress={()=>pressHandler(itemData.item.handleliste)}>
              <View style={styles.listItem}>
                <Text style={styles.listText}>{itemData.item.handleliste}</Text>
              </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
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
          listContainer: {
            flex: 1,
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: "#CADCFF",
            justifyContent:'center',
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

  