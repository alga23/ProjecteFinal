import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import useFetch from '../../hooks/useFetch';
import { Global } from '../../utils/Global';
import { Follow } from '../../styles/follow/Follow';
import Icon from 'react-native-vector-icons/FontAwesome';
import LayoutFollow from './LayoutFollow';

const Followers = () => {

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

        const data = await fetchData(Global.url + 'follow/followers/' + user._id, 'GET');

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
        
        const data = await fetchData(Global.url + 'follow/save', 'POST', { follower: userId });

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
            <LayoutFollow 
                    follows={followers} 
                    followPress={saveAndUnFollow} 
                    loading={loading} />
        </View>
    )
}

export default Followers;