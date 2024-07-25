import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import UserStack from './UserStack';
import AgentStack from './AgentStack';
import { useAuth } from './authcontext';
import Login from './Login';
import Rolesc from '../screens/Rolesc';
import RegisterScreen from './RegisterScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated, role } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    {!role ? (
      <Stack.Screen name="RoleSelection" component={Rolesc} />
    ) : (
      <Stack.Screen name="Login" component={Login} />
    )}
     <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="UserStack" component={UserStack} />
    <Stack.Screen name="AgentStack" component={AgentStack} />
  </Stack.Navigator>
  );
};

export default RootNavigator;
