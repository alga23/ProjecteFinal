import { StatusBar } from 'expo-status-bar'
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { loginStyles } from '../../styles/user/loginStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from "react-native-heroicons/solid"
import { themeColors } from "../../theme/index"

export default function Login() {

    return (
        <SafeAreaView style={loginStyles.container}>
            <StatusBar style="auto" />
            <View style={loginStyles.contentContainer}>
                <View style={loginStyles.arrowButtonContainer}>
                    <TouchableOpacity
                        style={loginStyles.arrowButton}
                        onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={20} color="black"></ArrowLeftIcon>
                    </TouchableOpacity>
                </View>
                <View style={loginStyles.imageContainer}>
                    <Image
                        source={require("../../../assets/images/login.png")}
                        style={loginStyles.image}
                    />
                </View>
            </View>
            <View style={loginStyles.fieldsContainer}>
                <View style={loginStyles.emailContainer}>
                    <Text style={{ color: themeColors.textGray, marginLeft: 10 }}>Email</Text>
                    <TextInput
                        style={loginStyles.textInput}
                        placeholder="Escribe tu email aquí"
                        onChangeText={(text) => setName(text)} />
                </View>
                <View style={loginStyles.passwordContainer}>
                    <Text style={{ color: themeColors.textGray, marginLeft: 10 }}>Contraseña</Text>
                    <TextInput
                        style={loginStyles.textInput}
                        secureTextEntry
                        placeholder="Escribe tu contraseña aquí"
                        onChangeText={(text) => setPassword(text)} />
                </View>
                <TouchableOpacity style={{ alignItems: "flex-end" }}>
                    <Text style={loginStyles.forgotPasswordText}>Recordar contraseña?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={loginStyles.loginButton}
                    onPress={() => {
                        handleLogin()
                    }}>
                    <Text style={loginStyles.loginButtonText}
                    >Login</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 10, fontSize: 20, color: themeColors.textGray, fontWeight: 'bold', textAlign: 'center', paddingVertical: 5 }}>O</Text>
                <View style={loginStyles.brandIconsContainer}>
                    <TouchableOpacity style={loginStyles.brandIconButton} >
                        <Image source={require('../../../assets/icons/brand_icons/google.png')}
                            style={loginStyles.brandIconButtonImage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={loginStyles.brandIconButton} >
                        <Image source={require('../../../assets/icons/brand_icons/apple.png')}
                            style={loginStyles.brandIconButtonImage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={loginStyles.brandIconButton} >
                        <Image source={require('../../../assets/icons/brand_icons/facebook.png')}
                            style={loginStyles.brandIconButtonImage} />
                    </TouchableOpacity>
                </View>
                <View style={loginStyles.dontHaveAnAccount}>
                    <Text style={loginStyles.dontHaveAnAccountText}>No tienes cuenta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={loginStyles.signUpButton}> Regístrate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

