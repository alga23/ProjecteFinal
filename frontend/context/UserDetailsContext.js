import React, { createContext, useEffect, useState } from 'react';
import useFetch from '../src/hooks/useFetch';
import * as SecureStore from 'expo-secure-store';

export const UserDetailsContext = createContext()

export const UserDetailsProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null)
    const [ auth, setAuth ] = useState({});
    const [loading, setLoading ] = useState(true);
    const { fetchData } = useFetch({});

    useEffect(() => {

        authUser();
        
    }, []);

    const authUser = async() => {
        // Sacar datos usuario identificado del localStorage
        const token = await SecureStore.getItemAsync('token');
        const user = await SecureStore.getItemAsync('user'); 
        // Comprobar si tengo el token y el user
        if (!token || !user) {
            setLoading(false);
            return false;
        }

        // Transformar los datos a un objeto de javascript
        const userObj = JSON.parse(user);
        const userId = userObj._id;

        // Petición ajax al backend que compruebe el token y
        // que me devuelva todos los datos del usuario
        const data = await fetchData(Global.url + "user/profile/"+userId, 'GET');

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
