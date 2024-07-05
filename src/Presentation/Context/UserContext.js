import React, { createContext, useState } from 'react';

export const UserInicialState = {
    id:                 "",
    name:               "",
    lastname:           "",
    email:              "",
    phone:              "",
    password:           "",
    confirmpassword:    "",
    image:              "",
    session_token:      "",
    roles:              [],
}

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [session, setSession] = useState(false); // Supongo que session es algún tipo de estado que deseas proporcionar a través del contexto

    const loginStatus = async (success) => {
        setSession(success);
    }

    return (
        <UserContext.Provider 
            value={{ 
                session, 
                setSession,
                loginStatus
            }}
        >
            {children}
        </UserContext.Provider>
    );
};