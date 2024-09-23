import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the context
export const LovedContext = createContext();

// Custom hook to use the LovedContext
export const useLoved = () => {
  const context = useContext(LovedContext);
  if (context === undefined) {
    throw new Error('useLoved must be used within a LovedProvider');
  }
  return context;
};

// Provider component
export const LovedProvider = ({children}) => {
  const [lovedProperties, setLovedProperties] = useState([]);
  const [subscribedUsers, setSubscribedUsers] = useState([]);

  // Load loved properties and subscribed users from AsyncStorage when the component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedLovedProperties = await AsyncStorage.getItem(
          'lovedProperties',
        );
        const savedSubscribedUsers = await AsyncStorage.getItem(
          'subscribedUsers',
        );

        if (savedLovedProperties) {
          setLovedProperties(JSON.parse(savedLovedProperties));
        }

        if (savedSubscribedUsers) {
          setSubscribedUsers(JSON.parse(savedSubscribedUsers));
        }
      } catch (error) {
        console.error('Failed to load data from storage:', error);
      }
    };

    loadData();
  }, []);

  // Save loved properties and subscribed users to AsyncStorage whenever they change
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(
          'lovedProperties',
          JSON.stringify(lovedProperties),
        );
        await AsyncStorage.setItem(
          'subscribedUsers',
          JSON.stringify(subscribedUsers),
        );
      } catch (error) {
        console.error('Failed to save data to storage:', error);
      }
    };

    saveData();
  }, [lovedProperties, subscribedUsers]);

  // Function to add a loved property
  const addLovedProperty = property => {
    setLovedProperties(prevProperties => {
      const updatedProperties = [...prevProperties, property];
      return updatedProperties;
    });
  };

  const removeLovedPropertyContext = property => {
    setLovedProperties(prevProperties => {
      const updatedProperties = [...prevProperties, property];
      return updatedProperties;
    });
  };

  // Function to add a subscribed user
  const addSubscribedUser = user => {
    setSubscribedUsers(prevUsers => [...prevUsers, user]);
  };

  return (
    <LovedContext.Provider
      value={{
        lovedProperties,
        setLovedProperties,
        addLovedProperty,
        subscribedUsers,
        setSubscribedUsers,
        addSubscribedUser,
      }}>
      {children}
    </LovedContext.Provider>
  );
};
