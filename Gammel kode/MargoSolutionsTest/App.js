import 'react-native-gesture-handler';
import Handleliste from "./screens/Handleliste";
import Hjemme from "./screens/Hjemme";
import Varer from "./screens/Varer";
import OpHandleliste from "./screens/OpHandleliste";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Image, StyleSheet} from 'react-native';

const Drawer = createDrawerNavigator();


export default function App() {
  return(
    <NavigationContainer>
     <Drawer.Navigator  screenOptions={{
     headerTransparent: true,
     headerTitle: "",
     drawerStyle:{
      backgroundColor:"#7CBFDA",
     }
    
}} >
        <Drawer.Screen name='Hjemme' component={Hjemme} />
        <Drawer.Screen name='Handlelister' component={Handleliste}/>
        <Drawer.Screen name='Opprett Handleliste' component={OpHandleliste}  options={{
                  drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Legg til Varer' component={Varer}  options={{
                  drawerItemStyle: { display: 'none' }
        }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 130,
    height: 130,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});