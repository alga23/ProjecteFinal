import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../views/user/Login';
import Welcome from '../views/user/Welcome';
import Feed from '../views/post/Feed';
import Search from '../views/juego/Search';
import VisualizarJuego from '../views/juego/VisualizarJuego';
import Registro from '../views/user/Registro';
import Mensajes from '../views/user/Mensajes';
import MensajesEscritos from '../views/user/MensajesEscritos';
import CreatePost from '../views/user/CreatePost';
import { useNavigation } from '@react-navigation/native'
import { Global } from '../utils/Global'
import useFetch from '../hooks/useFetch'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from "react-native"
import * as SecureStore from 'expo-secure-store'
import Profile from '../views/user/Profile';
import FollowList from '../views/follow/FollowList';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()

//Log Out Item for the DrawerContainer
function CustomDrawerContent(props) {
    const navigation = useNavigation()

    const handleLogout = async () => {
        //notifyMessage('Logout successfully.')
        //Reset the navigation so the user can't go back to the App after logging out
        navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
        })
        await SecureStore.deleteItemAsync('token')

    }

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Log out " onPress={() => handleLogout()} />
        </DrawerContentScrollView>
    )
}

//Drawer Container
export const DrawerNavigator = () => {

    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}
            drawerType="slide"
            screenOptions={{ headerShown: false, drawerPosition: 'right' }}
            initialRouteName="Feed">
            <Drawer.Screen
                name="Feed"
                component={Feed}
            />
            <Drawer.Screen
                name="Search"
                component={Search}
            />
            <Drawer.Screen
                name="createPost"
                component={CreatePost}
                options={{
                    drawerItemStyle: { display: 'none' }
                }}
            />
        </Drawer.Navigator>
    )
}


//App navigation with stack and checking for a Token to load "Home(Drawer)" or "Welcome" page
export default function Router() {
    const [firstScreen, setFirstScreen] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const { fetchData } = useFetch();

    const LoadingIndicator = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );

    const checkTokenAndNavigate = async () => {
        try {
            const token = await SecureStore.getItemAsync('token')

            if (token == null) {
                setFirstScreen("Welcome")
            } else {
                const responseUserDetails = await fetchData(Global.url + 'user/devolverUsuarioToken', 'GET');

                setTimeout(() => {
                    if (JSON.stringify(responseUserDetails.status) === 'success') {
                        setFirstScreen("Feed")
                    } else {
                        setFirstScreen("Welcome")
                        //notifyMessage("There was an error.")
                    }
                }, 5000)
            }
        } catch (error) {
            console.error('Error checking token:', error)
            //notifyMessage("There was an error.")
            setFirstScreen("Welcome")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        checkTokenAndNavigate()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <Stack.Navigator initialRouteName={firstScreen}>
                    <Stack.Screen name="Drawer" options={{ headerShown: false }} component={DrawerNavigator} />
                    <Stack.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
                    <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
                    <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
                    <Stack.Screen name="SignUp" options={{ headerShown: false }} component={Registro} />
                    <Stack.Screen name='Search' options={{ headerShown: false }} component={Search} />
                    <Stack.Screen name='Bandeja' options={{ headerShown: false }} component={Mensajes} />
                    <Stack.Screen name='Bandeja_mensaje' options={{ headerShown: false }} component={MensajesEscritos} />
                    <Stack.Screen name='ViewGame' options={{ headerShown: false }} component={VisualizarJuego} />
                    <Stack.Screen name='FollowList' options={{ headerShown: false }} component={FollowList} />
                </Stack.Navigator>
            )}
        </View>
    )
}
