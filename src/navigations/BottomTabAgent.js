import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/AgentScreens/AgentHomeScreen';
import SearchScreen from '../screens/AgentScreens/AgentSearchScreen';
import LovedScreen from '../screens/AgentScreens/AgentLovedScreen';
import ProfileScreen from '../screens/AgentScreens/AgentProfileScreen';

const Tab = createBottomTabNavigator();

const AgentBottomTabs = () => {
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
              iconName = focused ? 'add-circle' : 'add-circle-outline';
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

export default AgentBottomTabs;
