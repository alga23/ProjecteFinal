import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import Header from '../../components/Header';
import { FeedStyle } from '../../styles/post/FeedStyle';
import BottomMenu from '../../components/BottomMenu';
import useFetch from '../../hooks/useFetch';
import { Global } from '../../utils/Global';
import * as SecureStore from 'expo-secure-store';
import FollowFeed from './FollowFeed';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
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
    const [currentPage, setCurrentPage] = useState(1);

    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        const getUserId = async () => {
            const storedUserId = await SecureStore.getItemAsync('user');
            setUserId(storedUserId);
            setInitialLoad(false);
        };

        getUserId();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (userId && !initialLoad) {
                setLoading(true);
                fetchPosts(currentPage);
            }
        }, [userId, initialLoad, currentPage, selectPage])
    );

    const fetchPosts = async (nextPage) => {
        const endpoint = selectPage === 'Siguiendo' ? 'post/feed/' : 'post/populate/';
        const result = await fetchData(Global.url + endpoint + nextPage, 'GET');

        if (result.status === "success") {
            if (selectPage === 'Siguiendo') {
                const newPosts = nextPage === 1 ? result.posts : [...feed, ...result.posts];
                setFeed(newPosts);
                setMore(result.posts.length > 0);
            } else {
                const newPosts = nextPage === 1 ? result.populate : [...populate, ...result.populate];
                setPopulate(newPosts);
                setMore(result.populate.length > 0);
            }
        } else {
            setMore(false);
        }

        setLoading(false); // Aquí debemos marcar la carga como finalizada
    };

    const nextPage = () => {
        if (more && !loading) {
            const nextPage = page + 1;
            setPage(nextPage);
            setCurrentPage(nextPage);
            fetchPosts(nextPage);
        }
    };

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        if (isCloseToBottom && more && !loading) {
            nextPage();
        }
    };

    const handleNewPost = useCallback((newPost) => {
        const completeNewPost = {
            ...newPost,
            user: {
                _id: auth._id,
                username: auth.username,
                nick: auth.nick,
                image: auth.image === "default.png" ? Global.url_default : auth.image
            }
        };

        if (selectPage === 'Siguiendo') {
            setFeed(prevFeed => [completeNewPost, ...prevFeed]);
        } else {
            setPopulate(prevPopulate => [completeNewPost, ...prevPopulate]);
        }
    }, [auth, selectPage]);

    useEffect(() => {
        if (route.params && route.params.newPost) {
            handleNewPost(route.params.newPost);
        }
    }, [route.params, handleNewPost]);

    // Función para eliminar un post del feed
    const onDeletePost = useCallback((postId) => {
        setFeed(prevFeed => prevFeed.filter(post => post._id !== postId));
    }, []);

    const handleRefresh = useCallback(() => {
        setLoading(true);
        setPage(1); // Reiniciamos la página a 1 después de refrescar
        setCurrentPage(1);
        fetchPosts(1);
    }, [selectPage]);

    const renderContent = () => {
        if (loading && initialLoad) {
            return <ActivityIndicator size={40} color='#0074B4' style={{ marginTop: 20 }} />;
        }

        const currentFeed = selectPage === 'Siguiendo' ? feed : populate;

        if (!loading && currentFeed.length === 0) {
            return (
                <View style={FeedStyle.containerNoPosts}>
                    <Text style={FeedStyle.noPosts}>No hay publicaciones disponibles</Text>
                    {selectPage === 'Siguiendo' && (
                        <TouchableOpacity style={FeedStyle.followBottom} activeOpacity={0.6} onPress={() => navigation.navigate('Search')}>
                            <Text style={FeedStyle.followButtonText}>Sigue a usuarios</Text>
                        </TouchableOpacity>
                    )}
                </View>
            );
        }

        return (
            <ScrollView
                style={FeedStyle.scroll}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                refreshControl={<RefreshControl refreshing={loading && !initialLoad} onRefresh={handleRefresh} />}
            >
                {currentFeed.map(post => (
                    <FollowFeed key={post._id} post={post} userId={userId} auth={auth} onDeletePost={onDeletePost} />
                ))}
                {loading && <ActivityIndicator size={40} color='#0074B4' style={{ marginTop: 20 }} />}
            </ScrollView>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <View style={FeedStyle.lineTop} />
            <View style={FeedStyle.container}>
                <TouchableOpacity onPress={() => { setSelectPage('Siguiendo'); setPage(1); setCurrentPage(1); setLoading(true); fetchPosts(1); }}>
                    <Text style={[FeedStyle.text, selectPage === 'Siguiendo' && FeedStyle.textSiguiendo]}>Siguiendo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelectPage('Populares'); setPage(1); setCurrentPage(1); setLoading(true); fetchPosts(1); }}>
                    <Text style={[FeedStyle.text, selectPage === 'Populares' && FeedStyle.textPopulares]}>Populares</Text>
                </TouchableOpacity>
            </View>
            <View style={FeedStyle.line} />
            <View style={[FeedStyle.mainLine, selectPage === 'Siguiendo' ? FeedStyle.lineSelectSiguiendo : FeedStyle.lineSelectPopulares]} />
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                {renderContent()}
                <BottomMenu />
            </View>
        </View>
    );
};

export default Feed;
