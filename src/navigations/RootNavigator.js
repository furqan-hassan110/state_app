import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';

// Context
import { useAuth } from '../contexts/AuthContext';

// Screens
import SelectRoleScreen from '../screens/AuthScreens/SelectRoleScreen';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import RegisterScreen from '../screens/AuthScreens/RegisterScreen';
import UserNavigator from './UserNavigator';
import AgentNavigator from './AgentNavigator';
import UserProfileScreen from '../screens/UserScreens/UserProfileScreen';
import AgentProfileScreen from '../screens/AgentScreens/AgentProfileScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    // Show loading indicator while authentication state is being determined
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#204D6C" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // If authenticated, navigate to respective stack based on role
        role === 'user' ? (
          <Stack.Screen name="UserStack" component={UserNavigator} />
        ) : (
          <Stack.Screen name="AgentStack" component={AgentNavigator} />
        )
      ) : (
        // If not authenticated, show authentication flow
        <>
          <Stack.Screen name="SelectRoleScreen" component={SelectRoleScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
          <Stack.Screen name="AgentProfileScreen" component={AgentProfileScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
