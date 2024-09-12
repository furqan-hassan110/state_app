// UserHomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { LovedProvider } from '../../contexts/LovedContext';
import logo from '../../../assets/images/logo.png';
import profile from '../../../assets/images/profile.png';
import SearchBar from '../../components/SearchBar';
import Category from '../../components/Category';
import PropertyCard from '../../components/PropertyCard';
import colors from '../../styles/colors';
import Homecards from '../../components/Homecards';
import { getProperties } from '../../utils/apiUtils';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { width, height } = Dimensions.get('window');

const propertyDetail = [
  { id: '1', category: 'flat',Title: 'Bungalow House', areaName: 'Western Bay', cityName: 'New Castle', country: 'USA', price: '$ 2M',bedroom:"2",bathroom:'3', garage:'2', imageSource: require('../../../assets/images/role1.png') },
  { id: '2', category: 'house',Title: 'Bungalow House', areaName: 'Downtown', cityName: 'New Castle', country: 'Canada', price: '$ 2M',bedroom:"2",bathroom:'3', garage:'2', imageSource: require('../../../assets/images/role2.png') },
  { id: '3', category: 'apartment',Title: 'Bungalow House', areaName: 'Green Acres', cityName: 'New Castle', country: 'Australia', price: '$ 2M',bedroom:"2",bathroom:'3', garage:'2', imageSource: require('../../../assets/images/role3.png') },
  { id: '4', category: 'office',Title: 'Bungalow House', areaName: 'Sunset Blvd', cityName: 'New Castle', country: 'USA', price: '$ 2M',bedroom:"2",bathroom:'3', garage:'2', imageSource: require('../../../assets/images/role4.png') },
  { id: '5', category: 'floor',Title: 'Bungalow House', areaName: 'Shibuya', cityName: 'New Castle', country: 'Japan', price: '$ 2M',bedroom:"2",bathroom:'3', garage:'2', imageSource: require('../../../assets/images/role1.png') },
];

const AgentHomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); 
        console.log("Retrieved token:", token); 

        if (token) {
          const res = await getProperties(token); 
          console.log("[RES - GET ALL PROPERTIES] ==> ", res);
          setProperties(res?.data || []); 
        } else {
          console.log("Token not found"); 
        }
      } catch (err) {
        console.log("[RES - GET ALL PROPERTIES] ==> ", err);
      }
    };
    fetchProperties();
  }, []);

  

  const filterResults = (category) => {
    setSelectedCategory(category);
  };

  const handlePropertyClick = (item) => {
    
    // navigation.navigate('PropertyDetail', { property: item });
    // console.log("go")
  };

  return (
    <LovedProvider>
      <View style={styles.container}>
        <View style={styles.logoprofilecontainer}>
          <Image source={logo} style={styles.logo} />
          <View style={styles.profilecontainer}>
            <Image source={profile} style={styles.profile} />
          </View>
        </View>
        <View style={styles.namecontainer}>
          <Text style={styles.text}>Hey</Text>
          <Text style={styles.nametext}>Cynthia!</Text>
        </View>
        <Text style={styles.text1}>Let's start exploring</Text>
        <View style={{marginRight:80, flexDirection:'row', alignItems:'center'}}>
        <SearchBar
        customWidth={width*0.95}
        customHeight={height*0.07}
          // width={width*0.7}
          // height={height*0.1} 
          placeholder="Search for properties" 
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        {/* <View style={{width:width*0.13, height:height*0.06, backgroundColor:colors.buttons,borderRadius:100, justifyContent:'center', alignItems:'center', marginLeft:10}}>
        <MaterialCommunityIcons name={"plus"} size ={20} color={colors.white}/>
        </View> */}
        </View>
        <ScrollView>
          <View>
            <FlatList
              data={propertyDetail}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.category}
              renderItem={({ item }) => (
                <Category
                  title={item.category}
                  onPress={() => filterResults(item.category)}
                  isSelected={item.category === selectedCategory}
                />
              )}
              style={styles.categoriesList}
            />
          </View>
          <View style={{}}>
            <FlatList
              data={propertyDetail}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Homecards imageSource={item.imageSource} label={item.category} />
              )}
              contentContainerStyle={styles.listContainer}
            />
          </View>
          <View style={styles.featuredcard}>
            <Text style={styles.featuredtext}>Featured Estates</Text>
            <Text style={styles.featuredtext}>View all</Text>
          </View>
          <FlatList
            data={properties} // Use fetched properties
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()} // Ensure unique keys
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePropertyClick(item)}>
                <PropertyCard
                  id={item.id}
                  imageSource={item.image ? { uri: item.image } : require('../../../assets/images/role1.png')} // Ensure the image source is handled correctly
                  title={item.title}
                  // cityName={item.city_name}
                  country={item.location}
                  price={item.sellingPrice}
                />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContainer}
          />
        </ScrollView>
      </View>
    </LovedProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10
  },
  logoprofilecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.2,
    height: height * 0.1,
  },
  profile: {
    width: width * 0.08,
    height: height * 0.04,
  },
  profilecontainer: {
    width: width * 0.15,
    height: height * 0.07,
    backgroundColor: colors.textinputfill,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  namecontainer: {
    flexDirection: 'row',
  },
  text: {
    color: colors.primary,
    fontSize: 25,
    fontFamily: 'Lato-Medium',
  },
  text1: {
    color: colors.primary,
    fontSize: 25,
    fontFamily: 'Lato-Medium',
  },
  nametext: {
    color: colors.boldtextcolor,
    fontSize: 25,
    fontFamily: 'Lato-Black',
  },
  featuredcard: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featuredtext: {
    color: colors.boldtextcolor,
    fontFamily: 'Lato-Bold',
  },
  listContainer: {
    paddingVertical: 10,
  },
});

export default AgentHomeScreen;
