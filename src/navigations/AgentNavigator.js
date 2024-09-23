import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AgentHomeScreen from '../screens/AgentScreens/AgentHomeScreen';
import BottomTabsAgent from './BottomTabAgent';
import AddListingScreen from '../screens/AgentScreens/AddListingScreen';
import AddListingScreen2 from '../screens/AgentScreens/AddListingScreen2';
import AddListingSscreen3 from '../screens/AgentScreens/AddListingScreen3';
import AgentSearchScreen from '../screens/AgentScreens/AgentSearchScreen';
import EditListingScreen from '../screens/AgentScreens/EditListingScreen';
import AgentProfileScreen from '../screens/AgentScreens/AgentProfileScreen';
import PropertyDetail from '../screens/AgentScreens/propertyDetails';
import AgentSearchResult from '../screens/AgentScreens/AgentSearchResult';
import ImageSlider from '../components/ImageSlider';

const Stack = createStackNavigator();

const AgentNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabAgent"
        component={BottomTabsAgent}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name="AgentSearchScreen" component={AgentSearchScreen} options={{ headerShown: false }}/> */}
      <Stack.Screen
        name="AddListingScreen"
        component={AddListingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddListingScreen2"
        component={AddListingScreen2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddListingScreen3"
        component={AddListingSscreen3}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditListingScreen"
        component={EditListingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AgentProfileScreen"
        component={AgentProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PropertyDetail"
        component={PropertyDetail}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AgentSearchScreen"
        component={AgentSearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AgentSearchResult"
        component={AgentSearchResult}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ImageSlider"
        component={ImageSlider}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="SelectRoleScreen"
        component={SelectRoleScreen}
        options={{headerShown: false}}
      /> */}

      {/* <Stack.Screen name="BottomTabAgent" component={AgentHomeScreen} options={{ headerShown: false }}/> */}
    </Stack.Navigator>
  );
};

export default AgentNavigator;
