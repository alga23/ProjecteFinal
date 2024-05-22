import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, TextInput, Image, ToastAndroid, Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import useAuth from "../../hooks/useAuth";
import { Global } from "../../utils/Global";
import useFetch from "../../hooks/useFetch";
import { useNavigation } from "@react-navigation/native";
import useForm from "../../hooks/useForm";
import { EditProfileStyle } from "../../styles/user/EditProfileStyle";
import * as SecureStore from 'expo-secure-store';
import { themeColors } from "../../theme";

export default function EditProfile() {
    const { auth, setAuth } = useAuth({});
    const { form, changed } = useForm({});
    const { t, i18n } = useTranslation();
    const { fetchData } = useFetch({});
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);

    const editProfile = async () => {
        const newForm = form;

        const result = await fetchData(Global.url + 'user/editUser', 'PUT', newForm);

        if (result.status === 'success') {
            ToastAndroid.showWithGravityAndOffset(
                result.message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
            setAuth(result.user);
            navigation.navigate('Profile', { profileId: auth._id });
        }

        if(result.status === 'success' && image) {

            const formData = new FormData();

            formData.append('file0', {
                uri: image,
                name: 'avatar.png',
                type: 'image/jpeg'
            })

            const request = await fetch(Global.url + 'user/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': await SecureStore.getItemAsync('token')
                }
            })

            const uploadData = await request.json();

            if (uploadData.status === 'success' && uploadData.user) {
                setAuth(uploadData.user);
            }
        }
    };

    const handleImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const source = { uri: result.assets[0].uri };
            changed('imagen', source.uri);
            setImage(result.assets[0].uri);
            setModalVisible(false);
        }
    };

    const handleCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera is required!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const source = { uri: result.assets[0].uri };
            changed('imagen', source.uri);
            setImage(result.assets[0].uri);
            setModalVisible(false);
        }
    };

    return (
        <SafeAreaView>
            <View style={EditProfileStyle.topContainer}>
                <View style={EditProfileStyle.topLeftPart}>
                    <TouchableOpacity
                        style={EditProfileStyle.arrowButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="arrow-left" size={30} />
                    </TouchableOpacity>
                    <Text style={EditProfileStyle.editText}>{t("editarPerfil")}</Text>
                </View>
                <TouchableOpacity onPress={editProfile}>
                    <Text style={EditProfileStyle.guardarText}>{t("guardar")}</Text>
                </TouchableOpacity>
            </View>
            <View style={EditProfileStyle.mainContentContainer}>
                <View style={EditProfileStyle.imageContainer}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        {image ? (
                            <Image source={{uri: image}} style={EditProfileStyle.imageProfile}/>
                        ) : (
                            <Image
                            source={{ uri: auth.imagen === 'default.png' ? Global.url_default : auth.imagen }}
                            style={EditProfileStyle.imageProfile} />
                        )}
                    </TouchableOpacity>
                </View>
                <View style={EditProfileStyle.inputContainer}>
                    <Text style={EditProfileStyle.textOutsideInput}>{t("nombreCompleto")}</Text>
                    <TextInput
                        style={EditProfileStyle.textInput}
                        defaultValue={auth.nombreCompleto}
                        placeholder="Escribe tu nuevo nombre completo"
                        placeholderTextColor={themeColors.postBorderLight}
                        onChangeText={(nombreCompleto) => changed('nombreCompleto', nombreCompleto)}
                    />
                </View>
                <View style={EditProfileStyle.inputContainer}>
                    <Text style={EditProfileStyle.textOutsideInput}>{t("nick")}</Text>
                    <TextInput
                        style={EditProfileStyle.textInput}
                        defaultValue={auth.nick}
                        placeholder="Escribe tu nuevo nick"
                        placeholderTextColor={themeColors.postBorderLight}
                        onChangeText={(nick) => changed('nick', nick)}
                    />
                </View>
                <View style={EditProfileStyle.inputContainer}>
                    <Text style={EditProfileStyle.textOutsideInput}>{t("email")}</Text>
                    <TextInput
                        style={EditProfileStyle.textInput}
                        defaultValue={auth.email}
                        placeholder="Escribe tu nuevo email"
                        placeholderTextColor={themeColors.postBorderLight}
                        onChangeText={(email) => changed('email', email)}
                    />
                </View>
                <View style={EditProfileStyle.inputContainer}>
                    <Text style={EditProfileStyle.textOutsideInput}>Contraseña</Text>
                    <TextInput
                        style={EditProfileStyle.textInput}
                        defaultValue={auth.password}
                        placeholder={t("escribeTuNuevaContraseña")}
                        placeholderTextColor={themeColors.postBorderLight}
                        onChangeText={(password) => changed('password', password)}
                        secureTextEntry
                    />
                </View>
                <View style={EditProfileStyle.inputContainer}>
                    <Text style={EditProfileStyle.textOutsideInput}>{t("biografia")}</Text>
                    <TextInput
                        style={[EditProfileStyle.textInput, EditProfileStyle.textInputBiografia]}
                        defaultValue={auth.biografia}
                        placeholder={t("escribeTuNuevaBiografia")}
                        placeholderTextColor={themeColors.postBorderLight}
                        onChangeText={(biografia) => changed('biografia', biografia)}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={EditProfileStyle.modalBackground}>
                        <View style={EditProfileStyle.modalContainer}>
                            <TouchableOpacity style={EditProfileStyle.modalButton} onPress={handleCamera}>
                                <Text style={EditProfileStyle.modalButtonText}>Tomar foto</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={EditProfileStyle.modalButton} onPress={handleImagePicker}>
                                <Text style={EditProfileStyle.modalButtonText}>Subir foto existente</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    );
}

