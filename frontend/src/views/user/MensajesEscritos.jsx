import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import useFetch from '../../hooks/useFetch';
import { Global } from '../../utils/Global';
import { MensajeStyle } from '../../styles/post/MensajeStyle';
import Cristiano from '../../../assets/images/cristiano.png';

const MensajesEscritos = () => {
    const { fetchData } = useFetch({});
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [more, setMore] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getUsers(1);
    }, []);

    const getUsers = useCallback(async (nextPage) => {
        try {
            setLoading(true);
            const response = await fetchData(`${Global.url}user/allUsers?page=${nextPage}`, 'GET');
            if (response.status === 'success') {
                const newUsers = nextPage === 1 ? response.users : [...users, ...response.users];
                setUsers(newUsers);
                setMore(newUsers.length < response.total);
            } else {
                throw new Error('Error al obtener los usuarios');
            }
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
        } finally {
            setLoading(false);
        }
    }, [fetchData, users]);

    const handleScroll = useCallback(({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        if (isCloseToBottom && more && !loading) {
            nextPage();
        }
    }, [more, loading, nextPage]);

    const nextPage = useCallback(() => {
        if (more && !loading) {
            setPage(prevPage => prevPage + 1);
        }
    }, [more, loading]);

    useEffect(() => {
        if (page > 1) {
            getUsers(page);
        }
    }, [page, getUsers]);

    return (
        <View style={MensajeStyle.ContainerPrincipal}>
            <View style={MensajeStyle.containerConMensajes}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon style={MensajeStyle.arrowContainer} name="arrow-left" size={30}></Icon>
                </TouchableOpacity>
                <Text style={MensajeStyle.textoTusMensajes}>Tus mensajes</Text>
            </View>
            <View style={MensajeStyle.line}></View>
            <View style={MensajeStyle.search}>
                <Icon style={MensajeStyle.arrowContainer} name="search" size={25}></Icon>
                <TextInput style={MensajeStyle.inputSearch} placeholder="Buscar usuarios"></TextInput>
            </View>
            <View style={MensajeStyle.line}></View>
            <ScrollView
                style={MensajeStyle.scrollViewContainer}
                onScroll={({ nativeEvent }) => handleScroll({ nativeEvent })}
                scrollEventThrottle={400}
                showsVerticalScrollIndicator={false}
            >
                {users.map((user, index) => (
                    <TouchableOpacity key={index} style={MensajeStyle.containerCardMessage}>
                        <View style={MensajeStyle.containerUser}>
                            <TouchableOpacity onPress={() => navigation.navigate("Profile", { profileId: user._id })}>
                                <Image source={Cristiano} style={MensajeStyle.fotoUsuario} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("Chat", {id: user._id})}>
                            <View style={MensajeStyle.infoUsuario}>
                                <Text style={MensajeStyle.textName}>{user.nick}</Text>
                                <Text style={MensajeStyle.textUserName}>@{user.username}</Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
                {loading && <ActivityIndicator size="large" color="#0000ff" style={MensajeStyle.loader} />}
                {!loading && !more && users.length > 0 && (
                    <Text style={MensajeStyle.endText}>No hay más usuarios para cargar</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default MensajesEscritos;
