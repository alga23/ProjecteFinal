import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { VistaStyle } from './src/styles/VistaStyle';
import Router from './src/router/Router';
import { UserDetailsProvider } from './src/context/UserDetailsContext';

export default function App() {
  return (
    <SafeAreaView style={VistaStyle.container}>
      <NavigationContainer>
        <UserDetailsProvider>
          <Router />
        </UserDetailsProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}