import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AgentHomeScreen from '../screens/agentstack/AgentHome';

const Stack = createStackNavigator();

const AgentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AgentHome" component={AgentHomeScreen} />
    </Stack.Navigator>
  );
};

export default AgentStack;
