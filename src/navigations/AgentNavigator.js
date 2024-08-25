import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AgentHomeScreen from '../screens/AgentScreens/AgentHomeScreen';
import BottomTabsAgent from './BottomTabAgent';
import AddListingScreen from '../screens/AgentScreens/AddListingScreen';


const Stack = createStackNavigator();

const AgentNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BottomTabAgent" component={BottomTabsAgent} options={{ headerShown: false }}/>
      <Stack.Screen name="AddListingScreen" component={AddListingScreen} options={{ headerShown: false }}/>
      {/* <Stack.Screen name="BottomTabAgent" component={AgentHomeScreen} options={{ headerShown: false }}/> */}
    </Stack.Navigator>
  );
};

export default AgentNavigator;
