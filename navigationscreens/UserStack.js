import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserHomeScreen from '../screens/userstack/userHome';

const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserHome" component={UserHomeScreen} />
    </Stack.Navigator>
  );
};

export default UserStack;
