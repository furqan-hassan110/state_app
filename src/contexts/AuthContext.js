import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null to handle loading state
  const [role, setRole] = useState(null); // 'user' or 'agent'
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isSubscribed, setIsSubscribed] = useState(false); // Subscription state
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phoneNo: '',
  });

  useEffect(() => {
    // Function to load authentication state from AsyncStorage
    const loadAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const storedRole = await AsyncStorage.getItem('userRole');
        const storedUserData = await AsyncStorage.getItem('userData');
        const subscriptionStatus = await AsyncStorage.getItem('isSubscribed');

        if (token && storedRole && storedUserData) {
          setIsAuthenticated(true);
          setRole(storedRole);
          setUserData(JSON.parse(storedUserData));
          setIsSubscribed(subscriptionStatus === 'true');
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.error('Failed to load auth state:', e);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false); // Stop loading once done
      }
    };

    loadAuthState();
  }, []);

  const selectRole = selectedRole => {
    setRole(selectedRole);
    // Redirect user to UserProfileScreen if they select 'user' role
    // if (selectedRole === 'user') {
    //   navigation.navigate('UserBottomTabs', {screen: 'UserProfileScreen'});
    // }
  };

  const login = async data => {
    const {token, user_type} = data;
    try {
      if (token) {
        await AsyncStorage.setItem('token', token); // Store the token
        console.log('Token stored in AsyncStorage:', token); // Debugging to confirm token is stored
      }
      await AsyncStorage.setItem('userRole', user_type);
      await AsyncStorage.setItem('userData', JSON.stringify(data));
      setUserData(data);
      setIsAuthenticated(true);
      // if (role === 'user') {
      //   console.log('REDIRECTING TO PROFILE SCRREN.');
      //   navigation.navigate('UserBottomTabs', {screen: 'UserProfileScreen'});
      // }
    } catch (e) {
      console.error('Failed to login:', e);
    }
  };

  const handleSubscribe = async () => {
    try {
      // Perform any necessary operations for subscription (API calls, etc.)
      // setIsSubscribed(true);
      await AsyncStorage.setItem('isSubscribed', 'true');
      alert(
        'Your application has been submitted. Please wait for your approval.',
      );
    } catch (e) {
      console.error('Subscription failed:', e);
    }
  };

  const logout = async () => {
    try {
      // Clear user authentication data from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('isSubscribed');

      // Reset the authentication state in the context
      setIsAuthenticated(false);
      setRole(null);
      setUserData({
        name: '',
        email: '',
        phoneNo: '',
      });
      setIsSubscribed(false);

      // Reset navigation stack and redirect to login screen
      navigation.reset({
        index: 0,
        routes: [{name: 'SelectRoleScreen'}], // Adjust according to your actual screen name
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const authContextValue = {
    isAuthenticated,
    role,
    userData,
    isLoading,
    isSubscribed,
    selectRole,
    login,
    contextLogout: logout,
    setUserData,
    handleSubscribe, // Add handleSubscribe to context
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
