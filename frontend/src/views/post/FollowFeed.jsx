import { View, Text, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import perfil from '../../../assets/images/default_profile_picture.jpg';
import cristiano from '../../../assets/images/cristiano.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FeedStyle } from '../../styles/post/FeedStyle';
import 'moment/locale/es';
import moment from 'moment';

const FollowFeed = ({ post, index, like, likePosts }) => {

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
                            {like === "Like" && index === post._id ? <Icon name='heart-o' size={20} /> : <Icon name='heart' color="red" size={20} />}
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
}

export default FollowFeed;