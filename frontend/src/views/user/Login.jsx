import { StatusBar } from 'expo-status-bar'
import { Text, View, Image, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import { LoginStyle } from '../../styles/user/LoginStyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from "react-native-heroicons/solid"
import { themeColors } from "../../theme/index"
import { useNavigation } from '@react-navigation/native'
import useForm from '../../hooks/useForm'
import { Global } from '../../utils/Global'
import useFetch from '../../hooks/useFetch'
import * as SecureStore from 'expo-secure-store';

export default function Login() {

    const navigation = useNavigation();
    const { form, changed } = useForm({});
    const { fetchData } = useFetch();

    const handleLogin = async () => {
        const newForm = form;

        const data = await fetchData(Global.url + 'user/login', 'POST', newForm);

        if (data.status === "success") {

            await SecureStore.setItemAsync('token', data.token);  
            await SecureStore.setItemAsync('user', data.user.id);  

            setTimeout(async () => {
                navigation.navigate("Drawer");
            }, 1000);
        } else {
            ToastAndroid.showWithGravityAndOffset(
                data.message,
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
            <View style={LoginStyle.contentContainer}>
                <View style={LoginStyle.arrowButtonContainer}>
                    <TouchableOpacity
                        style={LoginStyle.arrowButton}
                        onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={30} color="black"></ArrowLeftIcon>
                    </TouchableOpacity>
                </View>
                <View style={LoginStyle.imageContainer}>
                    <Image
                        source={require("../../../assets/images/login.png")}
                        style={LoginStyle.image}
                    />
                </View>
            </View>
            <View style={LoginStyle.fieldsContainer}>
                <View style={LoginStyle.emailContainer}>
                    <Text style={{ color: themeColors.textGray, marginLeft: 10 }}>Email</Text>
                    <TextInput
                        style={LoginStyle.textInput}
                        placeholder="Escribe tu email aquí"
                        onChangeText={(email) => changed('email', email)} />
                </View>
                <View style={LoginStyle.passwordContainer}>
                    <Text style={{ color: themeColors.textGray, marginLeft: 10 }}>Contraseña</Text>
                    <TextInput
                        style={LoginStyle.textInput}
                        secureTextEntry
                        placeholder="Escribe tu contraseña aquí"
                        onChangeText={(password) => changed('password', password)} />
                </View>
                <TouchableOpacity style={{ alignItems: "flex-end" }}>
                    <Text style={LoginStyle.forgotPasswordText}>Recordar contraseña?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={LoginStyle.loginButton}
                    onPress={() => {
                        handleLogin()
                    }}>
                    <Text style={LoginStyle.loginButtonText}
                    >Login</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 10, fontSize: 20, color: themeColors.textGray, fontWeight: 'bold', textAlign: 'center', paddingVertical: 5 }}>O</Text>
                <View style={LoginStyle.brandIconsContainer}>
                    <TouchableOpacity style={LoginStyle.brandIconButton} >
                        <Image source={require('../../../assets/icons/brand_icons/google.png')}
                            style={LoginStyle.brandIconButtonImage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={LoginStyle.brandIconButton} >
                        <Image source={require('../../../assets/icons/brand_icons/apple.png')}
                            style={LoginStyle.brandIconButtonImage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={LoginStyle.brandIconButton} >
                        <Image source={require('../../../assets/icons/brand_icons/facebook.png')}
                            style={LoginStyle.brandIconButtonImage} />
                    </TouchableOpacity>
                </View>
                <View style={LoginStyle.dontHaveAnAccount}>
                    <Text style={LoginStyle.dontHaveAnAccountText}>No tienes cuenta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={LoginStyle.signUpButton}> Regístrate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

