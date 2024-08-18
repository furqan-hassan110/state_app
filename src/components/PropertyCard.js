// PropertyCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import { useLoved } from '../contexts/LovedContext';

const { width, height } = Dimensions.get('window');

const PropertyCard = ({ id, imageSource, areaName, cityName, country, price }) => {
    const { isLoved, addToLoved, removeFromLoved } = useLoved();
    const isFavorite = isLoved(id);

    const handleAddToLoved = () => {
      const property = { id, imageSource, areaName, cityName, country, price };
      addToLoved(property);
  };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
                <Image source={imageSource} style={styles.image} />
                <TouchableOpacity
                    style={[styles.heartIcon, { backgroundColor: isFavorite ? colors.buttons : colors.boldtextcolor }]}
                    onPress={handleAddToLoved}>
                    <MaterialCommunityIcons
                        name={isFavorite ? 'cards-heart' : 'cards-heart-outline'}
                        size={15}
                        color='white'
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.areaName}>{areaName}</Text>
                <Text style={styles.cityName}>{cityName}</Text>
                <View style={styles.locationContainer}>
                    <MaterialCommunityIcons name='map-marker' size={15} color={colors.boldtextcolor} />
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
    marginTop:10
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
    margin:20,
    zIndex: 1,
    borderRadius:50
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
  },
  areaName: {
    fontSize: 12,
    fontWeight: 'bold',
    color:colors.boldtextcolor,
  },
  cityName:{
    fontSize: 12,
    fontWeight: 'bold',
    color:colors.boldtextcolor,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  country: {
    marginLeft: 5,
    fontFamily:'Lato-Regular',
    fontSize: 10,
    color:colors.boldtextcolor
  },
  price:{
    marginTop: 40,
    fontFamily:'Lato-Black',
    fontSize: 15,
    color:colors.boldtextcolor,
  }
});

export default PropertyCard;
