import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { FeedStyle } from '../../styles/post/FeedStyle';
import { useCallback, useEffect, useState } from 'react';
import BottomMenu from '../../components/BottomMenu';
import useFetch from '../../hooks/useFetch';
import { Global } from '../../utils/Global';
import * as SecureStore from 'expo-secure-store';
import FollowFeed from './FollowFeed';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';

const Feed = () => {
    const [selectPage, setSelectPage] = useState('Siguiendo');
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [feed, setFeed] = useState([]);
    const [populate, setPopulate] = useState([]);
    const { fetchData } = useFetch();
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const { auth } = useAuth({});
    const [initialLoad, setInitialLoad] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        const getUserId = async () => {
            const storedUserId = await SecureStore.getItemAsync('user');
            setUserId(storedUserId);
            setInitialLoad(false); // Set the initial load to false after getting the userId
        };

        getUserId();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (userId && initialLoad) {
                setLoading(true);
                Promise.all([feedSiguiendo(1), populatePosts(1)])
                    .finally(() => setLoading(false));
            }
        }, [userId, initialLoad])
    );

    const feedSiguiendo = async (nextPage) => {
        const resultPosts = await fetchData(Global.url + "post/feed/" + nextPage, 'GET');
        if (resultPosts.status === "success") {
            const newPosts = nextPage === 1 ? resultPosts.posts : [...feed, ...resultPosts.posts];
            setFeed(newPosts);
            setMore(resultPosts.posts.length > 0);
        } else {
            setMore(false);
        }
    };

    const populatePosts = async (nextPage) => {
        const resultsPopulates = await fetchData(Global.url + 'post/populate/' + nextPage, 'GET');
        if (resultsPopulates.status === "success") {
            const newPosts = nextPage === 1 ? resultsPopulates.populate : [...populate, ...resultsPopulates.populate];
            setPopulate(newPosts);
            setMore(resultsPopulates.populate.length > 0);
        } else {
            setMore(false);
        }
    };

    const nextPage = () => {
        if (more && !loading) {
            setPage(prevPage => {
                const nextPage = prevPage + 1;
                if (selectPage === 'Siguiendo') {
                    feedSiguiendo(nextPage);
                } else {
                    populatePosts(nextPage);
                }
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

    const renderContent = () => {
        if (loading && initialLoad) {
            return <ActivityIndicator size={40} color='#0074B4' style={{ marginTop: 20 }} />;
        }

        if (selectPage === 'Siguiendo' && feed.length > 0) {
            return feed.map((post) => (
                <FollowFeed key={post._id}
                    post={post}
                    userId={userId}
                    auth={auth}
                />
            ));
        } else if (selectPage === 'Populares' && populate.length > 0) {
            return populate.map((post) => (
                <FollowFeed key={post._id}
                    post={post}
                    userId={userId}
                    auth={auth}
                />
            ));
        } else {
            return (
                <View style={FeedStyle.containerNoPosts}>
                    <Text style={FeedStyle.noPosts}>No hay publicaciones de usuarios que sigas</Text>
                    <TouchableOpacity style={FeedStyle.followBottom} activeOpacity={0.6} onPress={() => navigation.navigate('Search')}>
                        <Text style={FeedStyle.followButtonText}>Sigue a usuarios</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    };

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
                {renderContent()}
            </ScrollView>
            <BottomMenu />
        </View>
    );
};

export default Feed;
