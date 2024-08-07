import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SelectRoleScreen from '../screens/AuthScreens/SelectRoleScreen';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import RegisterScreen from '../screens/AuthScreens/RegisterScreen';
import UserNatigator from './UserNavigator';
import AgentNavigator from './AgentNavigator';
import UserProfileScreen from '../screens/UserScreens/UserProfileScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="RoleSelection" component={SelectRoleScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="UserStack" component={UserNatigator} />
      <Stack.Screen name="AgentStack" component={AgentNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
