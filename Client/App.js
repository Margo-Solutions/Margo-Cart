import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from './context/Authcontex';
import Navigation from './components/navigation';
import { HandProvider } from './context/listeHandler';

//components

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <AuthProvider>
      <HandProvider>
      <StatusBar barStyle="light-content" backgroundColor="#8FD6F2" />
    <Navigation />
    </HandProvider>
  </AuthProvider>
);
};



