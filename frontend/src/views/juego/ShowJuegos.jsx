import { View, Text, TextInput, TouchableWithoutFeedback, Image, ScrollView, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { ShowJuegosStyle } from "../../styles/juego/ShowJuegosStyle";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import Videojuego from '../../../assets/images/videojuego.jpg'
import BottomMenu from "../../components/BottomMenu";
import useForm from "../../hooks/useForm";

const ShowJuegos = () => {

    const [card, setCard] = useState([...Array(10).fill('mario')]);
    const { form, changed } = useForm({});

    filtrar = () => {

        const textBusqueda = form && form.text ? form.text.trim() : '';
        const filtroJuego = textBusqueda === '' ? [...Array(10).fill('mario')] : card.filter(juego => juego.toLowerCase().includes(form.text.toLowerCase()));

        setCard(filtroJuego);
    }

    useEffect(() => {
        filtrar();
    }, [form.text]);

    return (
        <View style={ShowJuegosStyle.containerPrincipal}>
            <Header />
            <View style={ShowJuegosStyle.lineTop} />
            <ScrollView>
                <View style={ShowJuegosStyle.container}>
                    <TouchableOpacity>
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
                </View>
                {card.length > 0 ? (
                    <View style={ShowJuegosStyle.containerJuego}>
                        <View style={ShowJuegosStyle.containerGeneroView}>
                            <Text style={ShowJuegosStyle.textCategoria}>Mejor valorados</Text>
                            <Text>Todo</Text>
                        </View>
                        <ScrollView style={ShowJuegosStyle.scroll} horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={ShowJuegosStyle.cardJuegos}>
                                {card.map((_, index) => {
                                    return (
                                        <View style={ShowJuegosStyle.juegos} key={index}>
                                            <Image style={ShowJuegosStyle.juegoImg} source={Videojuego} />
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>

                        <View style={ShowJuegosStyle.containerGeneroView}>
                            <Text style={ShowJuegosStyle.textCategoria}>Mejor valorados</Text>
                            <Text>Todo</Text>
                        </View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={ShowJuegosStyle.cardJuegos}>
                                {card.map((_, index) => {
                                    return (
                                        <View style={ShowJuegosStyle.juegos} key={index}>
                                            <Image style={ShowJuegosStyle.juegoImg} source={Videojuego} />
                                        </View>
                                    )
                                })}

                            </View>
                        </ScrollView>
                    </View>
                ) : <Text style={ShowJuegosStyle.noResult}>No se encontraron resultados...</Text>}
            </ScrollView>
            <BottomMenu />
        </View>
    )
}

export default ShowJuegos;