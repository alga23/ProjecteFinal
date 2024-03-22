import React, { useState } from 'react';
import { View, Text, Button, Touchable, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { MensajeStyle } from '../../styles/post/MensajeStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import Cristiano from '../../../assets/images/cristiano.png'


const MensajesEscritos = () => {

    const [card, setCard] = useState([...Array(12).fill(0)]);

    return (
        <View style={MensajeStyle.ContainerPrincipal}>
            <View style={MensajeStyle.containerConMensajes}>
                <TouchableOpacity>
                    <Icon style={MensajeStyle.arrowContainer} name="arrow-left" size={30}></Icon>
                </TouchableOpacity>
                <Text style={MensajeStyle.textoTusMensajes}>Tus mensajes</Text>
            </View>
            <View style={MensajeStyle.line}></View>
            <View style={MensajeStyle.search}>
            <Icon style={MensajeStyle.arrowContainer} name="search" size={25}></Icon>
            <TextInput style={MensajeStyle.inputSearch}></TextInput>
            </View>
            <View style={MensajeStyle.line}></View>
            <ScrollView>
            {card.length >= 0 && card.map((_, index) => {
                return (
                    <View key={index}>
                        <View style={MensajeStyle.containerCardMessage}>
                            <View style={MensajeStyle.containerUser}>

                                <Image source={Cristiano} style={MensajeStyle.fotoUsuario}></Image>
                                <View style={MensajeStyle.infoUsuario}>
                                    <Text style={MensajeStyle.textName}>Carlos</Text>
                                    <Text style={MensajeStyle.textMessage}>hola tete</Text>
                                </View>
                            </View>
                            <View style={MensajeStyle.notifyMessage}>
                                <Text style={MensajeStyle.timeText}>13:32</Text>
                                <View style={MensajeStyle.notify}>
                                    <Text style={MensajeStyle.textContador}>4</Text>
                                </View>
                            </View>
                        </View>
                        <View style={MensajeStyle.line}></View>
                    </View>
                )
            })}
            </ScrollView>
        </View>





    );
};
export default MensajesEscritos;