import React, { createContext, useEffect, useState } from 'react';
import useFetch from '../src/hooks/useFetch';
import * as SecureStore from 'expo-secure-store';
import { Global } from '../src/utils/Global';

export const UserDetailsContext = createContext()

export const UserDetailsProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null)
    const [ auth, setAuth ] = useState({});
    const [loading, setLoading ] = useState(true);
    const { fetchData } = useFetch({});

    useEffect(() => {

        authUser();
        
    }, [userDetails]);

    const authUser = async() => {
        // Sacar datos usuario identificado del localStorage
        const token = await SecureStore.getItemAsync('token');
        const user = await SecureStore.getItemAsync('user'); 
        // Comprobar si tengo el token y el user
        if (!token || !user) {
            setLoading(false);
            return false;
        }

        // Petición ajax al backend que compruebe el token y
        // que me devuelva todos los datos del usuario
        const data = await fetchData(Global.url + "user/devolverUsuarioToken", 'GET');

        // Setear el estado de auth
        setAuth(data.user);

        setLoading(false);
    }

    const updateUserDetails = (newDetails) => {
        setUserDetails(newDetails);
    };

    return (
        <UserDetailsContext.Provider 
        value={{ 
            userDetails, updateUserDetails,
            auth,
            setAuth,
            loading,
            authUser
        }}>
            {children}
        </UserDetailsContext.Provider>
    )
}
