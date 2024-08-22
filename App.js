import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/contexts/AuthContext';
import RootNavigator from './src/navigations/RootNavigator';
import { LovedProvider } from './src/contexts/LovedContext';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="light-content" />
      <AuthProvider>
        <LovedProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </LovedProvider>
      </AuthProvider>
    </>
  );
}

export default App;
