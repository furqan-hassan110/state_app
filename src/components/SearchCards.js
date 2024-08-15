import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import img1 from '../../assets/images/role1.png';

const { width, height } = Dimensions.get('window');

const SearchResultCard = ({ item }) => {

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const imageSource = item.image && item.image !== '' ? { uri: item.image } : img1;

  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.imageWrapper}>
        <Image source={imageSource} style={styles.image} />
        {/* Favorite Icon in the top-left corner */}
        <TouchableOpacity 
          style={[styles.heartIcon, { backgroundColor: isFavorite ? colors.buttons : colors.textinputfill }]} 
          onPress={toggleFavorite}
        >
          <MaterialCommunityIcons 
            name={isFavorite ? "cards-heart" : "cards-heart-outline"} 
            size={15} 
            color={isFavorite ? 'white' : 'red'} 
          />
        </TouchableOpacity>
        <Text style={styles.priceText}>${item.price}</Text>
      </View>
      <View style={styles.textContainer}>
        {/* Removed unnecessary Text and Ionicons */}
      </View>
      <Text style={styles.titleText}>{item.Title}</Text>
      <View style={{flexDirection:'row'
      }}>
      <MaterialCommunityIcons name="map-marker" size={12} color={colors.boldtextcolor} />
      <Text style={styles.locationText}>{item.areaName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 16,
    marginHorizontal: 8,
    width: width * 0.43,
    padding: 10,
    backgroundColor: colors.textinputfill,
    height: height * 0.25,
  },
  imageWrapper: {
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative', // Contains the absolute positioned elements
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 15,
  },
  heartIcon: {
    position: 'absolute',
    top: 5,  // Positioned at the top of the image
    left: 100,  // Positioned to the left of the image
    width: width * 0.075,
    height: height * 0.037,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    zIndex: 1,
  },
  priceText: {
    position: 'absolute',
    bottom: 5, // Adjusts the distance from the bottom of the image
    right: 5, // Positions the text from the right edge of the image
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: colors.text, // Semi-transparent background
    padding: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  titleText: {
    color:colors.boldtextcolor,
    fontSize: 12,
    fontFamily:'Lato-Regular',
    // fontWeight: 'bold',
    // marginHorizontal: 8,
    // marginBottom: 14,
  },
  locationText: {
    fontSize: 10,
    color: '#777',
    // marginHorizontal: 8,/
    // marginBottom: 8,
  },
});

export default SearchResultCard;
