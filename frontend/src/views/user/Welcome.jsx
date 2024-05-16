import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { WelcomeStyle } from '../../styles/user/WelcomeStyle'
import i18n from '../../languages/i18n';
import { useTranslation } from 'react-i18next';

export default function Welcome() {

    const { t, i18n } = useTranslation();

    const navigation = useNavigation()


    return (
        <SafeAreaView style={WelcomeStyle.container}>
            <StatusBar style="auto" />
            <View style={WelcomeStyle.contentContainer}>
                <Text style={WelcomeStyle.title}>{t('bienvenido')}</Text>
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
                        <Text style={WelcomeStyle.signUpButtonText}>{t('registrate')}</Text>
                    </TouchableOpacity>
                    <View style={WelcomeStyle.alreadyHaveAccount}>
                        <Text style={WelcomeStyle.alreadyHaveAccountText}>{t('tienesUnaCuenta?')}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={WelcomeStyle.logInButton}> {t('iniciaSesion')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
