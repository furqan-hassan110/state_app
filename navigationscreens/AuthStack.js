import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Rolesc from '../screens/Rolesc';
import Login from '../navigationscreens/Login';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name="RoleSelection" component={Rolesc} />
      <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
