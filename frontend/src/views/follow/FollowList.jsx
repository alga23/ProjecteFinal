import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import useFetch from "../../hooks/useFetch";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Global } from "../../utils/Global";
import LayoutFollow from "./LayoutFollow";
import { Follow } from '../../styles/follow/Follow';
import Icon from 'react-native-vector-icons/FontAwesome';

const FollowList = ({ route }) => {
    const [user, setUser] = useState({});
    const [followers, setFollowers] = useState([]);
    const [userFollowing, setUserFollowing] = useState([]);
    const { fetchData } = useFetch({});
    const [loading, setLoading] = useState(true);

    const { id } = route.params;

    const type = id[1];

    const navigation = useNavigation();

    useEffect(() => {
        obtenerUser();
    }, []);

    useEffect(() => {
        if (user._id) {
            obtenerFollower();
        }
    }, [user._id]);


    const obtenerUser = async () => {
        const data = await fetchData(Global.url + 'user/profile/' + id[0], 'GET');

        if (data.status === "success") {
            setUser(data.user);
        }
    }

    const obtenerFollower = async () => {

        const data = await fetchData(Global.url + `follow/${type === 'followers' ? "followers" : 'following'}/` + user._id, 'GET');

        if (data.status === "success") {
            const follows = data.follows.map(follow => ({
                ...follow,
                isFollowing: data.user_following.includes(follow.user._id)
            }));

            setFollowers(follows);
            setUserFollowing(data.user_following);
            setLoading(false);
        }
    }

    const saveAndUnFollow = async (userId) => {

        const data = await fetchData(Global.url + 'follow/save', 'POST', { follower: userId });

        if (data.status === 'success') {
            const updatedFollowers = followers.map(follower => {
                if (follower.user._id === userId) {
                    return {
                        ...follower,
                        isFollowing: !follower.isFollowing
                    };
                }
                return follower;
            });
            setFollowers(updatedFollowers);
        }
    }
    return (
        <ScrollView>
            <View style={Follow.container}>
                <View style={Follow.backFollowers}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color="black" style={Follow.iconBack} />
                    </TouchableOpacity>
                    <Text>Siguiendo</Text>
                </View>
                <LayoutFollow
                    follows={followers}
                    followPress={saveAndUnFollow}
                    loading={loading}
                    followType={type == "followers" ? "user" : "follower"}
                    userFollowing={userFollowing} />
            </View>
        </ScrollView>
    )
}

export default FollowList;