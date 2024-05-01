import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, ToastAndroid } from 'react-native';
import { LoginStyle } from '../../styles/user/LoginStyle';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from "react-native-heroicons/solid"
import { themeColors } from "../../theme/index"
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import { Global } from '../../utils/Global';

const Registro = () => {

    const { form, changed } = useForm({});
    const { fetchData, loading } = useFetch();

    const navigation = useNavigation();

    const handlerRegister = async () => {
        const newForm = form;

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
                user.message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
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
                        <Text style={{ color: themeColors.textGray, marginLeft: 10 }}>Nombre completo</Text>
                        <TextInput
                            style={LoginStyle.textInput}
                            onChangeText={nombreCompleto => changed('nombreCompleto', nombreCompleto)} />
                    </View>
                    <View style={{flexDirection:'row', justifyContent: 'space-between', gap: 20}}>
                        <View style={{flex: 1}}>
                            <Text style={{ color: themeColors.textGray, marginLeft: 10, marginTop: 10 }}>Nick</Text>
                            <TextInput
                                style={LoginStyle.textInput}
                                onChangeText={nick => changed('nick', nick)} />
                        </View>

                        <View style={{flex: 1}}>
                            <Text style={{ color: themeColors.textGray, marginLeft: 10, marginTop: 10 }}>Username</Text>
                            <TextInput
                                style={LoginStyle.textInput}
                                onChangeText={username => changed('username', username)} />
                        </View>
                    </View>
                    <View>
                        <Text style={{ color: themeColors.textGray, marginLeft: 10, marginTop: 10 }}>Email</Text>
                        <TextInput
                            style={LoginStyle.textInput}
                            onChangeText={email => changed('email', email)} />
                    </View>
                    <View>
                        <Text style={{ color: themeColors.textGray, marginLeft: 10, marginTop: 10 }}>Password</Text>
                        <TextInput
                            style={LoginStyle.textInput}
                            secureTextEntry
                            onChangeText={password => changed('password', password)} />
                    </View>
                    <TouchableOpacity style={LoginStyle.loginButton} onPress={() => { handlerRegister() }}>
                        <Text style={LoginStyle.loginButtonText}>Registrate</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Registro;
