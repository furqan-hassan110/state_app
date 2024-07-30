import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions, FlatList, ScrollView } from 'react-native';

import logo from '../../../assets/images/logo.png'
import profile from '../../../assets/images/profile.png'

import Textinput from '../../components/Textinput';
// Contexts
import { useAuth } from '../../contexts/AuthContext';
import colors from '../../styles/colors';
import SearchBar from '../../components/SearchBar';
import Category from '../../components/Category';
import Homecards from '../../components/Homecards';
import PropertyCard from '../../components/PropertyCard';

const { width, height } = Dimensions.get('window');
const categories = ['All', 'Home', 'Apartment', 'House', "floor", "flats", "offices"];

const data = [
  { id: '1', label: 'House', imageSource: require('../../../assets/images/role1.png') },
  { id: '2', label: 'Apartment', imageSource: require('../../../assets/images/role2.png') },
  { id: '3', label: 'Office', imageSource: require('../../../assets/images/role3.png') },
  { id: '4', label: 'Flat', imageSource: require('../../../assets/images/role4.png') },
  { id: '5', label: 'Home', imageSource: require('../../../assets/images/role1.png') },
];

const propertydeatail = [
  { id: '1', areaName: 'Westrn Bay , ',cityName:'New Castle', country: 'USA', imageSource: require('../../../assets/images/role1.png') },
  { id: '2', areaName: 'Downtown',cityName:'New Castle', country: 'Canada', imageSource: require('../../../assets/images/role2.png') },
  { id: '3', areaName: 'Green Acres',cityName:'New Castle', country: 'Australia', imageSource: require('../../../assets/images/role3.png') },
  { id: '4', areaName: 'Sunset Blvd',cityName:'New Castle', country: 'USA', imageSource: require('../../../assets/images/role4.png') },
  { id: '5', areaName: 'Shibuya',cityName:'New Castle', country: 'Japan', imageSource: require('../../../assets/images/role1.png') },
];

const UserHomeScreen = () => {
  const { logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filterResults = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoprofilecontainer}>
        <Image source={logo} style={styles.logo}></Image>
        <View style={styles.profilecontainer}>
          <Image source={profile} style={styles.profile}></Image>
        </View>
      </View>
      <View style={styles.namecontainer}>
        <Text style={styles.text}>
          Hey
        </Text>
        <Text style={styles.nametext}>
          Cynthia!
        </Text>
      </View>
      <Text style={styles.text1}>
        Let's start exploring
      </Text>
      <SearchBar />
      <ScrollView>
      <View style={{ marginTop: 10 }}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Category
              title={item.label}
              onPress={() => filterResults(item)}
              isSelected={item === selectedCategory}
            />
          )}
          style={styles.categoriesList}
        />
      </View>
      <View style={{ top: 30 }}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Homecards imageSource={item.imageSource} label={item.label} />
          )}
          contentContainerStyle={styles.listContainer}
        />
      </View>
      <View style={styles.featuredcard}>
        <Text style={styles.featuredtext}>
          Featured Estates
        </Text>
        <Text style={styles.featuredtext}>
          View all
        </Text>
      </View>
      <FlatList
          data={propertydeatail}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PropertyCard
              imageSource={item.imageSource}
              areaName={item.areaName}
              cityName={item.cityName}
              country={item.country}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
   </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  logoprofilecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    bottom: 20
    // alignItems:'stretch',
  },
  logo: {
    width: width * 0.2,
    height: height * 0.1,
    right: 15
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
    left: 10
  },
  namecontainer: {
    flexDirection: 'row',
    bottom: 25
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
    bottom: 25,
  },
  nametext: {
    color: colors.boldtextcolor,
    fontSize: 25,
    fontFamily: 'Lato-Black',
    left: 10,

  },
  listContainer: {
    paddingVertical: 10,
  },
  featuredcard: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  featuredtext: {
    color: colors.boldtextcolor,
    fontFamily: 'Lato-Bold',

  },
});

export default UserHomeScreen;
