import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView} from 'react-native';
import { LoginStyle } from '../../styles/user/LoginStyle';
import  {useNavigation} from '@react-navigation/native';
import { ArrowLeftIcon } from "react-native-heroicons/solid"
import { themeColors } from "../../theme/index"


const Registro = () => {

    const [name, setName] = useState('');
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const handlerRegister = () => {

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
                <View style={LoginStyle.emailContainer}>
                    <Text style={{ color: themeColors.textGray, marginLeft: 10 }}>Nombre completo</Text>
                    <TextInput
                        style={LoginStyle.textInput}
                        onChangeText={name => setName('name', name)} />
                </View>
                <View style={LoginStyle.passwordContainer}>
                    <Text style={{ color: themeColors.textGray, marginLeft: 10 }}>Nick</Text>
                    <TextInput
                        style={LoginStyle.textInput}
                        secureTextEntry
                        onChangeText={nick => setNick('nick', nick)} />
                </View>
                <View style={LoginStyle.passwordContainer}>
                    <Text style={{ color: themeColors.textGray, marginLeft: 10 }}>Email</Text>
                    <TextInput
                        style={LoginStyle.textInput}
                        secureTextEntry
                        onChangeText={email => setEmail('email', email)} />
                </View>
                <View style={LoginStyle.passwordContainer}>
                    <Text style={{ color: themeColors.textGray, marginLeft: 10 }}>Password</Text>
                    <TextInput
                        style={LoginStyle.textInput}
                        secureTextEntry
                        onChangeText={password => setPassword('password', password)} />
                </View>
                <TouchableOpacity style={LoginStyle.loginButton}
                    onPress={() => {
                        handlerRegister()
                    }}>
                    <Text style={LoginStyle.loginButtonText}
                    >Login</Text>
                </TouchableOpacity>
                </ScrollView>
                </View>
            </SafeAreaView>
    )
                }

export default Registro;
