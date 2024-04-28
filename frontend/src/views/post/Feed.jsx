import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { FeedStyle } from '../../styles/post/FeedStyle';
import { useEffect, useState } from 'react';
import BottomMenu from '../../components/BottomMenu';
import useFetch from '../../hooks/useFetch';
import { Global } from '../../utils/Global';
import * as SecureStore from 'expo-secure-store';
import FollowFeed from './FollowFeed';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';

const Feed = () => {

    const [selectPage, setSelectPage] = useState('Siguiendo');
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [feed, setFeed] = useState([]);
    const { fetchData } = useFetch();
    const [liked, setLiked] = useState({});
    const [fav, setFav] = useState({});
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const { auth } = useAuth({});
    const [isFollowing, setIsFollowing] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        feedSiguiendo(1);
    }, [userId]);

    useEffect(() => {
        if (!isFollowing) {
            setSelectPage('Populares');
        }
    }, [isFollowing]);

    useEffect(() => {
        const getUserId = async () => {
            const storedUserId = await SecureStore.getItemAsync('user');
            setUserId(storedUserId);
        };

        getUserId();
    }, []);

    const feedSiguiendo = async (nextPage) => {

        setLoading(true);
        const resultPosts = await fetchData(Global.url + "post/feed/" + nextPage, 'GET');

        if (resultPosts.status === "success") {
            let newPosts = nextPage === 1 ? resultPosts.posts : [...feed, ...resultPosts.posts];

            const newLikes = newPosts.reduce((acc, post) => ({
                ...acc,
                [post._id]: {
                    likeCount: post.likes,
                    isLikedByCurrentUser: post.likes_users_id.includes(userId)
                }
            }), { ...liked });

            const newFav = newPosts.reduce((acc, post) => ({
                ...acc,
                [post._id]: {
                    isFavByCurrentUser: Array.isArray(auth.fav_posts_id) ? auth.fav_posts_id.includes(post._id) : false
                }
            }), { ...fav });

            setLiked(newLikes);
            setFav(newFav);
            setFeed(newPosts);

            setLoading(false);
            setMore(newPosts.length < resultPosts.total);
            setIsFollowing(newPosts.length > 0);

        }
    }

    const nextPage = () => {
        if (more && !loading) {
            setPage(prevPage => {
                const nextPage = prevPage + 1;
                feedSiguiendo(nextPage);
                return nextPage;
            });
        }
    };

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        if (isCloseToBottom && more && !loading) {
            nextPage();
        }
    };

    const likePosts = async (postId) => {
        const likeResponse = await fetchData(Global.url + 'post/like/' + postId, 'PUT');

        if (likeResponse.status === "success" && userId) {
            setLiked(prevLiked => ({
                ...prevLiked,
                [postId]: {
                    likeCount: likeResponse.post.likes,
                    isLikedByCurrentUser: !prevLiked[postId]?.isLikedByCurrentUser
                }
            }))
        }
    }

    const favPosts = async (postId) => {
        const postResponse = await fetchData(Global.url + 'post/fav/' + postId, 'POST');

        if (postResponse.status === "success" && userId) {
            setFav(prevFav => ({
                ...prevFav,
                [postId]: {
                    isFavByCurrentUser: !prevFav[postId]?.isFavByCurrentUser
                }
            }))
        }
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

                    feed && feed.map((post) => {
                        return (
                            <FollowFeed key={post._id}
                                post={post}
                                onLikePress={likePosts}
                                onFavPress={favPosts}
                                isLiked={liked[post._id]}
                                isFav={fav[post._id]} />
                        )
                    })
                }
                {!loading && selectPage === 'Siguiendo' && feed.length === 0 && (
                    <View style={FeedStyle.containerNoPosts}>
                        <Text style={FeedStyle.noPosts}>No hay publicaciónes de usuarios que sigas</Text>

                        <TouchableOpacity style={FeedStyle.followBottom} activeOpacity={0.6} onPress={() => navigation.navigate('Search')}>
                            <Text style={FeedStyle.followButtonText}>Sigue a usuarios</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {loading && <ActivityIndicator size={40} color='#0074B4' style={{ marginTop: 20 }} />}
            </ScrollView>
            <BottomMenu />
        </View>
    )
}

export default Feed;