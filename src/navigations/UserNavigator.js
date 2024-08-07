import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserHomeScreen from '../screens/UserScreens/UserHomeScreen';
import BottomTabsUser from './BottomTabsUser';
import UserProfileScreen from '../screens/UserScreens/UserProfileScreen';

const Stack = createStackNavigator();

const UserNatigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserBottomTabs" component={BottomTabsUser} options={{ headerShown: false }}/>
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default UserNatigator;
