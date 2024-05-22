import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import Header from "../../components/Header";
import { SearchStyle } from "../../styles/juego/SearchStyle";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import BottomMenu from "../../components/BottomMenu";
import useForm from "../../hooks/useForm";
import { useNavigation } from "@react-navigation/native";
import { CLIENT_ID, GAMES_TOKEN } from '@env';
import { Global } from '../../utils/Global';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
    const [ps5Games, setPs5Games] = useState([]);
    const [xboxSeriesGames, setXboxSeriesGames] = useState([]);
    const [switchGames, setSwitchGames] = useState([]);
    const [pcGames, setPcGames] = useState([]);
    const [searchedGames, setSearchesGames] = useState([]);
    const [card, setCard] = useState([...Array(10).fill('gta5')]);
    const { form, changed } = useForm({});
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);

    const fetchGames = async (platformId, setter) => {
        const url = 'https://api.igdb.com/v4/games';
        const headers = {
            'Client-ID': CLIENT_ID,
            'Authorization': GAMES_TOKEN,
            'Content-Type': 'application/json',
        };

        const body = `
            fields name, cover.image_id;
            where platforms = ${platformId} & cover != null & version_parent = null;
            sort rating desc;
            limit 50;
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
                setter(gamesWithImages);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const searchGame = async (busqueda) => {
        const url = 'https://api.igdb.com/v4/games';
        const headers = {
            'Client-ID': CLIENT_ID,
            'Authorization': GAMES_TOKEN,
            'Content-Type': 'application/json',
        };

        const body = `
            search "${busqueda}"; fields name,cover.image_id;
            limit 15;
            where cover != null & version_parent = null;
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
                setSearchesGames(gamesWithImages);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchData = async () => {
        try {
            await Promise.all([
                fetchGames(167, setPs5Games), // PS5
                fetchGames(169, setXboxSeriesGames), // Xbox Series
                fetchGames(130, setSwitchGames), // Switch
                fetchGames(6, setPcGames), // PC
            ]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filtrar();
    }, [form.text]);

    const filtrar = () => {
        const textBusqueda = form && form.text ? form.text.trim() : '';
        const filtroJuego = textBusqueda === '' ? [...Array(10).fill('gta5')] : card.filter(juego => juego.toLowerCase().includes(form.text.toLowerCase()));
        setCard(filtroJuego);
    };

    const LoadingIndicator = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={SearchStyle.containerPrincipal}>
                <Header />
                <View style={SearchStyle.lineTop} />
                <View style={SearchStyle.container}>
                    <TouchableOpacity onPress={() => searchGame(form.text)}>
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
                {isLoading ? (
                    <LoadingIndicator />
                ) : (

                    <ScrollView>

                        {searchedGames.length > 0 && (
                            <View style={SearchStyle.containerJuego}>
                                <View style={SearchStyle.containerGeneroView}>
                                    <Text style={SearchStyle.textCategoria}>Resultados de la búsqueda</Text>
                                </View>
                                <ScrollView style={SearchStyle.scroll} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View style={SearchStyle.cardJuegos}>
                                        {searchedGames.map((game, index) => (
                                            <View style={SearchStyle.juegos} key={index}>
                                                <TouchableOpacity onPress={() => navigation.navigate("ViewGame", { gameId: game.id })}>
                                                    <Image style={SearchStyle.juegoImg} source={{ uri: game.image_url }} />
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>
                        )}
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
                                <View style={SearchStyle.containerGeneroView}>
                                    <Text style={SearchStyle.textCategoria}>Mejores valorados de Xbox Series</Text>
                                </View>
                                <ScrollView style={SearchStyle.scroll} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View style={SearchStyle.cardJuegos}>
                                        {xboxSeriesGames.map((game, index) => (
                                            <View style={SearchStyle.juegos} key={index}>
                                                <TouchableOpacity onPress={() => navigation.navigate("ViewGame", { gameId: game.id })}>
                                                    <Image style={SearchStyle.juegoImg} source={{ uri: game.image_url }} />
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>
                                </ScrollView>
                                <View style={SearchStyle.containerGeneroView}>
                                    <Text style={SearchStyle.textCategoria}>Mejores valorados de Switch</Text>
                                </View>
                                <ScrollView style={SearchStyle.scroll} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View style={SearchStyle.cardJuegos}>
                                        {switchGames.map((game, index) => (
                                            <View style={SearchStyle.juegos} key={index}>
                                                <TouchableOpacity onPress={() => navigation.navigate("ViewGame", { gameId: game.id })}>
                                                    <Image style={SearchStyle.juegoImg} source={{ uri: game.image_url }} />
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>
                                </ScrollView>
                                <View style={SearchStyle.containerGeneroView}>
                                    <Text style={SearchStyle.textCategoria}>Mejores valorados de PC</Text>
                                </View>
                                <ScrollView style={SearchStyle.scroll} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View style={SearchStyle.cardJuegos}>
                                        {pcGames.map((game, index) => (
                                            <View style={SearchStyle.juegos} key={index}>
                                                <TouchableOpacity onPress={() => navigation.navigate("ViewGame", { gameId: game.id })}>
                                                    <Image style={SearchStyle.juegoImg} source={{ uri: game.image_url }} />
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>
                        ) : <Text style={SearchStyle.noResult}></Text>}
                    </ScrollView>

                )}
                <BottomMenu />
            </View>
        </SafeAreaView>
    );
}

export default Search;
