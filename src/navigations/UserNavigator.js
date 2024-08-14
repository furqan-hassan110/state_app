import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserHomeScreen from '../screens/UserScreens/UserHomeScreen';
import BottomTabsUser from './BottomTabsUser';
import UserFilter from '../screens/UserScreens/UserFilter';


const Stack = createStackNavigator();

const UserNatigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserBottomTabs" component={BottomTabsUser} options={{ headerShown: false }}/>
      <Stack.Screen name="userFilter" component={UserFilter} />
    </Stack.Navigator>
  );
};

export default UserNatigator;
