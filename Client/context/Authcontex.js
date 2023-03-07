import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "react-native-reanimated";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setmail] = useState('');
    const [userid , setuserid] = useState('');

  const getuserid = async (mail) => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/margodatabase/kunder/${mail}`, {
        method: 'GET',
        headers: {token : await AsyncStorage.getItem('token')},
      });
      const parseRes = await response.json();
      console.log(parseRes.id);
      setuserid(parseRes.id);
      AsyncStorage.setItem("userid", JSON.stringify(parseRes.id));
      console.log(await AsyncStorage.getItem('userid'));
    } catch (error) {
      console.error(error.message);
    }
  }

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
        AsyncStorage.removeItem('userid');
        setIsAuthenticated(false);
        console.log(await AsyncStorage.getItem('token'))
        console.log(await AsyncStorage.getItem('userid'))
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
                setmail,
                setuserid,
                userid,
                getuserid
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};




