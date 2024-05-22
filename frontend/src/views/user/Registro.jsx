import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, ToastAndroid } from 'react-native';
import { LoginStyle } from '../../styles/user/LoginStyle';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from "react-native-heroicons/solid"
import { themeColors } from "../../theme/index"
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import { Global } from '../../utils/Global';
import { useTranslation } from 'react-i18next';
import i18n from '../../languages/i18n';


const Registro = () => {

    const { form, changed } = useForm({});
    const { fetchData, loading } = useFetch();

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const handlerRegister = async () => {
        const newForm = form;

        try {
            const user = await fetchData(Global.url + "user/registro", "POST", newForm);

            if (user.status === "success") {
                navigation.navigate("Login");
                ToastAndroid.showWithGravityAndOffset(
                    user.message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    user.error,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            }
        } catch {
            console.log("Error")
        }

    }

    return (
        <SafeAreaView style={LoginStyle.container}>
            <StatusBar style="auto" />
            <View style={LoginStyle.arrowButtonContainer}>
                <TouchableOpacity
                    style={LoginStyle.arrowButton}
                    onPress={() => navigation.goBack()}>
                    <ArrowLeftIcon size={20} color="black"></ArrowLeftIcon>
                </TouchableOpacity>
            </View>
            <View style={LoginStyle.imageContainer}>
                <Image
                    source={require("../../../assets/images/signup.png")}
                    style={LoginStyle.image}
                />
            </View>
            <View style={LoginStyle.fieldsContainer}>
                <ScrollView>
                    <View >
                        <Text style={{ color: themeColors.textGray, marginLeft: 10 }}>{t('nombreCompleto')}</Text>
                        <TextInput
                            style={LoginStyle.textInput}
                            onChangeText={nombreCompleto => changed('nombreCompleto', nombreCompleto)} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: themeColors.textGray, marginLeft: 10, marginTop: 10 }}>{t('nick')}</Text>
                            <TextInput
                                style={LoginStyle.textInput}
                                onChangeText={nick => changed('nick', nick)} />
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={{ color: themeColors.textGray, marginLeft: 10, marginTop: 10 }}>{t('username')}</Text>
                            <TextInput
                                style={LoginStyle.textInput}
                                onChangeText={username => changed('username', username)} />
                        </View>
                    </View>
                    <View>
                        <Text style={{ color: themeColors.textGray, marginLeft: 10, marginTop: 10 }}>{t('email')}</Text>
                        <TextInput
                            style={LoginStyle.textInput}
                            onChangeText={email => changed('email', email)} />
                    </View>
                    <View>
                        <Text style={{ color: themeColors.textGray, marginLeft: 10, marginTop: 10 }}>{t('contraseña')}</Text>
                        <TextInput
                            style={LoginStyle.textInput}
                            secureTextEntry
                            onChangeText={password => changed('password', password)} />
                    </View>
                    <TouchableOpacity style={LoginStyle.loginButton} onPress={() => { handlerRegister() }}>
                        <Text style={LoginStyle.loginButtonText}>{t('registrate')}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Registro;
