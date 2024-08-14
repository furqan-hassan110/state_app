
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
import img1 from '../../assets/images/role1.png'

const SearchResultCard = ({ item }) => {
  // const imageSource = (item.image && item.image !== '') 
  //   ? { uri: item.image }
  //   : img1;
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <Image source={'../../assets/images/role1.png'} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.priceText}>${item.price}</Text>
        <Ionicons name="heart-outline" size={24} color={colors.primary} style={styles.heartIcon} />
      </View>
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={styles.locationText}>{item.location}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    marginHorizontal: 8,
    width: '46%',
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  heartIcon: {
    marginRight: 4,
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 8,
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#777',
    marginHorizontal: 8,
    marginBottom: 8,
  },
});

export default SearchResultCard;
