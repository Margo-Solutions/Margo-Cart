
import { StyleSheet, View, Button, Image,Text } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/Authcontex';


export default function HjemmesideScreen({ navigation }) {
  const {logout} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View>
        <Image
        style={styles.image}
        source={require('../assets/images/logoM.png')}
          />
      </View>
      <View style={styles.line} />
        <View style={styles.flexBox}>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Lag Handleliste" color="#8FD6F2" onPress={() => navigation.navigate("LagHandlelister")}/>
            </View>
            <View style={styles.button}>
              <Button title="Finn Vare" color="#8FD6F2" />
            </View>
            <View style={styles.button}>
              <Button title="Innstlinger" color="#8FD6F2" />
            </View>
            <View style={styles.button}>
              <Button title="logout" color="#8FD6F2" onPress={logout}/>
            </View>
         </View>
        </View>
          <View style={styles.secondFlexBox}>
            <View style={styles.secondline} />
              <Text style={styles.textStyle}>Din Posisjon:</Text>
        <Image
        style={styles.map}
        source={require('../assets/images/map.png')}
        />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { // container style 
    flex: 1,
    backgroundColor: '#66A2BA',
  },
  image: { //image style
    width: 130,
    height: 130,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  buttonContainer: { //button container for all buttons
   padding: 16,
   marginHorizontal: 8,
   flexDirection: 'column',
   height: 200,
   width: 200,
   left: 90,
   bottom: 30,
   
  },
  button: {  // button styles for all butons
    marginVertical: 15,
    borderColor: 'black',
    borderRadius: 50,
    borderWidth: 1,
    overflow: 'hidden',
    fontSize: 20,
    
  },
  line: { // the black line on top 
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    bottom: 25,
  },
  secondline: { // black line on bottom
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    top: 40,
  },
  textStyle: { // text style
    color: 'black',
    marginTop: 50,
  },
  map: { // map picture style
   height: 300,
   width: 300,
   top: 10,
   left: 70,
  },
  flexBox:{ //flexbox for the buttons
    flex: 2,
  },
  secondFlexBox:{ //flexbox for the map 
    flex: 3,
  }
});