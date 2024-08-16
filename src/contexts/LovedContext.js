// LovedContext.js
import React, { createContext, useState, useContext } from 'react';

const LovedContext = createContext();

export const LovedProvider = ({ children }) => {
    const [lovedProperties, setLovedProperties] = useState([]);

    const addToLoved = (property) => {
        setLovedProperties((prevLoved) => [...prevLoved, property]);
    };

    const removeFromLoved = (id) => {
        setLovedProperties((prevLoved) => prevLoved.filter((property) => property.id !== id));
    };

    const isLoved = (id) => {
        return lovedProperties.some((property) => property.id === id);
    };

    return (
        <LovedContext.Provider value={{ lovedProperties, addToLoved, removeFromLoved, isLoved }}>
            {children}
        </LovedContext.Provider>
    );
};

export const useLoved = () => {
    return useContext(LovedContext);
};
