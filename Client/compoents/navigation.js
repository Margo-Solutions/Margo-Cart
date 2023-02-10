import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import login from '../Screens/LoginScreen';
import register from '../Screens/RegisterScreen';
import Home from '../Screens/HjemmesideScreen';
import LagHandlelister from "../Screens/LagHandlelister";
import { AuthContext } from '../context/Authcontex';
import handleliste from "../Screens/Handleliste";


const Stack = createNativeStackNavigator();

const Navigation = () => {
    const {isAuthenticated} = React.useContext(AuthContext);
    return (
        <NavigationContainer>
        <Stack.Navigator>
        {isAuthenticated ? (
            <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="LagHandlelister"  component={LagHandlelister} />
            <Stack.Screen name="Handleliste"  component={handleliste} />
            </>
            ) : (
                <>
            <Stack.Screen name="Login"  component={login} /> 
            <Stack.Screen name="Register" component={register} />  
            </>
            )}
        </Stack.Navigator>
        </NavigationContainer>
    );
    };	

export default Navigation;
