import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import { useLoved } from '../contexts/LovedContext';

const { width, height } = Dimensions.get('window');

const PropertyCard = ({ id, imageSource, title, cityName, country, price }) => {
  const { lovedProperties, setLovedProperties } = useLoved();

  const handleToggleLoved = () => {
    setLovedProperties((prev) => {
      const isAlreadyLoved = prev.some((p) => p.id === id);

      if (isAlreadyLoved) {
        return prev.filter((p) => p.id !== id);
      } else {
        return [...prev, { id, imageSource, title, cityName, country, price }];
      }
    });
  };

  const isLoved = lovedProperties.some((p) => p.id === id);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
        <TouchableOpacity
          style={[styles.heartIcon, { backgroundColor: isLoved ? colors.buttons : 'transparent' }]}
          onPress={handleToggleLoved}
        >
          <MaterialCommunityIcons
            name={isLoved ? 'cards-heart-outline' : 'cards-heart'}
            size={15}
            color='white'
          />
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        {/* <Text style={styles.cityName}>{cityName}</Text> */}
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
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color:colors.boldtextcolor,
    marginBottom:10
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
