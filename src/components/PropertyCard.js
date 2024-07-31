// PropertyCard.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // or 'react-native-vector-icons/FontAwesome' for React Native CLI
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../styles/colors'

const { width, height } = Dimensions.get('window');

const PropertyCard = ({ imageSource, areaName,cityName, country, price }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
        <TouchableOpacity style={[styles.heartIcon , { backgroundColor: isFavorite ? colors.buttons : colors.boldtextcolor }]} onPress={toggleFavorite}>
          <MaterialCommunityIcons name={isFavorite ? "cards-heart" : "cards-heart-outline"} size={15} color={isFavorite ? 'white' : 'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.areaName}>{areaName}</Text>
        <Text style={styles.areaName}>{cityName}</Text>
        <View style={styles.locationContainer}>
          <MaterialCommunityIcons name="map-marker" size={15} color={colors.boldtextcolor} />
          <Text style={styles.country}>{country}</Text>
        </View>
        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    width: width*0.8,
    height: height*0.18,
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
    borderRadius:25,
    width: '100%',
    height: '100%',
  },
  heartIcon: {
    width:width*0.075,
    height:height*0.037,
    position: 'absolute',
    justifyContent:'center',
    alignItems:'center',
    top: 15,
    // right: 5,
    // zIndex: 1,
    left:20,
    borderRadius:50
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
    marginTop: 10,
  },
  country: {
    marginLeft: 5,
    fontFamily:'Lato-Regular',
    fontSize: 10,
    color:colors.boldtextcolor
  },
  price:{
    marginLeft: 5,
    fontFamily:'Lato-Black',
    fontSize: 15,
    color:colors.boldtextcolor,
    top:30
  }
});

export default PropertyCard;
