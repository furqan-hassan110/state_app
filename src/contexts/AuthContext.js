import React, {createContext, useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // user or agent
  const [userData, setUserData] = useState(null);

  const selectRole = selectedRole => {
    setRole(selectedRole);
  };

  const login = async () => {
    try{
    await AsyncStorage.setItem('userToken', 'dummy-token');
    await AsyncStorage.setItem('userRole', role);
    await AsyncStorage.setItem('userData', JSON.stringify(data)); // Store userData in AsyncStorage
    setUserData(data);
    setIsAuthenticated(true);
  }catch(e){
    console.error('Failed to logout:', e);
  }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('userData'); // Remove userData from AsyncStorage
      setRole(null);
      setUserData(null); // Clear user data from state
      setIsAuthenticated(false);
    } catch (e) {
      console.error('Failed to logout:', e);
    }
  };


  const value = {
    isAuthenticated,
    role,
    userData,
    selectRole,
    login,
    logout,
    setUserData, // Expose setUserData to update user data elsewhere
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
