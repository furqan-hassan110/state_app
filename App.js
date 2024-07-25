import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './navigationscreens/authcontext';
import RootNavigator from './navigationscreens/RootNavigator';
import { StatusBar } from 'react-native';


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

const styles = StyleSheet.create({

});

export default App;
