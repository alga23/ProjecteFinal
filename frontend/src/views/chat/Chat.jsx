import { Text, TouchableOpacity, View, TextInput, ScrollView, Modal, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFeather from "react-native-vector-icons/Feather";
import { Image } from "react-native";
import { ChatStyle } from '../../styles/chat/Chat';
import { Global } from "../../utils/Global";
import { useNavigation } from "@react-navigation/native";

import moment from 'moment-timezone';
import io from 'socket.io-client';
import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import * as ImagePicker from 'expo-image-picker';

const Chat = ({ route }) => {
    const { id } = route.params;
    const { auth } = useAuth({});

    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [counterFollowers, setCounterFollowers] = useState("");
    const [image, setImage] = useState(null);
    const { fetchData } = useFetch({});
    const [userProfile, setUserProfile] = useState({});
    const [lastDisplayedDate, setLastDisplayedDate] = useState(null);
    const navigation = useNavigation();

    const socket = useRef(null);
    const scrollViewRef = useRef();

    useEffect(() => {
        getProfile();
        contadorFollowers();

        socket.current = io('http://192.168.60.7:3001');
        socket.current.emit('register', auth._id, id);
        socket.current.on('loadMessages', (loadedMessages) => {
            const filteredMessages = loadedMessages.filter(message => (
                message.usuarioEmisor === id || message.usuarioReceptor === id
            ));
            setMessages(filteredMessages);
        });

        socket.current.on('message', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
            scrollViewRef.current.scrollToEnd({ animated: false });
        });

        socket.current.on('messageDeleted', (messageId) => {
            setMessages(prevMessages => prevMessages.filter(msg => msg._id !== messageId));
        });

        return () => {
            socket.current.off('loadMessages');
            socket.current.off('message');
            socket.current.off('messageDeleted');
            socket.current.close();
        };
    }, [auth._id]);

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: false });
    }, [messages]);

    const enviarMensaje = async () => {
        if (messageInput.trim() || image) {
            let messageData = {
                usuarioReceptor: id,
                usuarioEmisor: auth._id,
                contenido: messageInput,
                imagenUrl: image,
            };

            if (messageInput.trim()) {
                messageData.contenido = messageInput;
            }

            if (image) {
                const response = await fetch(image);
                const blob = await response.blob();
                messageData.imagen = blob;
            }

            socket.current.emit('message', messageData);
            setMessageInput('');
            setImage(null);

            scrollViewRef.current.scrollToEnd({ animated: false });
            updateLastDisplayedDate();
        }
    };

    const contadorFollowers = async () => {
        const result = await fetchData(Global.url + `user/${id}/contador`, 'GET');
        setCounterFollowers(result.followers);
    }

    const getProfile = async () => {
        const result = await fetchData(Global.url + 'user/profile/' + id, 'GET');

        if (result.status === "success") {
            setUserProfile(result.user);
        }
    }

    const handleLongPress = (message) => {
        setSelectedMessage(message);
        setModalVisible(true);
    };

    const deleteMessage = (message) => {
        console.log(message);
        socket.current.emit('deleteMessage', message);
    }

    const openImagePicker = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            // Manejar la negación de permisos
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (!pickerResult.cancelled) {
            setImage(pickerResult.assets[0].uri);
        }
    };

    const closeImagePreview = () => {
        setImage(null);
    }

    const getUserTimeZone = () => {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    };

    const updateLastDisplayedDate = () => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage) {
            const lastMessageDate = moment(lastMessage.created_at).startOf('day');
            const currentDate = moment().startOf('day');
            if (currentDate.diff(lastMessageDate, 'days') === 0) {
                setLastDisplayedDate('Hoy');
            } else if (currentDate.diff(lastMessageDate, 'days') === 1) {
                setLastDisplayedDate('Ayer');
            } else {
                setLastDisplayedDate(moment(lastMessage.created_at).format('DD/MM/YYYY'));
            }
        }
    };

    return (
        <View style={ChatStyle.container}>
            <View style={ChatStyle.headerChat}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="long-arrow-left" size={22} />
                </TouchableOpacity>
                <View style={ChatStyle.containerUser}>
                    <TouchableOpacity onPress={() => navigation.navigate("Profile", { profileId: id })}>
                        <Image source={{ uri: userProfile.imagen === "default.png" ? Global.url_default : userProfile.imagen }} style={ChatStyle.imagenPerfil} />
                    </TouchableOpacity>
                    <Text>{userProfile.nick}</Text>
                </View>
            </View>
            <View style={ChatStyle.borderLine}></View>

            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={ChatStyle.scrollViewContent}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {messages.length > 0 && (
                    <View style={ChatStyle.containerInfo}>
                        <View style={ChatStyle.containerInfoImagen}>
                            <TouchableOpacity onPress={() => navigation.navigate("Profile", {profileId: id})}>
                            <Image
                                source={{ uri: userProfile.imagen === "default.png" ? Global.url_default : userProfile.imagen }}
                                style={ChatStyle.imagenInfo}
                            />
                            </TouchableOpacity>
                            <Text style={[ChatStyle.textInfo, ChatStyle.boldText]}>{userProfile.nick}</Text>
                            <Text style={ChatStyle.textInfo}>@{userProfile.username}</Text>
                            <Text style={ChatStyle.textInfo}>{counterFollowers} seguidores</Text>
                        </View>
                        <View style={ChatStyle.borderLineInfo}></View>
                        <Text style={ChatStyle.dateText}>{lastDisplayedDate}</Text>
                    </View>
                )}

                {messages.map((mensaje, index) => (
                    <TouchableOpacity
                        key={index}
                        onLongPress={() => { mensaje.usuarioEmisor === auth._id && handleLongPress(mensaje) }}
                    >
                        <View style={[
                            mensaje.contenido ? (
                                mensaje.usuarioEmisor === auth._id ? ChatStyle.myMessage : ChatStyle.theirMessage
                            ) : null
                        ]}>
                            <View style={ChatStyle.messageUser}>
                                <Text style={mensaje.usuarioEmisor === auth._id ? ChatStyle.contenidoChat : ChatStyle.otherUserTextoChat}>
                                    {mensaje.contenido}
                                </Text>
                                {mensaje.contenido && (
                                    <Text style={ChatStyle.fechaChat}>
                                        {moment(mensaje.created_at).tz(getUserTimeZone()).format('HH:mm')}
                                    </Text>
                                )}
                            </View>
                        </View>
                        {mensaje.imagenUrl && (
                            <View style={ChatStyle.imagenUrlContainer}>
                                <Image source={{ uri: mensaje.imagenUrl }} style={[ChatStyle.imagenMensaje, mensaje.usuarioEmisor === auth._id ? ChatStyle.myImagen : ChatStyle.otherImagenMensaje]} />
                                <View style={ChatStyle.fechaChatImagen}>
                                    {mensaje.imagenUrl && <Text style={ChatStyle.textFechaChat}>{moment(mensaje.created_at).format('HH:MM')}</Text>}
                                </View>
                            </View>
                        )}

                    </TouchableOpacity>
                ))}

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("El modal ha sido cerrado.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <TouchableOpacity
                        style={ChatStyle.centeredView}
                        activeOpacity={1}
                        onPressOut={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={ChatStyle.modalView} onStartShouldSetResponder={() => true}>
                            <Text style={ChatStyle.modalText}>¿Quieres eliminar el mensaje?</Text>
                            <Text style={ChatStyle.descriptionText}>Esta acción no se puede deshacer.</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                                <TouchableOpacity
                                    style={[ChatStyle.button, ChatStyle.buttonCancel]}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                    }}
                                >
                                    <Text style={ChatStyle.textStyle}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[ChatStyle.button, ChatStyle.buttonClose]}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                        deleteMessage(selectedMessage);
                                    }}
                                >
                                    <Text style={ChatStyle.textStyle}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </ScrollView>
            {image && (
                <View style={ChatStyle.previewImagenContainer}>
                    <Image source={{ uri: image }} style={ChatStyle.previewImagen} />
                    <View style={ChatStyle.containerClosePreviewImagen}>
                        <TouchableOpacity onPress={closeImagePreview}>
                            <IconFeather name="x" size={20} style={ChatStyle.closePreviewImagen} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            <View style={ChatStyle.containerInput}>
                <View style={ChatStyle.messageImage}>
                    <TouchableOpacity onPress={() => openImagePicker()}>
                        <IconFeather name="image" size={30} style={ChatStyle.imageIcon} />
                    </TouchableOpacity>
                    <TextInput onChangeText={(message) => setMessageInput(message)} value={messageInput} style={ChatStyle.inputMensajes} placeholder="Escribir un mensaje" />
                </View>
                <TouchableOpacity style={ChatStyle.sendButton} onPress={() => enviarMensaje()}>
                    <Icon name="arrow-right" size={30} style={ChatStyle.sendButtonText} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Chat;
