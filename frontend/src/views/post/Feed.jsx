import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import Header from '../../components/Header';
import { FeedStyle } from '../../styles/post/FeedStyle';
import perfil from '../../../assets/images/default_profile_picture.jpg';
import cristiano from '../../../assets/images/cristiano.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import BottomMenu from '../../components/BottomMenu';


const Feed = () => {

    const [cards, setCards] = useState([...Array(10).keys()]);

    const [selectPage, setSelectPage] = useState('Siguiendo');

    const nextPage = () => {

        if (cards.length <= 50) {
            setTimeout(() => {

                let newCards = [...cards];

                for (let i = 0; i < 10; i++) {
                    newCards.push(cards.length + i);
                }

                setCards(newCards);
            }, 500);
        }
    }

    return (
        <View style={FeedStyle.containerPrincipal}>
            <Header />
            <View style={FeedStyle.container}>
                <TouchableOpacity onPress={() => setSelectPage('Siguiendo')}>
                    <Text style={[FeedStyle.text, selectPage === 'Siguiendo' && FeedStyle.textSiguiendo]}>Siguiendo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectPage('Populares')}>
                    <Text style={[FeedStyle.text, selectPage === 'Populares' && FeedStyle.textPopulares]}>Populares</Text>
                </TouchableOpacity>
            </View>
            <View style={FeedStyle.line} />
            <View style={[FeedStyle.mainLine, selectPage === 'Siguiendo' ? FeedStyle.lineSelectSiguiendo : FeedStyle.lineSelectPopulares]} />
            <ScrollView style={FeedStyle.scroll} onScroll={nextPage}>
                {selectPage === 'Siguiendo' &&
                    cards.map((_, index) => {
                        return (
                            <View style={FeedStyle.cardPost} key={index}>

                                <Image style={FeedStyle.imageUsuario} source={perfil} />
                                <View style={FeedStyle.postInfo}>
                                    <View style={FeedStyle.infoUsuario}>
                                        <Text>Pablo51</Text>
                                        <Text>@pablo...</Text>
                                        <Text>· 2h</Text>
                                    </View>
                                    <Text>Hola a todos</Text>
                                    <Image style={FeedStyle.imagenPost} source={cristiano} />
                                    <View style={FeedStyle.containerIcons}>
                                        <View style={FeedStyle.containerIconElement}>

                                            <TouchableOpacity>
                                                <Icon name='comment-o' size={20} />
                                            </TouchableOpacity>
                                            <Text>0</Text>
                                        </View>
                                        <View style={FeedStyle.containerIconElement}>

                                            <TouchableOpacity>
                                                <Icon name='retweet' size={20} />
                                            </TouchableOpacity>
                                            <Text>0</Text>
                                        </View>
                                        <View style={FeedStyle.containerIconElement}>

                                            <TouchableOpacity>
                                                <Icon name='heart-o' size={20} />
                                            </TouchableOpacity>
                                            <Text>0</Text>
                                        </View>
                                        <View style={FeedStyle.containerIconElement}>

                                            <TouchableOpacity>
                                                <Icon name='bar-chart' size={20} />
                                            </TouchableOpacity>
                                            <Text>0</Text>
                                        </View>
                                        <View style={FeedStyle.containerIconElement}>

                                            <TouchableOpacity>
                                                <Icon name='bookmark-o' size={20} />
                                            </TouchableOpacity>
                                            <Text>0</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    })}

            </ScrollView>
            <BottomMenu />
        </View>
    )
}

export default Feed;