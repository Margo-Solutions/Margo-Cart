import React, { createContext, useState, useEffect } from "react";

export const handContext = createContext();


export const HandProvider = ({ children }) => {
    const [handleliste_tittel, setHandlelisteTittel] = useState(''); // legger til handlelister
    const [handleliste, setHandleliste] = useState([]); // lister handlelister
    const [vare_navn, setVareNavn] = useState(''); // legger til varer
    const [vare, setVare] = useState([]); // lister varer
    const [handleliste_id, setHandlelisteID] = useState('');  

    const getHandlelisteName = async (id) => {
        try {
            const response = await fetch(`http://10.0.2.2:5000/margodatabase/handlelister/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const jsonData = await response.json();
            setHandlelisteTittel(jsonData.handleliste_tittel);
            console.log(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const ListVarerHandleliste = async (id) => {
        try {
            const response = await fetch(`http://10.0.2.2:5000/margodatabase/handleliste/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                });
            const handleliste = await response.json();
    
            setHandleliste(handleliste);
        } catch (err) {
            console.error(err.message);
        }
        };

    return (
        <handContext.Provider
            value={{
                getHandlelisteName,
                handleliste_tittel,
                setHandlelisteTittel,
                handleliste,
                setHandleliste,
                vare_navn,
                setVareNavn,
                vare,
                setVare,
                handleliste_id,
                setHandlelisteID,
                ListVarerHandleliste
            }}
        >
            {children}
        </handContext.Provider>
    );
};
