import { Text, TouchableOpacity, View, TextInput, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFeather from "react-native-vector-icons/Feather";

import { ChatStyle } from '../../styles/chat/Chat';
import { Image } from "react-native";
import { Global } from "../../utils/Global";
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';
import io from 'socket.io-client';
import { useEffect, useState } from "react";

const socket = io('http://localhost:3001');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        })

        return () => {
            socket.off('message');
        }
    }, []);

    const enviarMensaje = () => {

        console.log(messageInput);
        socket.emit('message', { text: messageInput });
        setMessageInput('');
    }

    const navigation = useNavigation();

    return (
        <View style={ChatStyle.container}>
            <View style={ChatStyle.headerChat}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="long-arrow-left" size={22} />
                </TouchableOpacity>
                <View style={ChatStyle.containerUser}>
                    <Image source={{ uri: Global.url_default }} style={ChatStyle.imagenPerfil} />
                    <Text>Pablo51</Text>
                </View> 
            </View>
            <View style={ChatStyle.borderLine}></View>

            <ScrollView>
                <View style={ChatStyle.messageUser}>
                    <Text>Que tal artista?</Text>
                    <Text>{moment().format('d:mm:a')}</Text>
                </View>
            </ScrollView>
            <View style={ChatStyle.containerInput}>
                <IconFeather style={ChatStyle.cameraIcon} name="image" size={30} />
                <TextInput onChangeText={(message) => setMessageInput(message)} style={ChatStyle.inputMensajes} placeholder="Mensaje" />
                <TouchableOpacity style={ChatStyle.enterMessage} onPress={() => enviarMensaje()}>
                    <Icon name="arrow-right" color="#0074B4" size={30} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Chat;