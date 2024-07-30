import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import colors from '../styles/colors';

const Category = ({ title, onPress, isSelected }) => {
    return (
        
            <TouchableOpacity
                style={[styles.categoryContainer, isSelected && styles.selectedCategory]}
                onPress={onPress}
            >
                <Text style={[styles.categoryText, isSelected && styles.selectedtext]}>{title}</Text>
            </TouchableOpacity>
      
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: colors.textinputfill,
        marginRight: 10,

    },
    selectedCategory: {
        backgroundColor: colors.boldtextcolor,
    },
    selectedtext:{
        color:colors.white
    },
    categoryText: {
        color: colors.boldtextcolor,
        fontSize:12,
        fontFamily:'Lato-Medium'
    },
});

export default Category;
