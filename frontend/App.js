import Welcome from './src/views/user/Welcome';
import Login from './src/views/user/Login';
import { NavigationContainer } from '@react-navigation/native';
import Registro from './src/views/user/Registro';


export default function App() {
  return (
    <NavigationContainer>
      <Mensajes/>
    </NavigationContainer>
  );
}

