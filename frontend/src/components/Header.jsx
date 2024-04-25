import { View, Image, TouchableOpacity } from 'react-native';
import logo from '../../assets/images/logo.png';
import perfil from '../../assets/images/default_profile_picture.jpg';
import { HeaderStyle } from '../styles/HeaderStyle';
import { useNavigation } from '@react-navigation/native';


const Header = () => {
    const navigation = useNavigation()

    return (
        <>
            <View style={HeaderStyle.container}>
                <View style={HeaderStyle.containerLogo}>
                    <Image style={HeaderStyle.imagenLogo} source={logo} />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.openDrawer()
                    }}>
                    <Image style={HeaderStyle.imagenPerfil} source={perfil} />
                </TouchableOpacity>
            </View>

        </>
    )
}
export default Header;