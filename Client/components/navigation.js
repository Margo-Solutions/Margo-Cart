import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import login from '../Screens/LoginScreen';
import register from '../Screens/RegisterScreen';
import GlemtPassordScreen from '../Screens/GlemtPassordScreen';
import Home from '../Screens/HjemmesideScreen';
import LagHandlelister from "../Screens/LagHandlelister";
import { AuthContext } from '../context/Authcontex';
import handleliste from "../Screens/Handleliste";
import Varer from "../Screens/Varer";


const Drawer = createDrawerNavigator();

const Navigation = () => {
    const { isAuthenticated } = React.useContext(AuthContext);
    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{
                headerTransparent: true,
                headerTitle: "",
                drawerStyle: {
                    backgroundColor: "#7CBFDA",
                }

            }} >
                {isAuthenticated ? (
                    <>
                        <Drawer.Screen name="Home" component={Home}  />
                        <Drawer.Screen name="LagHandlelister" component={LagHandlelister} />
                        <Drawer.Screen name="Handleliste" component={handleliste} />
                    </>
                ) :
                    (
                        <>
                            <Drawer.Screen name="Login" component={login} options={{ drawerLockMode: 'locked-closed', headerShown: false }} />
                            <Drawer.Screen name="Register" component={register} options={{drawerLockMode: 'locked-closed', headerShown: false}}/>
                            <Drawer.Screen name="GlemtPassord" component={GlemtPassordScreen} options={{drawerLockMode: 'locked-closed', headerShown: false}}/>
                        </>
                    )}
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
