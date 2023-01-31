import React from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";

export default function Input() {
    const [text, setText] = useState('');
    const onSubmit = async(e) => {
        try {
        e.preventDefault();
        const body = { text };
        const response = await fetch("http://localhost:5000/margodatabase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        }
        catch (err) {
                console.error(err.message);
            }
        }

    return ( 
    <View>
        <TextInput style ={placeholder = "type input here"}
        onChangeText={newText => setText(newText)}
        defaultValue={text}
        /> 
      <Text>Input</Text>
      <Button title="add" onPress={setText}>  </Button>
    </View>
  );
}