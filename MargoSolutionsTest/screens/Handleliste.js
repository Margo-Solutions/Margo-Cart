
import { StyleSheet, Button, View, Image, Text } from 'react-native';

export default function Handleliste({navigation}) {
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
          onPress={() => navigation.navigate("Opprett Handleliste") }
          />
        </View>
      </View>
      <View style={styles.listContainer}>
          <Text style={styles.textStyle}>
            Du har ingen handleliste/r
          </Text>
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
  }
});