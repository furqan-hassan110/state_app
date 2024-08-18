import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SelectRoleScreen from '../screens/AuthScreens/SelectRoleScreen';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import RegisterScreen from '../screens/AuthScreens/RegisterScreen';
import UserNatigator from './UserNavigator';
import AgentNavigator from './AgentNavigator';
import UserProfileScreen from '../screens/UserScreens/UserProfileScreen';
import UserFilter from '../screens/UserScreens/UserFilter';
import UserSearch from '../screens/UserScreens/UserSearch';
import UserSearchScreen from '../screens/UserScreens/UserSearchScreen';
import PropertyDetail from '../screens/UserScreens/PropertyDetail';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="RoleSelection" component={SelectRoleScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="UserStack" component={UserNatigator} />
      <Stack.Screen name="UserFilter" component={UserFilter} />
      <Stack.Screen name="UserSearch" component={UserSearch} />
      <Stack.Screen name="UserSearchScreen" component={UserSearchScreen} />
      <Stack.Screen name="PropertyDetail" component={PropertyDetail} />
      <Stack.Screen name="AgentStack" component={AgentNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
