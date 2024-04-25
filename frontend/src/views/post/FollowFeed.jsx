import { View, Text, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import perfil from '../../../assets/images/default_profile_picture.jpg';
import cristiano from '../../../assets/images/cristiano.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FeedStyle } from '../../styles/post/FeedStyle';
import 'moment/locale/es';
import moment from 'moment';
import React from "react";
import { useNavigation } from '@react-navigation/native'

const FollowFeed = React.memo(({ post, onLikePress, isLiked }) => {

    const navigation = useNavigation()

    return (
        <View style={FeedStyle.cardPost} key={post._id}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Profile', { profileId: post.user_id._id });
            }}>
                {post.user_id.imagen === "default.png" ? (
                    <Image style={FeedStyle.imageUsuario} source={perfil} />
                ) :
                    <Image style={FeedStyle.imageUsuario} source={{ uri: post.user_id.imagen }} />
                }
            </TouchableOpacity>
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

                        <TouchableOpacity onPress={() => onLikePress(post._id)}>
                            <Icon name={isLiked ? 'heart' : 'heart-o'} color={isLiked ? "red" : undefined} size={20} />
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
});

export default FollowFeed;