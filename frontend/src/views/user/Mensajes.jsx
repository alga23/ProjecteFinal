import React from 'react';
import { View, Text, Button, Touchable, TouchableOpacity } from 'react-native';
import { MensajeStyle } from '../../styles/post/MensajeStyle';

const Mensajes = () => {
    return (
        <View style={MensajeStyle.containerPrincipal}>
            <View style={MensajeStyle.container}></View>
            <View style={MensajeStyle.container}>
                <Text style={MensajeStyle.textoBandeja}>Bandeja de entrada</Text>
            </View>
            <View style={MensajeStyle.containerSecundario}>
                <Text style={MensajeStyle.textoSecundario}>No tienes ningun mensaje</Text>
        </View>
        <View style={MensajeStyle.botonContainer}>
        <TouchableOpacity style={MensajeStyle.botonStyle}>
            <Text style={MensajeStyle.botonTexto}>Escribe un mensaje</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

export default Mensajes;
