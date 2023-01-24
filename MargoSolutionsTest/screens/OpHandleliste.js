import { StyleSheet, TextInput, View, Image, Button, Text, TouchableOpacity } from 'react-native';


export default function OpHandleliste({navigation}) {

  function titleInputHandler(enteredText) {
    console.log(enteredText);
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
                onChangeText={titleInputHandler}
                />
            </View>
          <View style={styles.buttonContainer}>
            <View>
              <TouchableOpacity style={styles.secondButtonStyle} onPress={() => navigation.navigate("Legg til Varer") }>
                <Text style={styles.opacityText}>Legg til varer</Text>
              </TouchableOpacity>
            </View>
                <View style={styles.buttonStyle}> 
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
  buttonStyle: {
    height: 35,
    width: 255, 
    marginTop: 350,
  },
  secondButtonStyle: {
    backgroundColor: 'transparent',
  },
  opacityText: {
    color: '#646161'
  }
});