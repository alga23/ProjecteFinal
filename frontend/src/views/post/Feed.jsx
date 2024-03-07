import { View, Text, TouchableOpacity, Image } from 'react-native';
import Header from '../../components/Header';
import { FeedStyle } from '../../styles/post/FeedStyle';
import perfil from '../../../assets/images/perfil.png';
import Icon from 'react-native-vector-icons/FontAwesome';

const Feed = () => {

    return (
        <View>
            <Header />
            <View style={FeedStyle.container}>
                <TouchableOpacity>
                    <Text style={FeedStyle.text}>Siguiendo</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={FeedStyle.text}>Populares</Text>
                </TouchableOpacity>
            </View>

            <View style={FeedStyle.cardPost}>
                <View style={FeedStyle.postInfo}>
                    <Image style={FeedStyle.imageUsuario} source={perfil} />
                    <Text>Pablo51</Text>
                        <Text>@pablo...</Text>
                        <Text>· 2h</Text>
                    <View style={FeedStyle.infoUsuario}>

                        <Text>Hola a todos</Text>
                        <Image style={FeedStyle.imagenPost} source={perfil} />
                    </View>

                    <View style={FeedStyle.containerIcons}>
                        
                    </View>
                    
                </View>
            </View>
        </View>
    )
}

export default Feed;