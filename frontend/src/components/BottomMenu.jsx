import React, { useRef, useEffect } from 'react';
import { View, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { BottomMenuStyle } from '../styles/BottomMenuStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const BottomMenu = () => {
    const animation = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const routeName = useNavigationState(state => state.routes[state.index].name);

    const handleRouter = (route) => {
        navigation.navigate(route);
    };

    const rotation = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["45deg", "0deg"]
                })
            }
        ]
    };

    const isBandejaRoute = routeName === 'Bandeja' || routeName === 'Bandeja_mensaje';

    useEffect(() => {
        if (!isBandejaRoute) {
            Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            animation.setValue(0);
        }
    }, [isBandejaRoute]);

    return (
        <View style={BottomMenuStyle.container}>
            <View style={BottomMenuStyle.addCircle}>
                <TouchableWithoutFeedback onPress={() => handleRouter(isBandejaRoute ? 'Bandeja_mensaje' : 'createPost')}>
                    <Animated.View style={[BottomMenuStyle.button, !isBandejaRoute && rotation]}>
                        <AddCircleWithCross isBandejaRoute={isBandejaRoute} />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
            <View style={BottomMenuStyle.menuBottom}>
                <TouchableOpacity onPress={() => handleRouter("Feed")}>
                    <Icon name='home' size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRouter("Search")}>
                    <Icon name='search' size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRouter('Bandeja')}>
                    <Icon name='mail' size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRouter('Profile')}>
                    <Icon name='person' size={30} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const AddCircleWithCross = ({ isBandejaRoute, size = 70, iconSize = 30 }) => {
    const iconName = isBandejaRoute ? 'envelope' : 'pencil'; // Use 'pencil' instead of 'times'
    return (
        <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesome style={BottomMenuStyle.circleColor} name='circle' size={size} />
            <FontAwesome style={BottomMenuStyle.iconColor} name={iconName} size={iconSize} color='white' />
        </View>
    );
};

export default BottomMenu;
