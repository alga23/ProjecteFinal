import React from 'react';
import { View, Text, Button, Touchable, TouchableOpacity, ScrollView } from 'react-native';
import { MensajeStyle } from '../../styles/post/MensajeStyle';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';

const Mensajes = () => {

    const navigation = useNavigation();
    return (
        <View style={MensajeStyle.containerPrincipal}>
            <Header />
            <ScrollView>
                <View style={MensajeStyle.container}>
                    <View>
                        <Text style={MensajeStyle.textoBandeja}>Bandeja de entrada</Text>
                    </View>
                    <View style={MensajeStyle.containerSecundario}>
                        <Text style={MensajeStyle.textoSecundario}>No tienes ningun mensaje</Text>
                    </View>
                    <View style={MensajeStyle.botonContainer}>
                        <TouchableOpacity style={MensajeStyle.botonStyle} onPress={() => navigation.navigate('Bandeja_mensaje')}>
                            <Text style={MensajeStyle.botonTexto}>Escribe un mensaje</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <BottomMenu />
        </View>
    );
};

export default Mensajes;
