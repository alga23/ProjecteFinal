import Welcome from './src/views/user/Welcome';
import Login from './src/views/user/Login';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
}

