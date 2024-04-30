import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import useFetch from '../../hooks/useFetch';
import { Global } from '../../utils/Global';
import { Follow } from '../../styles/follow/Follow';
import Icon from 'react-native-vector-icons/FontAwesome';

const Following = () => {

    const [user, setUser] = useState({});
    const [followers, setFollowers] = useState([]);
    const { fetchData } = useFetch({});
    const [ loading, setLoading ] = useState(true);
    const route = useRoute();
    const { id } = route.params;

    useEffect(() => {
        obtenerUser();
    }, []);

    useEffect(() => {
        if (user._id) {
            obtenerFollower();
        }
    }, [user._id]);


    const obtenerUser = async () => {
        const data = await fetchData(Global.url + 'user/profile/' + id, 'GET');

        if (data.status === "success") {
            setUser(data.user);
        }
    }

    const obtenerFollower = async () => {
        const data = await fetchData(Global.url + 'follow/following/' + user._id, 'GET');

        if (data.status === "success") {
            const follows = data.follows.map(follow => ({
                ...follow,
                isFollowing: !follow.isFollowing
            }));

            setFollowers(follows);
            setLoading(false);
        }
    }

    const saveAndUnFollow = async (userId) => {
        console.log(userId);
        const data = await fetchData(Global.url + 'follow/save', 'POST', { follower: userId });
        console.log(data);
        if (data.status === 'success') {
            const updatedFollowers = followers.map(follower => {
              if (follower.follower._id === userId) {
                return {
                  ...follower,
                  isFollowing: true
                };
              }
              return follower;
            });
            setFollowers(updatedFollowers);
          }
    }

    return (
        <View style={Follow.container}>
            <View style={Follow.backFollowers}>
                <TouchableOpacity>
                    <Icon name="arrow-left" size={20} color="black" style={Follow.iconBack} />
                </TouchableOpacity>
                <Text>Siguiendo</Text>
            </View>
            <View style={Follow.containerSiguiendo}>
                {followers.map((followedUser, index) => (
                    <View style={Follow.userContainer} key={index}>
                        <View style={Follow.imageContainer}>
                            {followedUser.follower.imagen !== "default.png" ? (
                                <Image style={Follow.imagenUsuario} source={{ uri: followedUser.follower.imagen }} />
                            ) : (
                                <Image style={Follow.imagenUsuario} source={{ uri: Global.url_default }} />
                            )}
                        </View>
                        <View style={Follow.userInfoContainer}>
                            <Text style={Follow.userInfoName}>{followedUser.follower.nombreCompleto}</Text>
                            <Text>{followedUser.follower.nick}</Text>
                        </View>

                        <TouchableOpacity style={Follow.followButton} onPress={() => saveAndUnFollow(followedUser.follower._id)}>
                            {followedUser.isFollowing ? (
                                <Text style={Follow.followText}>Siguiendo</Text>
                            ) : (
                                <Text style={Follow.followText}>Seguir</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                ))}
                {loading && <Text>Cargando...</Text>}
                {!loading && followers.length === 0 && (
                    <View style={Follow.noFollowersContainer}>
                        <Icon name="user" size={50} color="#888" />
                        <Text style={Follow.noFollowersText}>0 Seguidos</Text>
                    </View>
                )}
            </View>
        </View>
    )
}

export default Following;