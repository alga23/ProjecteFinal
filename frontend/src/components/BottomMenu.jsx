import React, { useState, useRef } from 'react';
import { View, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { BottomMenuStyle } from '../styles/BottomMenuStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BottomMenu = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    const handleRouter = (route) => {
        navigation.navigate(route);
    };

    const toggleMenu = () => {
        const toValue = menuVisible ? 0 : 1;

        Animated.spring(animation, {
            toValue,
            friction: 5,
            useNativeDriver: true
        }).start();

        setMenuVisible(!menuVisible);
    };

    const cameraStyle = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -135]
                })
            }
        ]
    };

    const pencilStyle = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -75]
                })
            }
        ]
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

    return (
        <View style={BottomMenuStyle.container}>
            <View style={BottomMenuStyle.addCircle}>
                <Animated.View style={[BottomMenuStyle.button, BottomMenuStyle.secondary, cameraStyle]}>
                    <AddCircleWithCross name='camera' size={55} iconSize={20} />
                </Animated.View>
                <TouchableWithoutFeedback onPress={() => handleRouter('createPost')}>
                    <Animated.View style={[BottomMenuStyle.button, BottomMenuStyle.secondary, pencilStyle]}>
                        <AddCircleWithCross name='pencil' size={55} iconSize={25} />
                    </Animated.View>
                </TouchableWithoutFeedback>
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
                <TouchableOpacity onPress={() => handleRouter("Search")}>
                    <Icon name='search' size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRouter('Bandeja')}>
                    <Icon name='mail' size={30} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name='person' size={30} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const AddCircleWithCross = ({ name, size = 70, iconSize = 30 }) => {
    return (
        <View style={{ position: 'relative' }}>
            <FontAwesome style={BottomMenuStyle.circleColor} name='circle' size={size} />
            <FontAwesome style={BottomMenuStyle.iconColor} name={name} size={iconSize} color='white' />
        </View>
    );
};

export default BottomMenu;
