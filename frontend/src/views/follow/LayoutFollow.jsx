import { View, Text, Image, TouchableOpacity } from "react-native";
import { Follow } from '../../styles/follow/Follow';
import { Global } from "../../utils/Global";

const LayoutFollow = ({ follows, followPress, loading, }) => {

    return (
        <View style={Follow.containerSiguiendo}>
            {follows.map((followUser, index) => (
                <View style={Follow.userContainer} key={index}>
                    <View style={Follow.imageContainer}>
                        {followUser.follower.imagen !== "default.png" ? (
                            <Image style={Follow.imagenUsuario} source={{ uri: followUser.follower.imagen }} />
                        ) : (
                            <Image style={Follow.imagenUsuario} source={{ uri: Global.url_default }} />
                        )}
                    </View>
                    <View style={Follow.userInfoContainer}>
                        <Text style={Follow.userInfoName}>{followUser.follower.nombreCompleto}</Text>
                        <Text>{followUser.follower.nick}</Text>
                    </View>

                    <TouchableOpacity style={Follow.followButton} onPress={() => followPress(followUser.follower._id)}>
                        {followUser.isFollowing ? (
                            <Text style={Follow.followText}>Siguiendo</Text>
                        ) : (
                            <Text style={Follow.followText}>Seguir</Text>
                        )}
                    </TouchableOpacity>
                </View>
            ))}
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