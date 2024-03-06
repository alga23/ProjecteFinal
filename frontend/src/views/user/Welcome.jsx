import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { WelcomeStyle } from '../../styles/user/WelcomeStyle'

export default function Welcome() {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={WelcomeStyle.container}>
            <StatusBar style="auto" />
            <View style={WelcomeStyle.contentContainer}>
                <Text style={WelcomeStyle.title}>¡Bienvenido!</Text>
                <View style={WelcomeStyle.imageContainer}>
                    <Image
                        source={require("../../../assets/images/welcome.png")}
                        style={WelcomeStyle.image}
                    />
                </View>
                <View style={WelcomeStyle.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('SignUp')
                        }}
                        style={WelcomeStyle.signUpButton}>
                        <Text style={WelcomeStyle.signUpButtonText}>Regístrate</Text>
                    </TouchableOpacity>
                    <View style={WelcomeStyle.alreadyHaveAccount}>
                        <Text style={WelcomeStyle.alreadyHaveAccountText}>Tienes una cuenta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={WelcomeStyle.logInButton}> Inicia sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
