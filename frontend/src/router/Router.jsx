import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../views/user/Login';
import Welcome from '../views/user/Welcome';
import Feed from '../views/post/Feed';
import Search from '../views/juego/Search';
import VisualizarJuego from '../views/juego/VisualizarJuego';
import Registro from '../views/user/Registro';
import Mensajes from '../views/user/Mensajes';
import MensajesEscritos from '../views/user/MensajesEscritos';

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator initialRouteName={Welcome}>
            <Stack.Screen name='Welcome' options={{ headerShown: false }} component={Welcome} />
            <Stack.Screen name='Login' options={{ headerShown: false }} component={Login} />
            <Stack.Screen name='SignUp' options={{ headerShown: false }} component={Registro} />
            <Stack.Screen name='Feed' options={{ headerShown: false }} component={Feed} />
            <Stack.Screen name='Search' options={{ headerShown: false }} component={Search} />
            <Stack.Screen name='Bandeja' options={{ headerShown: false }} component={Mensajes} />
            <Stack.Screen name='Bandeja_mensaje' options={{ headerShown: false }} component={MensajesEscritos} />
            <Stack.Screen name='ViewGame' options={{ headerShown: false }} component={VisualizarJuego} />
        </Stack.Navigator>
    )
}

export default Router;