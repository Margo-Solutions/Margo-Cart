import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setmail] = useState('');

    const setAuth = (value) => {
        setIsAuthenticated(value);
      }
      const isAuth = async () => {
        try {
          const response = await fetch('http://10.0.2.2:5000/margodatabase/verify', {
            method: 'GET',
            headers: {token : await AsyncStorage.getItem('token')},
          });
          const parseRes = await response.json();
        // console.log(await AsyncStorage.getItem('token'));
         //console.log(parseRes);
          parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
        } catch (error) {
          console.error(error.message);
    
        }
    
      }
      const logout = async() => {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('email');
        setIsAuthenticated(false);
        console.log(await AsyncStorage.getItem('token'))
        console.log('logged out');
      }

      useEffect(() => {
        isAuth();
        []
      });

      return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setAuth,
                isAuth,
                logout,
                email,
                setmail
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};




