import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Alert  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { deleteCategory } from '../utils/apiUtils';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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
  totalRooms,
  token, // pass the token for authentication
  onRefresh  // Callback for deleting the property
}) => {

  const handleDelete = () => {
    console.log(id)
    Alert.alert(
      'Delete Property',
      'Are you sure you want to delete this property category?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          
          onPress: async () => {
            try {
              await deleteCategory(id,token); // Call the delete API
              onRefresh(); // Refresh the property list after deletion
              Alert.alert('Success', 'Property category deleted successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete property category');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
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
      {/* <TouchableOpacity style={{marginTop:10}}>
        <MaterialCommunityIcons color={colors.black} name={'dots-vertical'} size={25}/>
      </TouchableOpacity> */}
      <Menu>
        <MenuTrigger style={{marginTop:10}}>
          <MaterialCommunityIcons color={colors.black} name={'dots-vertical'} size={25} />
        </MenuTrigger>
        <MenuOptions>
        
            <TouchableOpacity>
            <MenuOption >
            <Text style={styles.menuText}>Update</Text>
            </MenuOption>
            </TouchableOpacity>
          
          
            <TouchableOpacity>
            <MenuOption onSelect={handleDelete}>
            <Text style={styles.menuText}>Delete</Text>
            </MenuOption>
            </TouchableOpacity>
          
        </MenuOptions>
      </Menu>
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
  menuText: {
    padding: 10,
    fontSize: 16,
    color: colors.black,
  },
});


export default PropertyCardForAgent;
