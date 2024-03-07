import {View, Image} from 'react-native';
import logo from '../../assets/images/logo.png';
import perfil from '../../assets/images/perfil.png';
import { HeaderStyle } from '../styles/HeaderStyle';

const Header = () => {

    return (
        <View style={HeaderStyle.container}>
            <Image style={HeaderStyle.imagenLogo} source={logo} />
            <Image style={HeaderStyle.imagenPerfil} source={perfil} />
        </View>
    )
}
export default Header;