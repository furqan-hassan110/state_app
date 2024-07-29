import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserHomeScreen from '../screens/UserScreens/UserHomeScreen';
import BottomTabsUser from './BottomTabsUser';

const Stack = createStackNavigator();

const UserNatigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserBottomTabs" component={BottomTabsUser} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default UserNatigator;
