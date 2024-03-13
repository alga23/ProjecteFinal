import Welcome from './src/views/user/Welcome';
import Login from './src/views/user/Login';
import CreatePost from './src/views/user/CreatePost';
import Profile from './src/views/user/Profile';
import EditProfile from './src/views/user/EditProfile';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <NavigationContainer>
      <EditProfile />
    </NavigationContainer>
  );
}

