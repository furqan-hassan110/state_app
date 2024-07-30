// PropertyCard.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // or 'react-native-vector-icons/FontAwesome' for React Native CLI
import Entypo from 'react-native-vector-icons/Entypo'
import colors from '../styles/colors'

const { width, height } = Dimensions.get('window');

const PropertyCard = ({ imageSource, areaName,cityName, country }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
        <TouchableOpacity style={styles.heartIcon} onPress={toggleFavorite}>
          <Ionicons name="heart-outline" size={24} color={isFavorite ? 'red' : 'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.areaName}>{areaName}</Text>
        <Text style={styles.areaName}>{cityName}</Text>
        <View style={styles.locationContainer}>
          <Entypo name="map-marker" size={20} color="#000" />
          <Text style={styles.country}>{country}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    width: width*0.8,
    height: height*0.16,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
    padding:10
    
  },
  image: {
    borderRadius:10,
    width: '100%',
    height: '100%',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
    // justifyContent: 'center',
  },
  areaName: {
    fontSize: 12,
    fontWeight: 'bold',
    color:colors.boldtextcolor,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  country: {
    marginLeft: 5,
    fontSize: 16,
  },
});

export default PropertyCard;
