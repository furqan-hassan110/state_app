import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserHomeScreen from '../screens/UserScreens/UserHomeScreen';
import BottomTabsUser from './BottomTabsUser';
import UserFilter from '../screens/UserScreens/UserFilter';
import UserSearch from '../screens/UserScreens/UserSearch'
import PropertyDetail from '../screens/UserScreens/PropertyDetail';
import ImageSlider from '../components/ImageSlider';
import UserSearchScreen from '../screens/UserScreens/UserSearchScreen';
import UserProfileScreen from '../screens/UserScreens/UserProfileScreen';
import SelectRoleScreen from "../screens/AuthScreens/SelectRoleScreen"


const Stack = createStackNavigator();

const UserNatigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserBottomTabs" component={BottomTabsUser} options={{ headerShown: false }}/>
      <Stack.Screen name="userFilter" component={UserFilter} options={{ headerShown: false }} />
      <Stack.Screen name="UserSearch" component={UserSearch} options={{ headerShown: false }} />
      <Stack.Screen name="PropertyDetail" component={PropertyDetail} options={{ headerShown: false }} />
      <Stack.Screen name="ImageSlider" component={ImageSlider} options={{ headerShown: false }} />
      <Stack.Screen name="UserSearchScreen" component={UserSearchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SelectRoleScreen" component={SelectRoleScreen} options={{ headerShown: false }}/>
      {/* <Stack.Screen name="ImageSliderScreen" component={ImageSliderScreen} /> */}
    </Stack.Navigator>
  );
};

export default UserNatigator;
