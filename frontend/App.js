import Welcome from './src/views/user/Welcome';
import Login from './src/views/user/Login';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import Mensajes from './src/views/user/Mensajes';
import MensajesEscritos from './src/views/user/MensajesEscritos';

export default function App() {
  return (
    <SafeAreaView>
      <NavigationContainer>
        <MensajesEscritos/>
      </NavigationContainer>
    </SafeAreaView>
  );
}