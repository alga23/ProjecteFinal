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
import { useTranslation } from 'react-i18next';
import i18n from '../../languages/i18n';
import useAuth from '../../hooks/useAuth'

export default function Login() {

    const navigation = useNavigation();
    const { form, changed } = useForm({});
    const { fetchData } = useFetch();
    const { authUser } = useAuth({});

    const { t, i18n } = useTranslation();

    const handleLogin = async () => {
        const newForm = form;

        const data = await fetchData(Global.url + 'user/login', 'POST', newForm);

        if (data.status === "success") {

            await SecureStore.setItemAsync('token', data.token);
            await SecureStore.setItemAsync('user', data.user.id);

            await authUser();
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
                    <Text style={{ color: themeColors.textGray, marginLeft: 10 }}>{t('email')}</Text>
                    <TextInput
                        style={LoginStyle.textInput}
                        placeholder={t('escribeTuEmailAqui')}
                        onChangeText={(email) => changed('email', email)} />
                </View>
                <View style={LoginStyle.passwordContainer}>
                    <Text style={{ color: themeColors.textGray, marginLeft: 10 }}>{t('contraseña')}</Text>
                    <TextInput
                        style={LoginStyle.textInput}
                        secureTextEntry
                        placeholder={t('escribeTuContraseñaAqui')}
                        onChangeText={(password) => changed('password', password)} />
                </View>
                <TouchableOpacity style={{ alignItems: "flex-end" }}>
                    <Text style={LoginStyle.forgotPasswordText}>{t('recordarContraseña?')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={LoginStyle.loginButton}
                    onPress={() => {
                        handleLogin()
                    }}>
                    <Text style={LoginStyle.loginButtonText}
                    >{t('login')}</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 10, fontSize: 20, color: themeColors.textGray, fontWeight: 'bold', textAlign: 'center', paddingVertical: 5 }}>{t('o')}</Text>
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
                    <Text style={LoginStyle.dontHaveAnAccountText}>{t('noTienesCuenta?')}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={LoginStyle.signUpButton}> {t('registrate')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

