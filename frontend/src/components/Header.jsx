import { View, Image, TouchableOpacity, Text } from 'react-native';
import logo from '../../assets/images/logo.png';
import perfil from '../../assets/images/default_profile_picture.jpg';
import { HeaderStyle } from '../styles/HeaderStyle';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const Header = () => {
    const navigation = useNavigation()
    const { auth } = useAuth();

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
                    {auth.imagen === "default.png" ? (

                        <Image style={HeaderStyle.imagenPerfil} source={perfil} />
                    ) : (
                        <Image style={HeaderStyle.imagenPerfil} source={{ uri: auth.imagen }} />
                    )}
                </TouchableOpacity>
            </View>

        </>
    )
}
export default Header;