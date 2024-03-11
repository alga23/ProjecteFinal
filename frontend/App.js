import Welcome from './src/views/user/Welcome';
import Login from './src/views/user/Login';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { VistaStyle } from './src/styles/VistaStyle';
import Feed from './src/views/post/Feed';

export default function App() {
  return (
    <SafeAreaView style={VistaStyle.container}>
      <NavigationContainer>
        <Feed />
      </NavigationContainer>
    </SafeAreaView>
  );
}

