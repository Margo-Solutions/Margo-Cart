import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import login from '../Screens/LoginScreen';
import register from '../Screens/RegisterScreen';
import GlemtPassordScreen from '../Screens/GlemtPassordScreen';
import LagHandlelister from "../Screens/LagHandlelister";
import { AuthContext } from '../context/Authcontex';
import Handleliste from "../Screens/Handleliste";
import Varer from "../Screens/Varer";
import HjemmesideScreen from '../Screens/HjemmesideScreen';
import FinnButikkKart from '../Screens/FinnButikkKart';
import FinnButikk from '../Screens/FinnButikker';
import FinnVare from '../Screens/FinnVare';
import innendørsKart from '../Screens/innendørsKart';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Navigation = () => {
    const { isAuthenticated } = React.useContext(AuthContext);
    return (
        <NavigationContainer>
            <Stack.Navigator>
        
                {isAuthenticated ? (
                    <>
                        <Stack.Screen name="HomeRoot" component={HomeRoot} options={{headerShown:false}} />
                    </>
                ) :
                    (
                        <>
                            <Stack.Screen name="AuthRoot" component={AuthRoot} options={{headerShown:false}}/>
                        </>
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;

function HomeRoot(){
    return(
        <Drawer.Navigator backBehavior='history' screenOptions={{
            headerTransparent: true,
            headerTitle: "",
            drawerStyle: {
                backgroundColor: "#7CBFDA",
            }

        }} >
            <Drawer.Screen name="Hjem" component={HjemmesideScreen} />
                        <Drawer.Screen name="Handleliste" component={Handleliste} options={{drawerItemStyle:{ display: 'none' }}} />
                        <Drawer.Screen name="Dine Handlelister" component={LagHandlelister} />
                        <Drawer.Screen name="Varer" component={Varer} options={{drawerItemStyle:{ display: 'none' }}} />
                        <Drawer.Screen name="Veibeskrivelse" component={FinnButikkKart} options={{drawerItemStyle:{ display: 'none' }, drawerLockMode:'locked-closed', headerShown: false, swipeEdgeWidth: 0 }} />
                        <Drawer.Screen name="Finn Butikk" component={FinnButikk} />
                        <Drawer.Screen name="Finn Vare" component={FinnVare} />
                        <Drawer.Screen name ="innendørskart" component={innendørsKart} options={{drawerItemStyle:{ display: 'none' }, drawerLockMode:'locked-closed', headerShown: false, swipeEdgeWidth: 0 }} />
                        
            </Drawer.Navigator>
    );
}

function AuthRoot(){
    return( 
        <Drawer.Navigator screenOptions={{
            headerTransparent: true,
            headerTitle: "",
            drawerStyle: {
                backgroundColor: "#7CBFDA",
            }
        }} >
            <Drawer.Screen name="Login" component={login} options={{ drawerLockMode: 'locked-closed', headerShown: false, swipeEdgeWidth: 0, }} />
                            <Drawer.Screen name="Register" component={register} options={{ drawerLockMode: 'locked-closed', headerShown: false, swipeEdgeWidth: 0 }} />
                            <Drawer.Screen name="GlemtPassord" component={GlemtPassordScreen} options={{ drawerLockMode: 'locked-closed', headerShown: false, swipeEdgeWidth: 0 }} />
            </Drawer.Navigator>
    );
}