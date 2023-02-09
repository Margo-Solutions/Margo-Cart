import React from 'react';
import RegisterScreen from './Screens/RegisterScreen';
import GlemtPassordScreen from './Screens/GlemtPassordScreen';
import LoginScreen from './Screens/LoginScreen';
import HjemmesideScreen from './Screens/HjemmesideScreen';
import { NavigationContainer } from "@react-navigation/native";
import {StatusBar, Text, View} from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from './context/Authcontex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from './components/navigation';


//components

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor="#8FD6F2" />
    <Navigation />
  </AuthProvider>
);
};



