import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useFetch from '../../hooks/useFetch';
import { Global } from '../../utils/Global';
import { MensajeStyle } from '../../styles/post/MensajeStyle';

const MensajesEscritos = () => {
    const { fetchData } = useFetch({});
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [more, setMore] = useState(true);
    const navigation = useNavigation();

    const getUsers = async (nextPage) => {
        setLoading(true);
        const response = await fetchData(Global.url + 'user/allUsers/' + nextPage, 'GET');

        if (response.status === 'success') {
            const newUsers = nextPage === 1 ? response.users : [...users, ...response.users];
            setUsers(newUsers);
            setLoading(false);
            setMore(newUsers.length < response.total);
            setPage(nextPage);
        } else {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {

            if (users.length === 0 || page === 1) {
                getUsers(page);
            }
        }, [page])
    );

    const nextPage = () => {
        if (more && !loading) {
            getUsers(page + 1);
        }
    };

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        if (isCloseToBottom && more && !loading) {
            nextPage();
        }
    };

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
            <ScrollView style={MensajeStyle.scrollViewContainer} onScroll={handleScroll} >
                {users.map(user => (
                    <View key={user._id} style={MensajeStyle.containerCardMessage}>
                        <View style={MensajeStyle.containerUser}>
                            <TouchableOpacity onPress={() => navigation.navigate("Profile", { profileId: user._id })}>
                                <Image source={{uri: user.imagen === 'default.png' ? Global.url_default : user.imagen}} style={MensajeStyle.fotoUsuario} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("Chat", { id: user._id })}>
                                <View style={MensajeStyle.infoUsuario}>
                                    <Text style={MensajeStyle.textName}>{user.nick}</Text>
                                    <Text style={MensajeStyle.textUserName}>@{user.username}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
                {loading && <ActivityIndicator size={40} color='#0074B4' style={{ marginTop: 20 }} />}
            </ScrollView>
        </View>
    );
};

export default MensajesEscritos;
