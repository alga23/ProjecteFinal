import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../components/Header';
import { FeedStyle } from '../../styles/post/FeedStyle';
import { useEffect, useState } from 'react';
import BottomMenu from '../../components/BottomMenu';
import useFetch from '../../hooks/useFetch';
import { Global } from '../../utils/Global';
import * as SecureStore from 'expo-secure-store';

import FollowFeed from './FollowFeed';

const Feed = () => {

    const [selectPage, setSelectPage] = useState('Siguiendo');
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [feed, setFeed] = useState([]);
    const { fetchData, loading } = useFetch();
    const [like, setLike] = useState("");


    useEffect(() => {
        feedSiguiendo(1);
    }, [like]);

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

    const likePosts = async (userPost) => {
        const like = await fetchData(Global.url + 'post/like/' + userPost, 'PUT');

        if (like.message === "Like borrado del post") {
            setLike("Like");
        } else {
            setLike("Dar Like");
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

                    feed && feed.map((post, index) => {
                        return (
                            <FollowFeed post={post} index={index} like={like} likePosts={() => likePosts(post._id)} />
                        )
                    })
                }
            </ScrollView>
            <BottomMenu />
        </View>
    )
}

export default Feed;