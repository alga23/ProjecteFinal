import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Header from '../../components/Header';
import { FeedStyle } from '../../styles/post/FeedStyle';
import { useEffect, useState } from 'react';
import BottomMenu from '../../components/BottomMenu';
import useFetch from '../../hooks/useFetch';
import { Global } from '../../utils/Global';
import * as SecureStore from 'expo-secure-store';
import perfil from '../../../assets/images/default_profile_picture.jpg';
import cristiano from '../../../assets/images/cristiano.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';

import 'moment/locale/es';
import moment, { updateLocale } from 'moment';
const Feed = () => {

    const [selectPage, setSelectPage] = useState('Siguiendo');
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [feed, setFeed] = useState([]);
    const { fetchData, loading } = useFetch();
    const [liked, setLiked] = useState({});
    const [like, setLike] = useState("");

    useEffect(() => {
        feedSiguiendo(1);
    }, []);

    useEffect(() => {
        updateLikes(feed);
    }, [feed]);

    const feedSiguiendo = async (nextPage) => {

        const resultPosts = await fetchData(Global.url + "post/feed/" + nextPage, 'GET', {
            'Content-Type': 'application/json',
            'Authorization': await SecureStore.getItemAsync('token')
        });

        if (resultPosts.status === "success") {
            let newPosts = nextPage === 1 ? resultPosts.posts : [...feed, ...resultPosts.posts]; // Falta arreglarlo

            setFeed(newPosts);

            if (feed.length >= (resultPosts.total - resultPosts.posts.length)) {
                setMore(false);
            }
        }
    }

    const nextPage = () => {
        let page = page + 1;

        setPage(page);
        feedSiguiendo(page);
    }

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

        const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

        if (isCloseToBottom && more && !loading) {
            nextPage();
        }
    }

    const likePosts = async (postId) => {
        const like = await fetchData(Global.url + 'post/like/' + postId, 'PUT');
    
        if (like.status === "success") {
            // Actualiza el estado de liked solo si la solicitud de like es exitosa
            setLiked(prevLiked => ({
                ...prevLiked,
                [postId]: like.message === "Like añadido al post" ? 'like' : 'unlike'
            }));
    
            // Si el like se añadió correctamente, actualiza el feed
            if (like.message === "Like añadido al post") {
                // Actualiza el contador de likes sumándole uno
                setFeed(prevFeed => {
                    return prevFeed.map(prevPost => {
                        if (prevPost._id === postId) {
                            return {
                                ...prevPost,
                                likes: prevPost.likes + 1
                            };
                        }
                        return prevPost;
                    });
                });
            } else {
                // Si se quitó el like, actualiza el contador de likes restando uno
                setFeed(prevFeed => {
                    return prevFeed.map(prevPost => {
                        if (prevPost._id === postId) {
                            return {
                                ...prevPost,
                                likes: prevPost.likes - 1
                            };
                        }
                        return prevPost;
                    });
                });
            }
        }
    }
    

    const updateLikes = (posts) => {
        const updatedLiked = {};
        posts.forEach(post => {
            updatedLiked[post._id] = post.likes > 0 ? 'like' : 'unlike';
        });
        setLiked(updatedLiked);
    }

    return (
        <View style={FeedStyle.containerPrincipal}>
            <Header />
            <View style={FeedStyle.lineTop} />
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
            <ScrollView style={FeedStyle.scroll} onScroll={handleScroll}>
                {selectPage === 'Siguiendo' &&

                    feed && feed.map((post, index) => {
                        return (
                            <View style={FeedStyle.cardPost} key={index}>
                                {post.user_id.imagen === "default.png" && (
                                    <Image style={FeedStyle.imageUsuario} source={perfil} />
                                )}
                                <View style={FeedStyle.postInfo}>
                                    <View style={FeedStyle.infoUsuario}>
                                        <Text>{post.user_id.nick}</Text>
                                        <Text>{post.user_id.username}</Text>
                                        <Text>{moment(post.createdAt).fromNow()}</Text>
                                    </View>
                                    <Text>{post.content}</Text>
                                    {post.file && (
                                        <Image style={FeedStyle.imagenPost} source={cristiano} />
                                    )}
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

                                            <TouchableOpacity onPress={() => likePosts(post._id)}>
                                                {liked[post._id] === "like" ? <Icon name='heart' color="red" size={20} /> : <Icon name='heart-o' size={20} />}
                                            </TouchableOpacity>
                                            <Text>{post.likes}</Text>
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
                    })
                }
            </ScrollView>
            <BottomMenu />
        </View>
    )
}

export default Feed;