import React, { createContext, useState, useContext } from 'react';

const LovedContext = createContext();

export const LovedProvider = ({ children }) => {
    const [lovedProperties, setLovedProperties] = useState([]);

    const addToLoved = (property) => {
        setLovedProperties((prevLoved) => {
            const isAlreadyLoved = prevLoved.some((p) => p.id === property.id);
            if (isAlreadyLoved) {
                console.log('Removing from loved:', property);
                return prevLoved.filter((p) => p.id !== property.id);
            } else {
                console.log('Adding to loved:', property);
                return [...prevLoved, property];
            }
        });
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
