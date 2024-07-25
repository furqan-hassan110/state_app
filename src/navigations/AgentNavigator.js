import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AgentHomeScreen from '../screens/AgentScreens/AgentHomeScreen';

const Stack = createStackNavigator();

const AgentNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AgentHome" component={AgentHomeScreen} />
    </Stack.Navigator>
  );
};

export default AgentNavigator;
