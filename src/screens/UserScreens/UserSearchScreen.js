import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import SearchCards from '../../components/SearchCards';
import colors from '../../styles/colors';
import SearchBar from '../../components/SearchBar';

const { width, height } = Dimensions.get('window');

const UserSearchScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { query } = route.params || {};

  const propertyDetail = [
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

  const filteredProperties = query
    ? propertyDetail.filter(property =>
        property.category.toLowerCase().includes(query.toLowerCase()) ||
        property.cityName.toLowerCase().includes(query.toLowerCase()) ||
        property.country.toLowerCase().includes(query.toLowerCase())
      )
    : propertyDetail;

  const renderSearchResult = ({ item }) => {
    return <SearchCards item={item} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backbutton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Search results</Text>
      </View>
      
      <SearchBar showFilterIcon={false} />
      
      <Text style={styles.cardCount}>
        Found {filteredProperties.length} result{filteredProperties.length !== 1 ? 's' : ''} estates
      </Text>
      
      {filteredProperties.length > 0 ? (
        <FlatList
          data={filteredProperties}  // Use the filtered properties here
          keyExtractor={(item) => item.id}
          renderItem={renderSearchResult}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>Search not found</Text>
          <Text style={styles.suggestionText}>
            Sorry, we can't find the real estates you are looking for. Maybe, a little spelling mistake?
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    alignSelf: 'center',
    marginLeft: 70,
    color: colors.boldtextcolor,
  },
  cardCount: {
    fontSize: 16,
    color: colors.black,
    marginVertical: 10,  // Adjust margin as needed
  },
  listContainer: {
    paddingVertical: 10,
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
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.boldtextcolor,
    marginBottom: 10,
  },
  suggestionText: {
    fontSize: 16,
    color: colors.lighttextcolor,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default UserSearchScreen;
