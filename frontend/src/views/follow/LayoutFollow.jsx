import { View, Text, Image, TouchableOpacity } from "react-native";
import { Follow } from '../../styles/follow/Follow';
import { Global } from "../../utils/Global";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const LayoutFollow = ({ follows, followPress, loading, followType, userFollowing }) => {

    const { auth } = useAuth({});
    const navigation = useNavigation();

    return (
        <View style={Follow.containerSiguiendo}>
            {follows.map((followUser, index) => {
                const followData = followUser[followType];
                const isFollowing = userFollowing.includes(followData._id);
                const isCurrentId = followData._id === auth._id;

                return (
                    <View style={Follow.userContainer} key={index}>
                        <TouchableOpacity style={{ flexDirection: 'row'}} onPress={() => navigation.navigate('Profile', {profileId: followData._id})}>
                        <View style={Follow.imageContainer}>
                            {followData.imagen !== "default.png" ? (
                                <Image style={Follow.imagenUsuario} source={{ uri: followData.imagen }} />
                            ) : (
                                <Image style={Follow.imagenUsuario} source={{ uri: Global.url_default }} />
                            )}
                        </View>
                        <View style={Follow.userInfoContainer}>
                            <Text style={Follow.userInfoName}>{followData.nombreCompleto}</Text>
                            <Text>{followData.nick}</Text>
                        </View>
                        </TouchableOpacity>

                        {!isCurrentId && (
                            <TouchableOpacity onPress={() => followPress(followData._id)} style={Follow.followButton}>
                                <Text style={Follow.followText}>{isFollowing ? 'Siguiendo' : 'Seguir'}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )
            })}
            {loading && <Text>Cargando...</Text>}
            {!loading && follows.length === 0 && (
                <View style={Follow.noFollowersContainer}>
                    <Icon name="user" size={50} color="#888" />
                    <Text style={Follow.noFollowersText}>0 Seguidos</Text>
                </View>
            )}
        </View>
    )
}
export default LayoutFollow;