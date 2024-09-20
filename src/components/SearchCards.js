import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import img1 from '../../assets/images/role1.png'; 
import { useLoved } from '../contexts/LovedContext';
import { useAuth } from '../contexts/AuthContext';
import { addLovedProperty, removeLovedProperties } from '../utils/apiUtils';

const { width, height } = Dimensions.get('window');

const SearchResultCard = ({ id, imageSource, title, location, cityName, country, price, isLovedScreen }) => {
  const { lovedProperties, setLovedProperties } = useLoved();
  const { userData } = useAuth();
  const userToken = userData?.token;

  const isLoved = lovedProperties.some((p) => p.id === id);

  const handleToggleLoved = () => {
    if (isLoved) {
      // Remove property from loved list
      removeLovedProperties(id, userToken)
        .then(response => {
          setLovedProperties(prev => prev.filter(p => p.id !== id));
          ToastAndroid.show('Property removed from loved list', ToastAndroid.SHORT);
          console.log("Loved Property Removed:", response);
        })
        .catch(error => console.log("Error Removing Loved Property:", error));
    } else if (!isLovedScreen) {
      // Add property to loved list only if it's not the loved screen
      addLovedProperty(id, userToken)
        .then(response => {
          setLovedProperties(prev => [...prev, { id, imageSource, title, cityName, country, price }]);
          ToastAndroid.show('Property added to loved list', ToastAndroid.SHORT);
          console.log("Loved Property Added:", response);
        })
        .catch(error => console.log("Error Adding Loved Property:", error));
    }
  };

  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.imageWrapper}>
        <Image source={imageSource} style={styles.image} />
        
        <TouchableOpacity
          style={[styles.heartIcon, { backgroundColor: isLoved ? colors.buttons : 'transparent' }]}
          onPress={handleToggleLoved}
        >
          <MaterialCommunityIcons
            name={isLoved ? 'cards-heart' : 'cards-heart-outline'}
            size={15}
            color='white'
          />
        </TouchableOpacity>
        
        <Text style={styles.priceText}>${price || 'N/A'}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title || 'No Title'}</Text>
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons name="map-marker" size={12} color={colors.boldtextcolor} />
        <Text style={styles.locationText}>{location || 'Unknown Location'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.textinputfill,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 16,
    marginHorizontal: 8,
    width: width * 0.43,
    padding: 10,
    height: height * 0.25,
  },
  imageWrapper: {
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 15,
  },
  heartIcon: {
    position: 'absolute',
    top: 5,
    right: 10,
    width: width * 0.075,
    height: height * 0.037,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    zIndex: 1,
  },
  priceText: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: colors.text,
    padding: 5,
    borderRadius: 8,
  },
  textContainer: {
    marginTop: 8,
  },
  titleText: {
    color: colors.boldtextcolor,
    fontSize: 12,
    fontFamily: 'Lato-Regular',
  },
  locationText: {
    fontSize: 10,
    color: '#777',
    marginLeft: 4,
  },
});

export default SearchResultCard;
