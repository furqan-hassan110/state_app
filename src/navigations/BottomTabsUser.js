import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/UserScreens/UserHomeScreen';
import SearchScreen from '../screens/UserScreens/UserSearchScreen';
import LovedScreen from '../screens/UserScreens/UserLovedScreen';
import ProfileScreen from '../screens/UserScreens/UserProfileScreen';

const Tab = createBottomTabNavigator();

const UserBottomTabs = () => {
  return (
    
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Loved') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#204D6C',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: [{ display: 'flex' }, null],
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Search" component={SearchScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Loved" component={LovedScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Profile" component={ProfileScreen}  options={{headerShown:false}}/>
      </Tab.Navigator>
  
  );
}

export default UserBottomTabs;
