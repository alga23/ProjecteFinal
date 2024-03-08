import { View, Text, TouchableOpacity } from 'react-native';
import { BottomMenuStyle } from '../styles/BottomMenuStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';

const BottomMenu = () => {

    const [active, setActive] = useState(false);
    return (
        <View style={BottomMenuStyle.container}>
            <View style={BottomMenuStyle.addCircle}>
                <TouchableOpacity onPress={() => setActive(true)}>
                    <Icon style={BottomMenuStyle.circleColor} name='add-circle' size={70} />
                </TouchableOpacity>
            </View>
            <View style={BottomMenuStyle.menuBottom}>
                <TouchableOpacity>
                    <Icon name='home' size={30} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name='search' size={30} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name='mail' size={30} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name='person' size={30} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BottomMenu;