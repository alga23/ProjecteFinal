import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, StyleSheet, Animated, ActivityIndicator } from 'react-native';
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
    const { t } = useTranslation();
    const { fetchData } = useFetch({});
    const [lastMessages, setLastMessages] = useState([]);
    const [fadeAnim] = useState(new Animated.Value(1));
    const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
    const navigation = useNavigation();

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
        } finally {
            setIsLoading(false); // Una vez que los datos se han cargado, cambiamos isLoading a false
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

    const handleDeleteChat = async (userId1, userId2) => {
        Alert.alert(
            "Eliminar Chat",
            "¿Estás seguro de que deseas eliminar este chat? Esta acción no se puede deshacer.",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: async () => {
                        try {
                            const response = await fetchData(Global.url + `message/chat/${userId1}/${userId2}`, 'DELETE');
                            if (response && response.status === 'success') {
                                getChatUsers();
                            } else {
                                console.error('Error deleting chat:', response ? response.message : 'No response');
                                Alert.alert('Error', 'No se pudo eliminar el chat');
                            }
                        } catch (error) {
                            console.error('Error deleting chat:', error);
                            Alert.alert('Error', 'No se pudo eliminar el chat');
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <View style={MensajeStyle.containerPrincipal}>
            <Header />
            <ScrollView>
                {isLoading ? ( // Mostrar el indicador de carga mientras isLoading es true
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : (
                    lastMessages.length === 0 ? (
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
                            <Animated.View key={index} style={[MensajeStyle.contenedorMessage, { opacity: fadeAnim }]}>
                                <TouchableOpacity onPress={() => navigation.navigate('Profile', {profileId: message.usuarioReceptor._id})}>
                                    <View style={MensajeStyle.imageContainer}>
                                        {message.usuarioReceptor.imagen && (
                                            <Image
                                                source={{ uri: message.usuarioReceptor.imagen === "default.png" ? Global.url_default : message.usuarioReceptor.imagen }}
                                                style={MensajeStyle.imagen}
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Chat', {id: message.usuarioReceptor._id})}>
                                    <View style={MensajeStyle.infoUser}>
                                        <View style={MensajeStyle.nameContainer}>
                                            <Text style={MensajeStyle.nickText}>{message.usuarioReceptor.nick}</Text>
                                            <Text style={MensajeStyle.usernameText}>@{message.usuarioReceptor.username}</Text>
                                            <Text style={MensajeStyle.createdAtText}> · {formatTimeAgo(moment(message.created_at))}</Text>
                                        </View>
                                        {message.contenido && (<Text style={MensajeStyle.contenidoText}>{message.contenido}</Text>)}
                                        {message.imagenUrl && (<Text style={MensajeStyle.contenidoText}>Imagen...</Text>)}
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={MensajeStyle.deleteContainer}
                                    onPress={() => handleDeleteChat(message.usuarioEmisor._id, message.usuarioReceptor._id)}
                                >
                                    <Text style={MensajeStyle.deleteText}>❌</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        ))
                    )
                )}
            </ScrollView>
            <BottomMenu />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default Mensajes;
