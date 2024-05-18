import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MensajeStyle } from '../../styles/post/MensajeStyle';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import useFetch from '../../hooks/useFetch';
import { Global } from '../../utils/Global';
import moment from 'moment';
import 'moment/locale/es';

const Mensajes = () => {
    const { t, i18n } = useTranslation();
    const { fetchData } = useFetch({});
    const [lastMessages, setLastMessages] = useState([]);

    useFocusEffect(
        useCallback(() => {
            getChatUsers();
        }, [])
    );

    const getChatUsers = async () => {
        try {
            const result = await fetchData(Global.url + "message/last-messages", "GET");
            setLastMessages(result.lastMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }

    const formatTimeAgo = (date) => {
        const now = moment();
        const duration = moment.duration(now.diff(date));
        const seconds = duration.asSeconds();
        const minutes = duration.asMinutes();
        const hours = duration.asHours();
        const days = duration.asDays();

        if (seconds < 60) {
            return `${Math.floor(seconds)}s`;
        } else if (minutes < 60) {
            return `${Math.floor(minutes)}min`;
        } else if (hours < 24) {
            return `${Math.floor(hours)}h`;
        } else {
            return `${Math.floor(days)}d`;
        }
    };

    const navigation = useNavigation();

    return (
        <View style={MensajeStyle.containerPrincipal}>
            <Header />
            <ScrollView>
                {lastMessages.length === 0 ? (
                    <View style={MensajeStyle.container}>
                        <View>
                            <Text style={MensajeStyle.textoBandeja}>{t("bandejaDeEntrada")}</Text>
                        </View>
                        <View style={MensajeStyle.containerSecundario}>
                            <Text style={MensajeStyle.textoSecundario}>{t("noTienesNingunMensaje")}</Text>
                        </View>
                        <View style={MensajeStyle.botonContainer}>
                            <TouchableOpacity style={MensajeStyle.botonStyle} onPress={() => navigation.navigate('Bandeja_mensaje')}>
                                <Text style={MensajeStyle.botonTexto}>{t("escribeUnMensaje")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    lastMessages.map((message, index) => (
                        <View key={index} style={MensajeStyle.contenedorMessage}>
                            <View style={MensajeStyle.imageContainer}>
                                {message.usuarioReceptor.imagen && (
                                    <Image
                                        source={{ uri: message.usuarioReceptor.imagen === "default.png" ? Global.url_default : message.usuarioReceptor.imagen }}
                                        style={MensajeStyle.imagen}
                                    />
                                )}
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('Chat', {id: message.usuarioReceptor._id})}>
                            <View style={MensajeStyle.infoUser}>
                                <View style={MensajeStyle.nameContainer}>
                                    <Text style={MensajeStyle.nickText}>{message.usuarioReceptor.nick}</Text>
                                    <Text style={MensajeStyle.usernameText}>@{message.usuarioReceptor.username}</Text>
                                    <Text style={MensajeStyle.createdAtText}> · {formatTimeAgo(moment(message.created_at))}</Text>
                                </View>
                                <Text style={MensajeStyle.contenidoText}>{message.contenido}</Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>
            <BottomMenu />
        </View>
    );
};

export default Mensajes;
