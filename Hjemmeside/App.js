
import { StyleSheet, View, Button, Image,Text } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Image
        style={styles.image}
        source={require('./assets/images/logoM.png')}
          />
      </View>
      <View style={styles.line} />
        <View style={styles.test}>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Lag Handleliste" color="#8FD6F2" />
            </View>
            <View style={styles.button}>
              <Button title="Finn Vare" color="#8FD6F2" />
            </View>
            <View style={styles.button}>
              <Button title="Innstlinger" color="#8FD6F2" />
            </View>
            <View style={styles.button}>
              <Button title="Kontakt" color="#8FD6F2" />
            </View>
         </View>
        </View>
          <View style={styles.nexttest}>
            <View style={styles.secondline} />
              <Text style={styles.textStyle}>Din Posisjon:</Text>
        <Image
        style={styles.map}
        source={require('./assets/images/map.png')}
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
  },
  buttonContainer: {
   padding: 16,
   marginHorizontal: 8,
   flexDirection: 'column',
   height: 200,
   width: 200,
   left: 90,
   bottom: 30,
   
  },
  button: {
    marginVertical: 15,
    borderColor: 'black',
    borderRadius: 50,
    borderWidth: 1,
    overflow: 'hidden',
    fontSize: 20,
    
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    bottom: 25,
  },
  secondline: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    top: 40,
  },
  textStyle: {
    color: 'black',
    marginTop: 50,
  },
  map: {
   height: 300,
   width: 300,
   top: 10,
   left: 70,
  },
  test:{
    flex: 2,
  },
  nexttest:{
    flex: 3,
  }
});
