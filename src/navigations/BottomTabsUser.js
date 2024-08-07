import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserHomeScreen from '../screens/UserScreens/UserHomeScreen';
import UserSearchScreen from '../screens/UserScreens/UserSearchScreen';
import UserLovedScreen from '../screens/UserScreens/UserLovedScreen';
import UserProfileScreen from '../screens/UserScreens/UserProfileScreen';
import colors from '../styles/colors';

const Tab = createBottomTabNavigator();

const UserBottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Search':
              iconName = 'search';
              break;
            case 'Loved':
              iconName = 'heart';
              break;
              case 'Profile':
                iconName = 'person';
                break;
            default:
              iconName = 'circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.boldtextcolor,
        inactiveTintColor: 'gray',
      }}
    >
      
      <Tab.Screen name="Home" component={UserHomeScreen} options={{headerShown:false}}/>
      <Tab.Screen name="Search" component={UserSearchScreen} />
      <Tab.Screen name="Loved" component={UserLovedScreen} />
      <Tab.Screen name="Profile" component={UserProfileScreen} options={{headerShown:false}}/>
    </Tab.Navigator>
  );
};

export default UserBottomTabs;
