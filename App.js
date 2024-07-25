import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {AuthProvider} from './src/contexts/AuthContext';
import RootNavigator from './src/navigations/RootNavigator';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="light-content" />
      <NavigationContainer>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </NavigationContainer>
    </>
  );
}

export default App;
