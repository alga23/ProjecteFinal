import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';

const useFetch = () => {
    
    const [loading, setLoading] = useState(false);

    const fetchData = async (url, method, body) => {
        try {
            setLoading(true);

            const headers = {
                'Content-Type': 'application/json',   
            }
            
            const token = await SecureStore.getItemAsync('token'); 
            if(token) {
                headers['Authorization'] = token;
            }
    
            // Realizar la solicitud con los encabezados construidos
            const request = await fetch(url, {
                method: method,
                body: method !== 'GET' ? JSON.stringify(body) : null,
                headers: headers,
            });
    
            // Obtener y devolver los datos de la respuesta
            const data = await request.json();
    
            setLoading(false);

            return data;
        } catch (error) {
            throw Error("Error al obtener los datos, " + error);
        }
    }

    return {
        fetchData,
        loading
    }
}

export default useFetch;