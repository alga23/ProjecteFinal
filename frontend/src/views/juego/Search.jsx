import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { SearchStyle } from "../../styles/juego/SearchStyle";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import BottomMenu from "../../components/BottomMenu";
import useForm from "../../hooks/useForm";
import { useNavigation } from "@react-navigation/native";
import { CLIENT_ID, GAMES_TOKEN } from '@env';
import { Global } from '../../utils/Global';

const Search = () => {

    const [ps5Games, setPs5Games] = useState([]);
    const [xboxSeriesGames, setXboxSeriesGames] = useState([]);
    const [card, setCard] = useState([...Array(10).fill('gta5')]);
    const { form, changed } = useForm({});
    const navigation = useNavigation();

    const fetchPS5Games = async () => {
        const url = 'https://api.igdb.com/v4/games';
        const headers = {
            'Client-ID': CLIENT_ID,
            'Authorization': GAMES_TOKEN,
            'Content-Type': 'application/json',
        };

        const body = `
        fields name, cover.image_id;
        where platforms = 167 & cover != null;
        sort rating desc;
        limit 25;
        
    `;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body,
            });

            if (response.ok) {
                const data = await response.json();
                const gamesWithImages = data.map(game => ({
                    ...game,
                    image_url: `${Global.url_imagenes_games}${game.cover.image_id}.jpg`,
                }));
                setPs5Games(gamesWithImages);

            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchXboxSeriesGames = async () => {
        const url = 'https://api.igdb.com/v4/games';
        const headers = {
            'Client-ID': CLIENT_ID,
            'Authorization': GAMES_TOKEN,
            'Content-Type': 'application/json',
        };

        const body = `
        fields name, cover.image_id;
        where platforms = 169 & cover != null;
        sort rating desc;
        limit 25;
        
    `;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body,
            });

            if (response.ok) {
                const data = await response.json();
                const gamesWithImages = data.map(game => ({
                    ...game,
                    image_url: `${Global.url_imagenes_games}${game.cover.image_id}.jpg`,
                }));
                setXboxSeriesGames(gamesWithImages);

            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchPS5Games(),
            fetchXboxSeriesGames
    }, []);

    useEffect(() => {
        filtrar();
    }, [form.text]);

    const filtrar = () => {
        const textBusqueda = form && form.text ? form.text.trim() : '';
        const filtroJuego = textBusqueda === '' ? [...Array(10).fill('gta5')] : card.filter(juego => juego.toLowerCase().includes(form.text.toLowerCase()));
        setCard(filtroJuego);
    };

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
                            <Text style={SearchStyle.textCategoria}>Mejores valorados de PS5</Text>
                        </View>
                        <ScrollView style={SearchStyle.scroll} horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={SearchStyle.cardJuegos}>
                                {ps5Games.map((game, index) => (
                                    <View style={SearchStyle.juegos} key={index}>
                                        <TouchableOpacity onPress={() => navigation.navigate("ViewGame", { gameId: game.id })}>
                                            <Image style={SearchStyle.juegoImg} source={{ uri: game.image_url }} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                ) : <Text style={SearchStyle.noResult}>No se encontraron resultados...</Text>}
            </ScrollView>
            <BottomMenu />
        </View>
    );
};

export default Search;
