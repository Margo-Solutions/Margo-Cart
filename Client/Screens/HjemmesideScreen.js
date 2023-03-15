import { StyleSheet, View, Button, Image,Text } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/Authcontex';


export default function HjemmesideScreen({ navigation}) {
  const {logout} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
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
              <Button title="Finn Vare" color="#8FD6F2" onPress={()=> navigation.navigate("Finn Vare")} />
            </View>
            <View style={styles.button}>
              <Button title="Finn Butikk" color="#8FD6F2" onPress={()=> navigation.navigate("ButikkSøk")} />
            </View>
         </View>
        </View>
        <View style={styles.logoutContainer}>
        <View style={styles.logoutbutton}>
              <Button title="logout" color="#8FD6F2" onPress={logout}/>
            </View>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { // container style 
    flex: 1,
    backgroundColor: '#66A2BA',
  },
  imageContainer: { 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: { //image style
    width: 350,
    height: 350,
  },
  buttonContainer: { //button container for all buttons
   //backgroundColor: '#CADCFF',
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
  logoutContainer:{ 
    bottom: 50,
  },
  logoutbutton: {  // button styles for logoutbutton
    overflow: 'hidden',
  },
  line: { // the black line on top 
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    bottom: 50,
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
});