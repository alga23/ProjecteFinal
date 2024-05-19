import { View, Text, Image, TouchableOpacity } from 'react-native';
import perfil from '../../../assets/images/default_profile_picture.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FeedStyle } from '../../styles/post/FeedStyle';
import 'moment/locale/es';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import useFetch from '../../hooks/useFetch';
import { Global } from '../../utils/Global';

const FollowFeed = React.memo(({ post, userId, auth }) => {
    const navigation = useNavigation();
    const { fetchData } = useFetch();
    const [liked, setLiked] = useState({
        likeCount: post.likes,
        isLikedByCurrentUser: post.likes_users_id.includes(userId)
    });
    const [fav, setFav] = useState({
        isFavByCurrentUser: Array.isArray(auth.fav_posts_id) ? auth.fav_posts_id.includes(post._id) : false
    });

    const likePosts = async (postId) => {
        const likeResponse = await fetchData(Global.url + 'post/like/' + postId, 'PUT');
        if (likeResponse.status === "success" && userId) {
            setLiked(prevLiked => ({
                ...prevLiked,
                isLikedByCurrentUser: !prevLiked.isLikedByCurrentUser,
                likeCount: likeResponse.post.likes,
            }));
        }
    };

    const favPosts = async (postId) => {
        const postResponse = await fetchData(Global.url + 'post/fav/' + postId, 'POST');
        if (postResponse.status === "success" && userId) {
            setFav(prevFav => ({
                ...prevFav,
                isFavByCurrentUser: !prevFav.isFavByCurrentUser,
            }));
        }
    };

    const formatLikes = (count) => {
        if (count < 1000) {
            return count.toString();
        } else if (count < 1000000) {
            const abbreviated = parseFloat((count / 1000).toFixed(1));
            return `${abbreviated}K`;
        } else {
            const abbreviated = parseFloat((count / 1000000).toFixed(1));
            return `${abbreviated}M`;
        }
    };

    return (
        <View style={FeedStyle.cardPost} key={post._id}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Profile', { profileId: post.user_id._id });
            }}>
                {post.user_id.imagen === 'default.png' ? (
                    <Image style={FeedStyle.imageUsuario} source={perfil} />
                ) : (
                    <Image style={FeedStyle.imageUsuario} source={{ uri: post.user_id.imagen }} />
                )}
            </TouchableOpacity>
            <View style={FeedStyle.postInfo}>
                <View style={FeedStyle.infoUsuario}>
                    <Text style={FeedStyle.infoNick}>{post.user_id.nick}</Text>
                    <Text style={FeedStyle.infoUsername} numberOfLines={1} ellipsizeMode="tail">@{post.user_id.username}</Text>
                    <Text>{moment(post.createdAt).fromNow()}</Text>
                </View>
                <Text>{post.content}</Text>
                {post.file && (
                    <Image style={FeedStyle.imagenPost} source={{ uri: post.file }} />
                )}
                <View style={FeedStyle.containerIcons}>
                    <View style={FeedStyle.containerIconElement}>
                        <TouchableOpacity>
                            <Icon name='comment-o' size={16} color="#666666" />
                        </TouchableOpacity>
                        <Text>0</Text>
                    </View>
                    <View style={FeedStyle.containerIconElement}>
                        <TouchableOpacity>
                            <Icon name='retweet' size={16} color="#666666" />
                        </TouchableOpacity>
                        <Text>0</Text>
                    </View>
                    <View style={FeedStyle.containerIconElement}>
                        <TouchableOpacity onPress={() => likePosts(post._id)}>
                            <Icon name={liked.isLikedByCurrentUser ? 'heart' : 'heart-o'} color={liked.isLikedByCurrentUser ? 'red' : undefined} size={16} />
                        </TouchableOpacity>
                        <Text>{formatLikes(liked.likeCount)}</Text>
                    </View>
                    <View style={FeedStyle.containerIconElement}>
                        <TouchableOpacity>
                            <Icon name='bar-chart' size={16} color="#666666" />
                        </TouchableOpacity>
                        <Text>0</Text>
                    </View>
                    <View style={FeedStyle.containerIconElement}>
                        <TouchableOpacity onPress={() => favPosts(post._id)}>
                            <Icon name={fav.isFavByCurrentUser ? 'bookmark' : 'bookmark-o'} color={fav.isFavByCurrentUser ? '#FFD700' : '#666666'} size={16} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
});

export default FollowFeed;
