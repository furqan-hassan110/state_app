import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null to handle loading state
  const [role, setRole] = useState(null); // 'user' or 'agent'
  // const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

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
        const token = await AsyncStorage.getItem('userToken');
        const storedRole = await AsyncStorage.getItem('userRole');
        const storedUserData = await AsyncStorage.getItem('userData');

        if (token && storedRole && storedUserData) {
          setIsAuthenticated(true);
          setRole(storedRole);
          setUserData(JSON.parse(storedUserData));
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

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
  };

  const login = async (data) => {
    try {
      // Here you would typically make an API call to authenticate the user
      // For demonstration, we'll assume login is always successful
      const dummyToken = 'dummy-token'; // Replace with actual token from API
      await AsyncStorage.setItem('userToken', dummyToken);
      await AsyncStorage.setItem('userRole', role);
      await AsyncStorage.setItem('userData', JSON.stringify(data));
      setUserData(data);
      setIsAuthenticated(true);
    } catch (e) {
      console.error('Failed to login:', e);
    }
  };

  const logout = async () => {
    try {
      // Clear user authentication data from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('userData');
  
      // Reset the authentication state in the context
      setIsAuthenticated(false);
      setRole(null);
      // setUserData(null);
      setUserData({
        name: '',
        email: '',
        phoneNo: '',
      });
  
      // Ensure the navigation stack is reset and directed to the login screen
      // Ensure `navigation` is correctly passed or obtained (use useNavigation if needed)
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }], // Adjust according to your actual screen name
      });
    } 
    catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const authContextValue = {
    isAuthenticated,
    role,
    userData,
    isLoading,
    selectRole,
    login,
    logout,
    setUserData,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
