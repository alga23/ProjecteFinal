import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Keyboard, ScrollView, Modal, TouchableWithoutFeedback, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import useAuth from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import { Circle } from 'react-native-progress';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import { Global} from '../../utils/Global';
import * as SecureStore from 'expo-secure-store';
import { CreatePostStyle } from '../../styles/user/CreatePostStyle';

const Posts = () => {
    const { auth, setAuth } = useAuth({});
    const { form, changed } = useForm({});
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const textInputRef = useRef(null);
    const navigate = useNavigation();
    const [image, setImage] = useState(null);
    const [charCount, setCharCount] = useState(0);
    const [circularColor, setCircularColor] = useState('#2196F3');
    const [circularSize, setCircularSize] = useState(27);
    const [exceededLimit, setExceededLimit] = useState(false);
    const [text, setText] = useState('');
    const [formChanged, setFormChanged] = useState(false);
    const [originalForm, setOriginalForm] = useState({ nick: auth.nick, bio: auth.bio });
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [changesMade, setChangesMade] = useState(false);
    const { fetchData } = useFetch({}); 

    useEffect(() => {
        textInputRef.current.focus();

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (event) => {
                setIsKeyboardOpen(true);
                setKeyboardHeight(event.endCoordinates.height - 140);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setIsKeyboardOpen(false);
                setKeyboardHeight(140);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        setOriginalForm({ nick: auth.nick, bio: auth.bio });
    }, [auth]);

    const handleTextChange = (text) => {

        setText(text);
        const count = Math.min(text.length);
        if (count >= 180 && count < 200) {
            // Si el número de caracteres es mayor o igual a 20, cambia el color y aumenta el tamaño del círculo
            setCircularColor('#FFD700'); // Cambia el color del círculo a amarillo
            setCircularSize(30); // Aumenta el tamaño del círculo a 30
            setExceededLimit(false);
        } else if (count >= 200 && count < 200) {
            setCircularColor('red');
            setExceededLimit(true);
        } else if (count >= 210) {
            setCircularColor('transparent')
        } else {
            // Si el número de caracteres es menor a 20, vuelve al color y tamaño predeterminados
            setCircularColor('#2196F3'); // Restablece el color del círculo
            setCircularSize(27); // Restablece el tamaño del círculo
        }
        setCharCount(count);
        changed('content', text);
    }

    const handleNavigate = (route) => {
        navigate.navigate(route);
    }

    const enviarPost = async () => {

        let newPost = form;

        const data = await fetchData(Global.url + "post/create", "POST", newPost);

        if (data.status == "success") {

            ToastAndroid.showWithGravityAndOffset(
                data.message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
            navigate.navigate('Feed');
            setText('');
            setImage(null);
            setCharCount(0);
        }

        if (data.status == "success" && data.post) {
            const publicationId = data.post._id;

            const formData = new FormData();

            formData.append('file0', {
                uri: image,
                name: 'publication.png',
                type: 'image/jpeg' 
            })
            

            const request = await fetch(Global.url + "post/upload/" + publicationId, {
                method: "POST",
                body: formData,
                headers: {
                    'Authorization': await SecureStore.getItemAsync('token')
                }
            });

            const uploadData = await request.json();

            if (uploadData.status == "success" && uploadData.post) {
                setAuth(data.post);
            }
        }
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

    const discardChangesAndGoBack = () => {
        setChangesMade(false);
        setConfirmModalVisible(false);
        handleNavigate('Feed');
        
        setText('');
        setImage(null);
        setCharCount(0);
    }

    const handleGoBack = () => {
        if (formChanged || image) {
            setConfirmModalVisible(true);
        } else {
            handleNavigate('Feed');
        }
    }
    const handleFormChange = (fieldName, value) => {
        setFormChanged(true);

        if (originalForm[fieldName] === value) {
            setFormChanged(false);
        }
    }

    return (
        <View style={CreatePostStyle.container}>
            <View style={CreatePostStyle.content}>
                <View style={CreatePostStyle.containerHeader}>
                    <TouchableOpacity onPress={() => handleGoBack()}>
                        <Icon name="x" size={25} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={enviarPost} disabled={charCount > 200}>
                        <Text style={[CreatePostStyle.addPublicar, charCount > 200 ? CreatePostStyle.disabledButton : null]}>Publicar</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={CreatePostStyle.scrollView}>
                    <View style={CreatePostStyle.containerPostear}>
                        <Image style={CreatePostStyle.fotoPerfil} source={{ uri: Global.url + 'user/avatar/' + auth.image }} />
                        <View style={CreatePostStyle.containerPostear2}>
                            <TextInput
                                ref={textInputRef}
                                style={CreatePostStyle.textInput}
                                multiline={true}
                                placeholder="¿Qué está pasando?"
                                onChangeText={(text) => { handleTextChange(text); handleFormChange('text', text) }}
                                textAlignVertical="top"
                                scrollEnabled={false}
                            >
                                <Text style={CreatePostStyle.textInsideLimit}>{text.slice(0, 200)}</Text>
                                <Text style={CreatePostStyle.textExceededLimit}>{text.slice(200)}</Text>
                            </TextInput>

                            {image && (
                                <View style={CreatePostStyle.containerImageSelect}>
                                    <Image style={CreatePostStyle.imageSelect} source={{ uri: image }} />
                                    <TouchableOpacity style={CreatePostStyle.containerClose} onPress={() => setImage(null)}>
                                        <Icon name='x' style={CreatePostStyle.iconClose} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={[CreatePostStyle.containerFooter, { bottom: isKeyboardOpen ? keyboardHeight : -140 }]}>
                <Icon name="globe" size={16} color="#2196F3" />
                <Text style={CreatePostStyle.text}>Cualquier persona puede responder</Text>

            </View>
            <View style={[CreatePostStyle.containerFooter2, { bottom: isKeyboardOpen ? keyboardHeight : -140 }]}>
                <View style={CreatePostStyle.iconsContainer}>
                    <TouchableOpacity style={CreatePostStyle.icon} onPress={openImagePicker}>
                        <Icon name="image" size={20} color="#2196F3" />
                    </TouchableOpacity>
                    <TouchableOpacity style={CreatePostStyle.icon}>
                        <Icon name="file-text" size={20} color="#2196F3" />
                    </TouchableOpacity>
                    <TouchableOpacity style={CreatePostStyle.icon}>
                        <Icon name="map-pin" size={20} color="#2196F3" />
                    </TouchableOpacity>
                </View>
                <View style={CreatePostStyle.circularContainer}>
                    <Circle
                        size={circularSize}
                        progress={charCount / 200}
                        borderWidth={0}
                        color={circularColor}
                        unfilledColor="#CDCDCD"
                        borderColor="#CDCDCD"
                        style={CreatePostStyle.circularProgress}
                    >
                        <Text style={[CreatePostStyle.circularText, charCount >= 210 ? CreatePostStyle.redText : null]}>
                            {charCount >= 180 && (200 - charCount)}
                        </Text>
                    </Circle>

                </View>
            </View>

            <Modal
                transparent={true}
                visible={confirmModalVisible}
                onRequestClose={() => setConfirmModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setConfirmModalVisible(false)}>
                    <View style={CreatePostStyle.modalView}>
                        <View style={CreatePostStyle.modalContent}>
                            <Text style={CreatePostStyle.textEditar}>Post</Text>
                            <Text>¿Quieres descartar los cambios?</Text>
                            <View style={CreatePostStyle.confirmationButtonsContainer}>
                                <TouchableOpacity onPress={() => setConfirmModalVisible(false)}>
                                    <Text style={CreatePostStyle.confirmationButton}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => discardChangesAndGoBack()}>
                                    <Text style={CreatePostStyle.confirmationButton}>Descartar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default Posts;
