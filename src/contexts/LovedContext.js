// contexts/LovedContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the context
export const LovedContext = createContext();

// Create a custom hook to use the LovedContext
export const useLoved = () => {
    const context = useContext(LovedContext);
    if (context === undefined) {
        throw new Error('useLoved must be used within a LovedProvider');
    }
    return context;
};

// Create the provider component
export const LovedProvider = ({ children }) => {
    const [lovedProperties, setLovedProperties] = useState([]);

    // Load loved properties from AsyncStorage when the component mounts
    useEffect(() => {
        const loadLovedProperties = async () => {
            try {
                const savedLovedProperties = await AsyncStorage.getItem('lovedProperties');
                if (savedLovedProperties) {
                    setLovedProperties(JSON.parse(savedLovedProperties));
                }
            } catch (error) {
                console.error('Failed to load loved properties from storage:', error);
            }
        };

        loadLovedProperties();
    }, []);

    // Save loved properties to AsyncStorage whenever they change
    useEffect(() => {
        const saveLovedProperties = async () => {
            try {
                await AsyncStorage.setItem('lovedProperties', JSON.stringify(lovedProperties));
            } catch (error) {
                console.error('Failed to save loved properties to storage:', error);
            }
        };

        saveLovedProperties();
    }, [lovedProperties]);

    return (
        <LovedContext.Provider value={{ lovedProperties, setLovedProperties }}>
            {children}
        </LovedContext.Provider>
    );
};
