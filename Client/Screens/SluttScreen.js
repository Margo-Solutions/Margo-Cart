import {useState} from 'react';
import { StyleSheet, TextInput, View, Image, Button, Text, TouchableWithoutFeedback, Animated, ScrollView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
export default function SluttScreen({navigation}) {
    const [starRating, setStarRating] = useState(null);
    const [text, onChangeText] = useState("")
    const animatedButtonScale = new Animated.Value(1);
    const handlePressIn = () => {
        Animated.spring(animatedButtonScale, {
          toValue: 1.5,
          useNativeDriver: true,
          speed: 50,
          bounciness: 4,
        }).start();
      };
      const handlePressOut = () => {
        Animated.spring(animatedButtonScale, {
          toValue: 1,
          useNativeDriver: true,
          speed: 50,
          bounciness: 4,
        }).start();
      };
      const animatedScaleStyle = {
        transform: [{ scale: animatedButtonScale }],
      };
      const pressHandler = () => {
        onChangeText("");
        setStarRating(false);
      }
    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={styles.image}
                    source={require('../assets/images/logoM.png')}
                />
            </View>
            <View style={styles.line} />
            <View style={styles.listContainer}>
                <ScrollView>
                <View style={styles.congratsContainer}>
                    <Image 
                        style={styles.congrats}
                        source={require('../assets/images/firework.png')}
                    />
                    <Text style={styles.congratsText}>Gratulerer du ble ferdig med handleturen din! Vil du gi oss tilbakemedling under?</Text>
                    <View style={styles.congratsButton}>
                    <Button title="Tilbake til hjemme skjerm" color="#03025c" onPress={() => navigation.navigate("Hjem")}></Button>
                    </View>
                </View>
                <View style={styles.secondLine}></View>
                     <Text style={styles.heading}>{starRating ? `Du har gitt oss ${starRating} stjerne/r`:'Trykk på stjernene for å gi oss en tilbakemelding'}</Text>
                <View style={styles.stars}>
                    <TouchableWithoutFeedback onPress={() => setStarRating(1)}>
                        <Animated.View style={animatedScaleStyle}>
                        <MaterialIcons name={starRating >= 1 ? 'star' : 'star-border'} size={32} style={starRating >= 1 ? styles.starSelected : styles.starUnselected} />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => setStarRating(2)}>
                    <Animated.View style={animatedScaleStyle}>
                        <MaterialIcons name={starRating >= 2 ? 'star' : 'star-border'} size={32} style={starRating >= 2 ? styles.starSelected : styles.starUnselected} />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => setStarRating(3)}>
                    <Animated.View style={animatedScaleStyle}>
                        <MaterialIcons name={starRating >= 3 ? 'star' : 'star-border'} size={32} style={starRating >= 3 ? styles.starSelected : styles.starUnselected} />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => setStarRating(4)}>
                    <Animated.View style={animatedScaleStyle}>
                        <MaterialIcons name={starRating >= 4 ? 'star' : 'star-border'} size={32} style={starRating >= 4 ? styles.starSelected : styles.starUnselected} />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => setStarRating(5)}>
                    <Animated.View style={animatedScaleStyle}>
                        <MaterialIcons name={starRating >= 5 ? 'star' : 'star-border'} size={32} style={starRating >= 5 ? styles.starSelected : styles.starUnselected} />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
                <TextInput
                style= {styles.input}
                placeholder='Gi oss tilbakemelding her...'
                    editable
                     multiline
                     numberOfLines={4}
                     onChangeText={text => onChangeText(text)}
                     value={text}
                >
                </TextInput>
                <View style={styles.buttonStyle}>
                <Button title="Send Tilbakemelding" onPress={() => pressHandler()} ></Button>
                </View>
                </ScrollView>
            </View>
        </View>
    )
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
    listContainer: { // base container
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: "#CADCFF",
        justifyContent: 'center',
    },
    stars: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    starUnselected: {
        color: '#aaa',
    },
    starSelected: {
        color: '#ffb300',
      },
      input: {
        top: 10,
        justifyContent: 'center',
        padding: 20,
        borderWidth:1,
        borderBottomColor: '#000000',
      },
      buttonStyle:{
        padding: 15,
        marginTop: 5,
      },
      congrats:{
        width:130,
        height:130,
      },
      congratsContainer:{  
        alignItems: 'center',
      },
      congratsText:{
        fontSize: 25,
      },
      congratsButton:{
        padding:6,
        height: 50,
        width: 250,
      },
      secondLine:{
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 30,
      },
})