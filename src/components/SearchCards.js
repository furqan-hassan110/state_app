import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
<<<<<<< HEAD
import img1 from '../../assets/images/role1.png';
=======
import img1 from '../../assets/images/role1.png'; 
>>>>>>> 005a42c (crud agent)

const { width, height } = Dimensions.get('window');

const SearchResultCard = ({ item }) => {
<<<<<<< HEAD

  const [isFavorite, setIsFavorite] = useState(false);

=======
  const [isFavorite, setIsFavorite] = useState(false);


>>>>>>> 005a42c (crud agent)
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

<<<<<<< HEAD
  const imageSource = item.image && item.image !== '' ? { uri: item.image } : img1;
=======
  const imageSource = item?.image && item.image !== '' ? { uri: item.image } : img1;
>>>>>>> 005a42c (crud agent)

  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.imageWrapper}>
        <Image source={imageSource} style={styles.image} />
<<<<<<< HEAD
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
=======
        
        
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
>>>>>>> 005a42c (crud agent)
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
<<<<<<< HEAD
    backgroundColor: '#fff',
=======
    backgroundColor: colors.textinputfill,
>>>>>>> 005a42c (crud agent)
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 16,
    marginHorizontal: 8,
    width: width * 0.43,
    padding: 10,
<<<<<<< HEAD
    backgroundColor: colors.textinputfill,
=======
>>>>>>> 005a42c (crud agent)
    height: height * 0.25,
  },
  imageWrapper: {
    borderRadius: 15,
    overflow: 'hidden',
<<<<<<< HEAD
    position: 'relative', // Contains the absolute positioned elements
=======
    position: 'relative',
>>>>>>> 005a42c (crud agent)
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 15,
  },
  heartIcon: {
    position: 'absolute',
<<<<<<< HEAD
    top: 5,  // Positioned at the top of the image
    left: 100,  // Positioned to the left of the image
=======
    top: 5,
    right: 10,
>>>>>>> 005a42c (crud agent)
    width: width * 0.075,
    height: height * 0.037,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    zIndex: 1,
  },
  priceText: {
    position: 'absolute',
<<<<<<< HEAD
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
=======
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
>>>>>>> 005a42c (crud agent)
  },
  locationText: {
    fontSize: 10,
    color: '#777',
<<<<<<< HEAD
    // marginHorizontal: 8,/
    // marginBottom: 8,
=======
    marginLeft: 4,
>>>>>>> 005a42c (crud agent)
  },
});

export default SearchResultCard;
