
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';
import SearchCards from '../../components/SearchCards';
import img1 from '../../../assets/images/role1.png'
import img2 from '../../../assets/images/role2.png'
import SearchBar from '../../components/SearchBar';


const { width, height } = Dimensions.get('window');


const UserSearch = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { filters } = route.params;


  const searchResults = [
    { id: '1', category: "Apartment",Title:'Bungalow House', areaName: 'Westrn Bay , ', cityName: 'New Castle', country: 'USA', price: '2M', imageSource: require('../../../assets/images/role1.png') },
    { id: '2', category: "Apartment",Title:'Bungalow House', areaName: 'Westrn Bay , ', cityName: 'New Castle', country: 'USA', price: '2M', imageSource: require('../../../assets/images/role1.png') },
    { id: '3', category: "Apartment",Title:'Bungalow House', areaName: 'Westrn Bay , ', cityName: 'New Castle', country: 'USA', price: '2M', imageSource: require('../../../assets/images/role1.png') },
    { id: '4', category: "Apartment",Title:'Bungalow House', areaName: 'Westrn Bay , ', cityName: 'New Castle', country: 'USA', price: '2M', imageSource: require('../../../assets/images/role1.png') },
    { id: '5', category: "Apartment",Title:'Bungalow House', areaName: 'Westrn Bay , ', cityName: 'New Castle', country: 'USA', price: '2M', imageSource: require('../../../assets/images/role1.png') },
    { id: '6', category: "Apartment",Title:'Bungalow House', areaName: 'Westrn Bay , ', cityName: 'New Castle', country: 'USA', price: '2M', imageSource: require('../../../assets/images/role1.png') },
    { id: '7', category: "Apartment",Title:'Bungalow House', areaName: 'Westrn Bay , ', cityName: 'New Castle', country: 'USA', price: '2M', imageSource: require('../../../assets/images/role1.png') },
    { id: '8', category: "House",Title:'Mill Sper House', areaName: 'Downtown', cityName: 'New Castle', country: 'Canada', price: '2M', imageSource: require('../../../assets/images/role1.png') },
    { id: '9', category: "House",Title:'Bungalow House', areaName: 'Green Acres', cityName: 'New Castle', country: 'Australia', price: '2M', imageSource: require('../../../assets/images/role3.png') },
    { id: '10', category: "House",Title:'Mill Sper House', areaName: 'Sunset Blvd', cityName: 'New Castle', country: 'USA', price: '2M', imageSource: require('../../../assets/images/role4.png') },
    { id: '11', category: "House",Title:'Mill Sper House', areaName: 'Shibuya', cityName: 'New Castle', country: 'Japan', price: '2M', imageSource: require('../../../assets/images/role1.png') },
    { id: '12', category: "House",Title:'Mill Sper House', areaName: 'Sunset Blvd', cityName: 'New Castle', country: 'USA', price: '2M', imageSource: require('../../../assets/images/role4.png') },
    { id: '13', category: "House",Title:'Mill Sper House', areaName: 'Shibuya', cityName: 'New Castle', country: 'Japan', price: '2M', imageSource: require('../../../assets/images/role1.png') },
  ];
  // const searchResults = [
  //   {
  //     id: '1',
  //     image: img1,
  //     price: 2500,
  //     title: 'Modern House',
  //     location: 'New York, USA',
  //   },
  //   {
  //     id: '2',
  //     image: img2,
  //     price: 3000,
  //     title: 'Luxury Apartment',
  //     location: 'Los Angeles, USA',
  //   },
  //   // ... add more results as needed
  // ];

  const filteredResults = searchResults.filter((item) => {

    return (
      item.category === filters.category
      // item.price <= filters.price &&
      // item.bedrooms >= filters.bedrooms &&
      // item.bathrooms >= filters.bathrooms &&
      // // Add more filter conditions as needed
      // item.landSize >= filters.landSize
    );
  });

  const renderSearchResult = ({ item }) => {
    return <SearchCards item={item} />;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backbutton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <TouchableOpacity style={styles.filterIconContainer} onPress={() => navigation.navigate('UserFilter')}>
          <MaterialCommunityIcons name="tune-vertical-variant" size={20} color="white" style={styles.filterIcon} />
        </TouchableOpacity>
      </View>
    <SearchBar showFilterIcon={false} ></SearchBar>

    <Text style={styles.cardCount}>
    Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} estates
      </Text>
      {/* Search Results */}
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.id}
        renderItem={renderSearchResult}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  filterIconContainer: {
    backgroundColor: colors.buttons,
    borderRadius: 10,
    padding: 8,
  },
cardCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
    color: colors.primary,
},
  backbutton: {
    backgroundColor: colors.textinputfill,
    width: width / 7,
    height: height / 15,
    borderRadius: 45,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingTop: 16,
  },
});

export default UserSearch;
