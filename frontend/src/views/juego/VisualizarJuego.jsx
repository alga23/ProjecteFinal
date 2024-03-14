import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { VisualizarJuegoStyle } from "../../styles/juego/VisualizarJuegoStyle";
import GTA5 from '../../../assets/images/gta5.jpg';
import Icon from "react-native-vector-icons/FontAwesome";
import Perfil from '../../../assets/images/perfil.png';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const VisualizarJuego = () => {

    const [active, setActive] = useState(false);
    const [card, setCard] = useState([...Array(6).fill(0)]);
    const navigation = useNavigation();

    const cambioCorazon = () => {
        setActive(!active);

    }

    return (
        <View style={VisualizarJuegoStyle.containerPrincipal}>
            <ScrollView>
            <View style={VisualizarJuegoStyle.containerImg}>
                <View style={VisualizarJuegoStyle.fondoNegro} />
                <Image style={VisualizarJuegoStyle.imgGta} source={GTA5} />
            </View>

            <View style={VisualizarJuegoStyle.arrowContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon style={VisualizarJuegoStyle.iconArrow} name="long-arrow-left" size={22} />
            </TouchableOpacity>
            </View>

            <View style={VisualizarJuegoStyle.margenContenedor}>
                <View style={VisualizarJuegoStyle.textRating} >
                    <Text style={VisualizarJuegoStyle.textTitulo}>Grand theft auto V</Text>
                    <View style={VisualizarJuegoStyle.rating} >
                        <Icon name="star" size={18} color="#FFC600" />
                        <Text>8.5</Text>
                    </View>
                </View>

                <View style={VisualizarJuegoStyle.containerEtiquetas}>
                    <Text style={VisualizarJuegoStyle.etiquetaJuego}>18+</Text>
                    <Text style={VisualizarJuegoStyle.etiquetaJuego}>Accion</Text>
                </View>

                <Text style={VisualizarJuegoStyle.textInfo}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
            </View>

            <Text style={VisualizarJuegoStyle.textOpiniones}>31 opiniones</Text>
            <View style={VisualizarJuegoStyle.lineMain} />

            {card.map((_, index) => {
                return (
                    <View style={VisualizarJuegoStyle.cardOpiniones} key={index}>
                        <Image style={VisualizarJuegoStyle.imgPerfil} source={Perfil} />
                        <View style={VisualizarJuegoStyle.opinionInfo} >
                            <View style={VisualizarJuegoStyle.infoUsuario}>
                                <Text>Carlos</Text>
                                <Text>@carlos_02</Text>
                                <Text>· 23m</Text>
                            </View>
                            <Text style={VisualizarJuegoStyle.textOpinion}>Hola a todos este juego me parece bastante chulo</Text>

                            <View style={VisualizarJuegoStyle.containerIconsElement}>
                                <View style={VisualizarJuegoStyle.containerIcon}>
                                    <TouchableOpacity>
                                        <Icon name="comment-o" size={20} />
                                    </TouchableOpacity>
                                    <Text>20K</Text>
                                </View>
                                <View style={VisualizarJuegoStyle.containerIcon}>
                                    <TouchableOpacity onPress={cambioCorazon}>
                                        {active ? <Icon name="heart-o" size={20} /> : <Icon name="heart" size={20} color="red" />}
                                    </TouchableOpacity>
                                    <Text>20K</Text>
                                </View>
                                <View style={VisualizarJuegoStyle.containerIcon}>
                                    <TouchableOpacity>
                                        <Icon name="bar-chart" size={20} />
                                    </TouchableOpacity>
                                    <Text>20K</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            })}
            </ScrollView>
        </View>
    )
}

export default VisualizarJuego;