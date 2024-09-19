import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Alert  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { deleteCategory } from '../utils/apiUtils';
import { useAuth } from '../contexts/AuthContext';
 import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const PropertyCardForAgent = ({ 
  id, 
  images, 
  title,
  propertyCategory, 
  propertyType, 
  listingType, 
  sellingPrice, 
  rentPrice, 
  rentType, 
  bedrooms, 
  bathrooms, 
  carSpace, 
  totalRooms,
  onRefresh  
}) => {
  const token= useAuth();
  const navigation = useNavigation();

  const handleDelete = () => {
    const { userData } = token;
    const userToken = userData?.token;

    console.log(userToken)
    deleteCategory(id, userToken).then (res=>{
      console.log('PROPERTY DELETED [RES] ==> ', res)
      if(res.success) {
        Alert.alert(
          'Success', 'Property category deleted successfully'
        )
      }else{
        Alert.alert(
          'Error', 'Failed to delete property category'
        )
      }
    }).catch(err=>{
      console.log('PROPERTY DELETED [ERR] ==> ', err)
    })
  };
  const handleUpdate =() =>{
navigation.navigate('EditListingScreen',{id:id})
  }
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={images ? {uri:images}:require('../../assets/images/role1.png')} style={styles.image} />
        <View style={styles.propertyinfocontainer}>
        <Text style={styles.propertyinfo}>{propertyCategory}</Text>
        <Text style={styles.propertyinfo}>{propertyType}</Text>
        <Text style={styles.propertyinfo}>{listingType}</Text>
        </View>
      </View>
     
      <View style={styles.detailsContainer}>
        <Text style={styles.propertyCategory}>{title}</Text>
        
        <View style={styles.priceContainer}>
        <Text style={styles.price}>Sell:$ {sellingPrice}</Text>
          {rentPrice && <Text style={styles.price}>Rent: ${rentPrice} / {rentType}</Text>}
        </View>
        <View style={styles.featuresContainer}>
          {/* <Text style={styles.feature}>Bedrooms: {bedrooms}</Text>
          <Text style={styles.feature}>Bathrooms: {bathrooms}</Text>
          <Text style={styles.feature}>Car Space: {carSpace}</Text>
          <Text style={styles.feature}>Total Rooms: {totalRooms}</Text> */}
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
            <MenuOption onSelect={handleUpdate}>
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
    height: height * 0.19,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    marginTop: 10,
    padding:10
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 15,
  },
  propertyinfocontainer:{
    top:65,
    left: 70,
    width:width*0.15,
    height:height*0.06,
    backgroundColor:colors.boldtextcolor,
    flexDirection:'column',
    position: 'absolute',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 8,
    
  },
  propertyinfo:{
    // position: 'absolute',
    // bottom: 100,
    // right: 5,
    fontSize: 10,
    fontFamily:'Lato-Regular',
    // fontWeight: 'bold',
    color: colors.white,
    // backgroundColor: colors.text,
    // padding: 5,
    // borderRadius: 8,
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
