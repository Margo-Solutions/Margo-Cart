import { StyleSheet, Button, View, Image, Text } from 'react-native';

export default function Varer({navigation}) {
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
    });