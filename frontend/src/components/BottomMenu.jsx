import { View, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { BottomMenuStyle } from '../styles/BottomMenuStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BottomMenu = () => {

    animation = new Animated.Value(0);
    const navigation = useNavigation();

    const handleRouter = (route) => {
        return navigation.navigate(route);
    }
    toggleMenu = () => {

        const toValue = this.open ? 0 : 1

        Animated.spring(this.animation, {
            toValue,
            friction: 5,
            useNativeDriver: true
        }).start()

        this.open = !this.open;
    }

    const cameraStyle = {
        transform: [
            { scale: this.animation },
            {
                translateY: this.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -135]
                })
            }
        ]
    }
    const pencilStyle = {
        transform: [
            { scale: this.animation },
            {
                translateY: this.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -75]
                })
            }
        ]
    }
    const rotation = {
        transform: [
            {
                rotate: this.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["45deg", "0deg"]
                })
            }
        ]
    }
    return (
        <View style={BottomMenuStyle.container}>
            <View style={BottomMenuStyle.addCircle}>
                <Animated.View style={[BottomMenuStyle.button, BottomMenuStyle.secondary, cameraStyle]} >
                    <AddCircleWithCross name='camera' size={55} iconSize={20} />
                </Animated.View>
                <Animated.View style={[BottomMenuStyle.button, BottomMenuStyle.secondary, pencilStyle]} >
                    <AddCircleWithCross name='pencil' size={55} iconSize={25} />
                </Animated.View>
                <TouchableWithoutFeedback onPress={toggleMenu}>
                    <Animated.View style={[BottomMenuStyle.button, BottomMenuStyle.menu, rotation]}>
                        <AddCircleWithCross name='times' rotate="transform: [{ rotate: '45deg' }]" />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>

            <View style={BottomMenuStyle.menuBottom}>
                <TouchableOpacity onPress={() => handleRouter("Feed")}>
                    <Icon name='home' size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRouter("Search") }>
                    <Icon name='search' size={30} />
                </TouchableOpacity>
                <Icon name='mail' size={30} />
                <Icon name='person' size={30} />
            </View>
        </View>
    )
}

const AddCircleWithCross = ({ name, size = 70, iconSize = 30}) => {
    return (
        <View style={{ position: 'relative' }}>
            <FontAwesome style={BottomMenuStyle.circleColor} name='circle' size={size} />
            <FontAwesome style={BottomMenuStyle.iconColor} name={name} size={iconSize} color='white'/>
        </View>
    );
};
export default BottomMenu;