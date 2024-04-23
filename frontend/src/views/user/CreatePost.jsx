import { StatusBar } from 'expo-status-bar'
import { Text, View, Image, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import { LoginStyle } from '../../styles/user/LoginStyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from "../../theme/index"
import { CreatePostStyle } from '../../styles/user/CreatePostStyle'
import { ArrowLeftIcon } from "react-native-heroicons/solid"
import { useNavigation } from '@react-navigation/native'
import { Global } from '../../utils/Global'
import useFetch from '../../hooks/useFetch'
import useForm from '../../hooks/useForm'
import React, { useState } from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store'

export default function CreatePost() {
    const { form, changed } = useForm({});
    const navigation = useNavigation();
    const [formData, setFormData] = useState(null);
    const { fetchData } = useFetch();

    const handleImagePick = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
            });

            if (!result.canceled) {
                const uri = result.assets[0].uri;

                const createFormData = (uri) => {
                    const formData = new FormData();
                    formData.append('profile_picture', {
                        uri,
                        name: 'publication.png',
                        type: 'image/jpeg'
                    });

                    return formData;
                }

                const newFormData = createFormData(uri);
                setFormData(newFormData); // Guardar formData en el estado
            }
        } catch (error) {
            console.log(error);
            notifyMessage("Error inesperado.");
        }
    }

    const handlePost = async () => {
        try {
            const data = await fetchData(Global.url + 'post/create', 'POST', form);

            if (data.status === "success") {
                // Verificar si se seleccionó una imagen
                if (formData) {
                    const token = await SecureStore.getItemAsync('token');
                    // Subir la imagen al servidor
                    const uploadResponse = await fetch(Global.url + 'post/upload/' + data.post._id, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                }

                setTimeout(() => {
                    navigation.navigate("Feed");
                }, 1000);
                ToastAndroid.showWithGravityAndOffset(
                    data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <SafeAreaView>
            <View style={CreatePostStyle.topContainer}>
                <View style={CreatePostStyle.backButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={40} color="black"></ArrowLeftIcon>
                    </TouchableOpacity>
                </View>
                <View style={CreatePostStyle.postButtonContainer}>
                    <TouchableOpacity style={CreatePostStyle.postButton}
                        onPress={() => {
                            handlePost()
                        }}>
                        <Text style={CreatePostStyle.postButtonText}> Publicar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={CreatePostStyle.contentContainer}>
                <View style={CreatePostStyle.profilePictureContainer}>
                    <Image
                        source={require("../../../assets/images/default_profile_picture.jpg")}
                        style={CreatePostStyle.imageProfile}
                    />
                </View>
                <View style={CreatePostStyle.textContainer}>
                    <TextInput
                        style={CreatePostStyle.postText}
                        placeholder="¿Qué tienes en mente?"
                        onChangeText={(content) => changed('content', content)}
                        multiline={true} />
                </View>
            </View>
            <View style={CreatePostStyle.cameraContainer}>
                <TouchableOpacity onPress={() => {
                    handleImagePick()
                }}>
                    <Icon name="image-outline"
                        size={35} />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}
