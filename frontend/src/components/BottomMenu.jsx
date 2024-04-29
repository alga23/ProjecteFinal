import React, { useState, useRef } from 'react';
import { View, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { BottomMenuStyle } from '../styles/BottomMenuStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BottomMenu = () => {
    const animation = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

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

    return (
        <View style={BottomMenuStyle.container}>
            <View style={BottomMenuStyle.addCircle}>
                <TouchableWithoutFeedback onPress={() => handleRouter('createPost')}>
                    <Animated.View style={[BottomMenuStyle.button, rotation]}>
                        <AddCircleWithCross name='times' />
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
