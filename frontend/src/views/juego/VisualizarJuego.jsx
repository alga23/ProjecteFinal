import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { VisualizarJuegoStyle } from "../../styles/juego/VisualizarJuegoStyle";
import Icon from "react-native-vector-icons/FontAwesome";
import Perfil from '../../../assets/images/perfil.png';
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CLIENT_ID, GAMES_TOKEN } from '@env';
import { Global } from '../../utils/Global';

const VisualizarJuego = () => {
    const [active, setActive] = useState(false);
    const [card, setCard] = useState([...Array(6).fill(0)]);
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const route = useRoute();
    const { gameId } = route.params;

    useEffect(() => {
        const fetchGame = async () => {
            const url = 'https://api.igdb.com/v4/games';
            const headers = {
                'Client-ID': CLIENT_ID,
                'Authorization': GAMES_TOKEN,
                'Content-Type': 'application/json',
            };

            const body = `
            fields name, cover.image_id, summary, rating;
            where id = ${gameId};
            `;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: body,
                });

                if (response.ok) {
                    const data = await response.json();
                    const gameWithImage = data.map(game => ({
                        ...game,
                        image_url: `${Global.url_imagenes_games}${game.cover.image_id}.jpg`,
                    }))[0];
                    setGame(gameWithImage);
                } else {
                    throw new Error('Error fetching game details.');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [gameId]);

    const cambioCorazon = () => {
        setActive(!active);
    }

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={VisualizarJuegoStyle.containerPrincipal}>
            <ScrollView>
                {game ? (
                    <>
                        <View style={VisualizarJuegoStyle.containerImg}>
                            <View style={VisualizarJuegoStyle.fondoNegro} />
                            <Image style={VisualizarJuegoStyle.imgGta} source={{ uri: game.image_url }} />
                        </View>

                        <View style={VisualizarJuegoStyle.arrowContainer}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Icon style={VisualizarJuegoStyle.iconArrow} name="long-arrow-left" size={22} />
                            </TouchableOpacity>
                        </View>

                        <View style={VisualizarJuegoStyle.margenContenedor}>
                            <View style={VisualizarJuegoStyle.textRating} >
                                <Text style={VisualizarJuegoStyle.textTitulo}>{game.name}</Text>
                                <View style={VisualizarJuegoStyle.rating} >
                                    <Icon name="star" size={18} color="#FFC600" />
                                    <Text>{game.rating ? game.rating.toFixed(1) : 'N/A'}</Text>
                                </View>
                            </View>

                            <Text style={VisualizarJuegoStyle.textInfo}>{game.summary}</Text>
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
                    </>
                ) : (
                    <Text>No se encontró información del juego.</Text>
                )}
            </ScrollView>
        </View>
    )
}

export default VisualizarJuego;
