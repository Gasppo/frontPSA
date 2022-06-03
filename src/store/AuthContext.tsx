import React, { useEffect, useState } from "react";
import { User } from "../components/types/ticketTypes";


interface AuthContextType {
    isLoggedIn: boolean,
    onLogout: () => void,
    onLogin: (email: string, password: string) => Promise<Response> | undefined,
    userInfo: User | undefined,
}


export const AuthContext = React.createContext<AuthContextType>({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: (email: string, password: string) => undefined,
    userInfo: {} as User,
})

interface AuthContextProviderProps {
    children: React.ReactNode
}

export const AuthContextProvider = (props: AuthContextProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);
    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        if (storedUserLoggedInInformation === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    const loginHandler = async (email: string, password: string) => {
        localStorage.setItem('isLoggedIn', '1');
        const respuesta = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const responseJSON = await respuesta.json();
        if (respuesta?.ok) {
            setIsLoggedIn(true);
            setLoggedInUser(responseJSON.user);
        }
        return respuesta
    };

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    return <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogin: loginHandler, onLogout: logoutHandler, userInfo: {
        id: loggedInUser?.id || '',
        email: loggedInUser?.email || '',
        firstName: loggedInUser?.firstName || '',
        lastName: loggedInUser?.lastName || '',
        password: ''
    } }}>
        {props.children}
    </AuthContext.Provider>
}

