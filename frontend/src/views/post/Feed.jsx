import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { FeedStyle } from '../../styles/post/FeedStyle';
import { useCallback, useEffect, useState } from 'react';
import BottomMenu from '../../components/BottomMenu';
import useFetch from '../../hooks/useFetch';
import { Global } from '../../utils/Global';
import * as SecureStore from 'expo-secure-store';
import FollowFeed from './FollowFeed';
import { useNavigation } from '@react-navigation/native';

const Feed = () => {

    const [selectPage, setSelectPage] = useState('Siguiendo');
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [feed, setFeed] = useState([]);
    const { fetchData, loading } = useFetch();
    const [liked, setLiked] = useState({});
    const [userId, setUserId] = useState(null);

    const navigation = useNavigation();

    useEffect(() => {
        feedSiguiendo(1);
    }, [userId]);

    useEffect(() => {
        const getUserId = async () => {
            const storedUserId = await SecureStore.getItemAsync('user');
            setUserId(storedUserId);
        };

        getUserId();
    }, []);

    const feedSiguiendo = async (nextPage) => {

        const resultPosts = await fetchData(Global.url + "post/feed/" + nextPage, 'GET');

        if (resultPosts.status === "success") {
            let newPosts = nextPage === 1 ? resultPosts.posts : [...feed, ...resultPosts.posts];

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

    const likePosts = useCallback(async (postId) => {
        const likeResponse = await fetchData(Global.url + 'post/like/' + postId, 'PUT');

        console.log(likeResponse.status);
        if (likeResponse.status === "success" && userId) {
            const newLiked = {...liked};

        }

    }, [userId, fetchData]);

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
                            <FollowFeed key={post._id} post={post} onLikePress={likePosts} isLiked={liked[post._id]} />
                        )
                    })
                }
                {!loading && feed.length === 0 && (
                    <View style={FeedStyle.containerNoPosts}>
                        <Text style={FeedStyle.noPosts}>No hay publicaciónes de usuarios que sigas</Text>

                        <TouchableOpacity style={FeedStyle.followBottom} activeOpacity={0.6} onPress={() => navigation.navigate('Bandeja_mensaje')}>
                            <Text style={FeedStyle.followButtonText}>Sigue a usuarios</Text>
                        </TouchableOpacity>
                    </View>
                )}
            {loading && <ActivityIndicator size={40} color='#0074B4' style={{marginTop:20}}/>}
            </ScrollView>
            <BottomMenu />
        </View>
    )
}

export default Feed;