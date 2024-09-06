import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';

const { width, height } = Dimensions.get('window');

const PropertyCardForAgent = ({ 
  id, 
  images, 
  propertyCategory, 
  propertyType, 
  listingType, 
  sellPrice, 
  rentPrice, 
  rentType, 
  bedrooms, 
  bathrooms, 
  carSpace, 
  totalRooms 
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        {/* Assuming images is an array, display the first image as the main one */}
        {/* <Image source={images[0]} style={styles.image} /> */}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.propertyCategory}>{propertyCategory}</Text>
        <Text style={styles.propertyType}>{propertyType}</Text>
        <Text style={styles.listingType}>{listingType}</Text>
        <View style={styles.priceContainer}>
          {sellPrice && <Text style={styles.price}>Sell: ${sellPrice}</Text>}
          {rentPrice && <Text style={styles.price}>Rent: ${rentPrice} {rentType}</Text>}
        </View>
        <View style={styles.featuresContainer}>
          <Text style={styles.feature}>Bedrooms: {bedrooms}</Text>
          <Text style={styles.feature}>Bathrooms: {bathrooms}</Text>
          <Text style={styles.feature}>Car Space: {carSpace}</Text>
          <Text style={styles.feature}>Total Rooms: {totalRooms}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    width: width * 0.9,
    height: height * 0.28,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    marginTop: 10,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    width:width*1,
    height:height*0.3,
    flex: 1,
    padding: 10,
  },
  propertyCategory: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.boldtextcolor,
  },
  propertyType: {
    fontSize: 12,
    color: colors.boldtextcolor,
  },
  listingType: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: 'bold',
  },
  priceContainer: {
    marginVertical: 10,
  },
  price: {
    fontSize: 14,
    color: colors.boldtextcolor,
  },
  featuresContainer: {
    marginTop: 10,
  },
  feature: {
    fontSize: 12,
    color: colors.boldtextcolor,
  },
});

export default PropertyCardForAgent;