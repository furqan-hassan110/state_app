import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserHomeScreen from '../screens/UserScreens/UserHomeScreen';

const Stack = createStackNavigator();

const UserNatigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserHome" component={UserHomeScreen} />
    </Stack.Navigator>
  );
};

export default UserNatigator;
