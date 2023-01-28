import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState, useEffect } from 'react';
//components


export default function App() {
  const [handleliste, sethandleliste] = useState('');
  const 
  onsubmitform = async(e) => {
    e.preventDefault();
    try {
        const body = { handleliste };
        const response = await fetch("http://10.0.2.2:5000/handleliste", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
       // console.log(response);  
      }
        catch (err) {
                console.error(err.message);
            }
        }

    return ( 
    <View style={styles.container}>
        <View style={styles.inputView}>
        <TextInput
        style={{height: 40}}
        placeholder="Type here to insert data!"
        let food = "ost"
        value={handleliste}
        onChangeText={newText => sethandleliste(newText)}
    
      />
      </View>
      <Button title="add" onPress={onsubmitform}>  </Button>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView : {
    backgroundColor : "#8FD6F2DB",
    borderRadius : 30,
    borderColor : "black",
    borderWidth : 1,
    width : "70%",
    height : 45,
    marginBottom : 20,
    alignItems : "center"
  },

});
