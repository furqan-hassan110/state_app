import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar} from 'react-native';
import {AuthProvider} from './src/contexts/AuthContext';
import RootNavigator from './src/navigations/RootNavigator';
import {LovedProvider} from './src/contexts/LovedContext';
import {NavigationContainer} from '@react-navigation/native';
import {MenuProvider} from 'react-native-popup-menu';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="light-content" />
      <NavigationContainer>
        <MenuProvider>
          <AuthProvider>
            <LovedProvider>
              <RootNavigator />
            </LovedProvider>
          </AuthProvider>
        </MenuProvider>
      </NavigationContainer>
    </>
  );
}

export default App;
