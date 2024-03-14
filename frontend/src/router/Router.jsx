import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../views/user/Login';
import Welcome from '../views/user/Welcome';
import Feed from '../views/post/Feed';
import Search from '../views/juego/Search';
import VisualizarJuego from '../views/juego/VisualizarJuego';

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator initialRouteName={Feed}>
            <Stack.Screen name='Welcome' options={{headerShown: false}} component={Welcome} />
            <Stack.Screen name='Login' options={{headerShown: false}} component={Login} />
            <Stack.Screen name='Feed' options={{headerShown: false}} component={Feed} />
            <Stack.Screen name='Search' options={{headerShown: false}} component={Search} />
            <Stack.Screen name='ViewGame' options={{headerShown: false}} component={VisualizarJuego} />
        </Stack.Navigator>
    )
}

export default Router;