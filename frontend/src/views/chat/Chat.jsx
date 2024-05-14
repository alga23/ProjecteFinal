import { Text, TouchableOpacity, View, TextInput, ScrollView, Modal, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFeather from "react-native-vector-icons/Feather";

import { ChatStyle } from '../../styles/chat/Chat';
import { Image } from "react-native";
import { Global } from "../../utils/Global";
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';
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
    const [image, setImage] = useState(null);
    const { fetchData } = useFetch({});
    const [userProfile, setUserProfile] = useState({});
    const navigation = useNavigation();

    const socket = useRef(null);
    const scrollViewRef = useRef();

    useEffect(() => {
        socket.current = io('http://192.168.1.130:3001');

        socket.current.emit('register', auth._id, id);
        socket.current.on('loadMessages', (loadedMessages) => {
            const filteredMessages = loadedMessages.filter(message => (
                message.usuarioEmisor === id || message.usuarioReceptor === id
            ));

            setMessages(filteredMessages);
        });

        return () => {
            socket.current.off('loadMessages');
            socket.current.close();
        };
    }, [auth._id]);

    useEffect(() => {
        getProfile();

        socket.current.on('message', (message) => {
            console.log(message);
            setMessages(prevMessages => [...prevMessages, message]);
        });
        return () => {
            socket.current.off('message');
        };

    }, []);


    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: false });
    }, [messages]);

    const enviarMensaje = async () => {
        if (messageInput.trim() || image) {
            let messageData = {
                usuarioReceptor: id,
                usuarioEmisor: auth._id,
                contenido: messageInput,
                imagenUrl: null
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

            setMessages(prevMessages => [...prevMessages, { ...messageData }]);
        }
    };

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

    return (
        <View style={ChatStyle.container}>
            <View style={ChatStyle.headerChat}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="long-arrow-left" size={22} />
                </TouchableOpacity>
                <View style={ChatStyle.containerUser}>
                    {userProfile.imagen === "default.png" ? (
                        <Image source={{ uri: Global.url_default }} style={ChatStyle.imagenPerfil} />
                    ) : (
                        <Image source={{ uri: userProfile.imagen }} style={ChatStyle.imagenPerfil} />
                    )}
                    <Text>{userProfile.nick}</Text>
                </View>
            </View>
            <View style={ChatStyle.borderLine}></View>

            <ScrollView ref={scrollViewRef}>
                {messages.length > 0 && (
                    <View style={ChatStyle.containerInfo}>
                        <View style={ChatStyle.containerInfoImagen}>
                            <Image
                                source={{ uri: userProfile.imagen === "default.png" ? Global.url_default : userProfile.imagen }}
                                style={ChatStyle.imagenInfo}
                            />
                            <Text style={[ChatStyle.textInfo, ChatStyle.boldText]}>{userProfile.nick}</Text>
                            <Text style={ChatStyle.textInfo}>@{userProfile.username}</Text>
                            <Text style={ChatStyle.textInfo}>234K seguidores</Text>
                        </View>
                        <View style={ChatStyle.borderLineInfo}></View>
                        <Text style={ChatStyle.dateText}>{moment(messages[messages.length - 1].created_at).calendar(null, {
                            sameDay: '[Hoy]',
                            nextDay: '[Mañana]',
                            nextWeek: 'dddd',
                            lastDay: '[Ayer]',
                            lastWeek: '[Último] dddd',
                            sameElse: 'DD/MM/YYYY'
                        })}</Text>
                    </View>
                )}

                {messages.map((mensaje, index) => (
                    <TouchableOpacity
                        key={index}
                        onLongPress={() => { mensaje.usuarioEmisor === auth._id && handleLongPress(mensaje) }}
                        style={[
                            mensaje.contenido ? (
                                mensaje.usuarioEmisor === auth._id ? ChatStyle.myMessage : ChatStyle.theirMessage
                            ) : null
                        ]}
                    >
                        {mensaje.imagenUrl ? (
                            <Image source={{ uri: mensaje.imagenUrl }} style={ChatStyle.imagenMensaje} />
                        ) : (
                            <View style={ChatStyle.messageUser}>
                                <Text style={mensaje.usuarioEmisor === auth._id ? ChatStyle.contenidoChat : ChatStyle.otherUserTextoChat}>
                                    {mensaje.contenido}
                                </Text>
                                <Text style={ChatStyle.fechaChat}>{moment(mensaje.created_at).format('HH:MM')}</Text>
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