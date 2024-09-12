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

  const imageSource = item?.image && item.image !== '' ? { uri: item.image } : img1;

  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.imageWrapper}>
        <Image source={imageSource} style={styles.image} />
        
        
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
        
        
        <Text style={styles.priceText}>${item?.sellingPrice || 'N/A'}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{item?.title || 'No Title'}</Text>
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons name="map-marker" size={12} color={colors.boldtextcolor} />
        <Text style={styles.locationText}>{item?.location || 'Unknown Location'}</Text>
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
