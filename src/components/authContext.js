import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../firebase/firebase';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user ? user.uid : null);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
