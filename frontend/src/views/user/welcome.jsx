import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { welcomeStyles } from '../../styles/user/welcomeStyles'

export default function Welcome() {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={welcomeStyles.container}>
            <StatusBar style="auto" />
            <View style={welcomeStyles.contentContainer}>
                <Text style={welcomeStyles.title}>¡Bienvenido!</Text>
                <View style={welcomeStyles.imageContainer}>
                    <Image
                        source={require("../../../assets/images/welcome.png")}
                        style={welcomeStyles.image}
                    />
                </View>
                <View style={welcomeStyles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('SignUp')
                        }}
                        style={welcomeStyles.signUpButton}>
                        <Text style={welcomeStyles.signUpButtonText}>Regístrate</Text>
                    </TouchableOpacity>
                    <View style={welcomeStyles.alreadyHaveAccount}>
                        <Text style={welcomeStyles.alreadyHaveAccountText}>Tienes una cuenta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={welcomeStyles.logInButton}> Inicia sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
