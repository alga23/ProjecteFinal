import { View, Image, TouchableOpacity } from 'react-native';
import logo from '../../assets/images/logo.png';
import perfil from '../../assets/images/default_profile_picture.jpg';
import { HeaderStyle } from '../styles/HeaderStyle';

const Header = () => {
    return (
        <>
            <View style={HeaderStyle.container}>
                <View style={HeaderStyle.containerLogo}>
                    <Image style={HeaderStyle.imagenLogo} source={logo} />
                </View>
                <TouchableOpacity>
                    <Image style={HeaderStyle.imagenPerfil} source={perfil} />
                </TouchableOpacity>
            </View>

        </>
    )
}
export default Header;