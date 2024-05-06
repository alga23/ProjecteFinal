import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { SearchStyle } from "../../styles/juego/SearchStyle";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import Gta5 from '../../../assets/images/gta5.webp'
import BottomMenu from "../../components/BottomMenu";
import useForm from "../../hooks/useForm";
import { useNavigation } from "@react-navigation/native";

const Search = () => {

    const [card, setCard] = useState([...Array(10).fill('gta5')]);
    const { form, changed } = useForm({});
    const navigation = useNavigation();

    filtrar = () => {

        const textBusqueda = form && form.text ? form.text.trim() : '';
        const filtroJuego = textBusqueda === '' ? [...Array(10).fill('gta5')] : card.filter(juego => juego.toLowerCase().includes(form.text.toLowerCase()));

        setCard(filtroJuego);
    }

    useEffect(() => {
        filtrar();
    }, [form.text]);

    return (
        <View style={SearchStyle.containerPrincipal}>
            <Header />
            <View style={SearchStyle.lineTop} />
            <ScrollView>
                <View style={SearchStyle.container}>
                    <TouchableOpacity>
                        <View style={SearchStyle.containerIconLupa}>
                            <View style={SearchStyle.inputFiltro}>
                                <TextInput
                                    style={[SearchStyle.inputText]}
                                    placeholder="Buscar Videojuego"
                                    value={form.text}
                                    onChangeText={text => changed('text', text)}
                                />
                            </View>
                            <Icon style={SearchStyle.lupaIcon} name="search" size={25} />
                        </View>
                    </TouchableOpacity>
                </View>
                {card.length > 0 ? (
                    <View style={SearchStyle.containerJuego}>
                        <View style={SearchStyle.containerGeneroView}>
                            <Text style={SearchStyle.textCategoria}>Mejor valorados</Text>
                            <TouchableOpacity>
                                <Text>Todo</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={SearchStyle.scroll} horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={SearchStyle.cardJuegos}>
                                {card.map((_, index) => {
                                    return (
                                        <View style={SearchStyle.juegos} key={index}>
                                            <TouchableOpacity onPress={() => navigation.navigate("ViewGame")}>
                                            <Image style={SearchStyle.juegoImg} source={Gta5} />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>

                        <View style={SearchStyle.containerGeneroView}>
                            <Text style={SearchStyle.textCategoria}>Mejor valorados</Text>
                            <TouchableOpacity>
                                <Text>Todo</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={SearchStyle.cardJuegos}>
                                {card.map((_, index) => {
                                    return (
                                        <View style={SearchStyle.juegos} key={index}>

                                            <TouchableOpacity onPress={() => navigation.navigate("ViewGame")}>
                                                <Image style={SearchStyle.juegoImg} source={Gta5} />
                                            </TouchableOpacity>

                                        </View>
                                    )
                                })}

                            </View>
                        </ScrollView>
                    </View>
                ) : <Text style={SearchStyle.noResult}>No se encontraron resultados...</Text>}
            </ScrollView>
            <BottomMenu />
        </View>
    )
}

export default Search;