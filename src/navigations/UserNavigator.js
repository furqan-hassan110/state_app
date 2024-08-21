import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserHomeScreen from '../screens/UserScreens/UserHomeScreen';
import BottomTabsUser from './BottomTabsUser';
import UserFilter from '../screens/UserScreens/UserFilter';
// import ImageSliderScreen from '../components/ImageSliderScreen ';


const Stack = createStackNavigator();

const UserNatigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserBottomTabs" component={BottomTabsUser} options={{ headerShown: false }}/>
      <Stack.Screen name="userFilter" component={UserFilter} />
      {/* <Stack.Screen name="ImageSliderScreen" component={ImageSliderScreen} /> */}
    </Stack.Navigator>
  );
};

export default UserNatigator;
