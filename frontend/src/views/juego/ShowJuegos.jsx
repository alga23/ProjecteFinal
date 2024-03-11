import { View, Text, TextInput, TouchableWithoutFeedback, Image, ScrollView, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { ShowJuegosStyle } from "../../styles/juego/ShowJuegosStyle";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import Videojuego from '../../../assets/images/videojuego.jpg'
import BottomMenu from "../../components/BottomMenu";
import useForm from "../../hooks/useForm";

const ShowJuegos = () => {

    const [filtro, setFiltro] = useState([]);
    const [card, setCard] = useState([...Array(10).fill('mario')]);
    const { form, changed } = useForm({});

    filtrar = () => {

        let filtroJuego = card.filter(juego => juego == form.text);

        setCard(filtroJuego);
    }

    return (
        <View style={ShowJuegosStyle.containerPrincipal}>
            <Header />
            <View style={ShowJuegosStyle.lineTop} />
            <ScrollView>
                <View style={ShowJuegosStyle.container}>
                    <TouchableOpacity onPress={filtrar} >
                        <View style={ShowJuegosStyle.containerIconLupa}>
                            <View style={ShowJuegosStyle.inputFiltro}>
                                <TextInput 
                                    style={[ShowJuegosStyle.inputText]} 
                                    placeholder="Buscar Videojuego"
                                    value={form.text}
                                    onChangeText={text => changed('text', text)}
                                />
                            </View>
                            <Icon style={ShowJuegosStyle.lupaIcon} name="search" size={25} />
                        </View>
                    </TouchableOpacity>

                    <View style={ShowJuegosStyle.containerGeneroView}>
                        <Text style={ShowJuegosStyle.textCategoria}>Mejor valorados</Text>
                        <Text>Todo</Text>
                    </View>
                    <View style={ShowJuegosStyle.cardJuegos}>
                        {filtro.map((_, index) => {
                            return (
                                <View style={ShowJuegosStyle.juegos} key={index}>
                                    <Image style={ShowJuegosStyle.juegoImg} source={Videojuego} />
                                </View>
                            )
                        })}
                    </View>

                    <View style={ShowJuegosStyle.containerGeneroView}>
                        <Text style={ShowJuegosStyle.textCategoria}>Mejor valorados</Text>
                        <Text>Todo</Text>
                    </View>
                    <View style={ShowJuegosStyle.cardJuegos}>
                        {card.map((_, index) => {
                            return (
                                <View style={ShowJuegosStyle.juegos} key={index}>
                            <Image style={ShowJuegosStyle.juegoImg} source={Videojuego} />
                        </View>
                            )
                        })}
                        
                    </View>
                </View>
            </ScrollView>
            <BottomMenu />
        </View>
    )
}

export default ShowJuegos;