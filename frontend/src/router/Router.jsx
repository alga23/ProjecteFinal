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
import EditProfile from '../views/user/EditProfile';
import { useNavigation } from '@react-navigation/native'
import { Global } from '../utils/Global'
import useFetch from '../hooks/useFetch'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, StyleSheet, Image, Text, TouchableOpacity } from "react-native"
import * as SecureStore from 'expo-secure-store'
import Profile from '../views/user/Profile';
import FollowList from '../views/follow/FollowList';
import Chat from '../views/chat/Chat';
import useAuth from '../hooks/useAuth';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()

//Log Out Item for the DrawerContainer
function CustomDrawerContent(props) {
    const navigation = useNavigation();
    const { auth, setAuth, counters } = useAuth({});

    const handleLogout = async () => {
        //notifyMessage('Logout successfully.')
        //Reset the navigation so the user can't go back to the App after logging out
        navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
        })
        await SecureStore.deleteItemAsync('token')
        await SecureStore.deleteItemAsync('user');
        setAuth({});
    }

    return (
        <DrawerContentScrollView {...props}>
            {/* Sección de la imagen */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile', { profileId: auth._id })}>
                    <Image
                        source={{ uri: auth.imagen === 'default.png' ? Global.url_default : auth.imagen }} // Aquí debes poner la ruta de tu imagen
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.nick}>{auth.nick}</Text>
            <Text style={styles.username}>@{auth.username}</Text>
            <View style={styles.containerFollows}>
                <TouchableOpacity onPress={() => navigation.navigate('FollowList', { id: [auth._id, type = "following"] })}>
                    <Text style={styles.follows}><Text style={styles.contadorFollows}>{counters.following}</Text> Siguiendo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('FollowList', { id: [auth._id, type = "followers"] })}>
                    <Text style={styles.follows}><Text style={styles.contadorFollows}>{counters.followers}</Text> Seguidores</Text>
                </TouchableOpacity>
            </View>
            {/* Línea de separación */}
            <View style={styles.separator} />
            {/* Resto del contenido del Drawer */}
            <DrawerItemList {...props} />
            <DrawerItem label="Log out" onPress={() => handleLogout()} />
        </DrawerContentScrollView>
    );
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
                    <Stack.Screen name='Chat' options={{ headerShown: false }} component={Chat} />
                    <Stack.Screen name='Edit' options={{ headerShown: false }} component={EditProfile} />
                </Stack.Navigator>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 15
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 15,
    },
    nick: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 12,
        marginTop: 5,
    },
    username: {
        fontSize: 14,
        marginLeft: 12,
        marginBottom: 15,
        color: '#666666'
    },
    containerFollows: {
        flexDirection: 'row',
        gap: 10,
        marginLeft: 10
    },
    follows: {
        fontSize: 14,
        color: '#666666'
    },
    contadorFollows: {
        fontWeight: 'bold',
        color: '#000000'
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
});