// UserSearchScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import PropertyCard from '../../components/PropertyCard';
import colors from '../../styles/colors';

const UserSearchScreen = () => {
  const route = useRoute();
  const { query } = route.params || {};

  const propertyDetail = [
    // Same propertyDetail array as before or you can fetch from an API
    { id: '1', category: 'flat', areaName: 'Western Bay', cityName: 'New Castle', country: 'USA', price: '2M', imageSource: require('../../../assets/images/role1.png') },
    { id: '2', category: 'house', areaName: 'Downtown', cityName: 'New Castle', country: 'Canada', price: '2M', imageSource: require('../../../assets/images/role2.png') },
    { id: '3', category: 'apartment', areaName: 'Green Acres', cityName: 'New Castle', country: 'Australia', price: '2M', imageSource: require('../../../assets/images/role3.png') },
    { id: '4', category: 'office', areaName: 'Sunset Blvd', cityName: 'New Castle', country: 'USA', price: '2M', imageSource: require('../../../assets/images/role4.png') },
    { id: '5', category: 'floor', areaName: 'Shibuya', cityName: 'New Castle', country: 'Japan', price: '2M', imageSource: require('../../../assets/images/role1.png') },
  ];

  const filteredProperties = propertyDetail.filter(property =>
    property.areaName.toLowerCase().includes(query.toLowerCase()) ||
    property.category.toLowerCase().includes(query.toLowerCase()) ||
    property.cityName.toLowerCase().includes(query.toLowerCase()) ||
    property.country.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {filteredProperties.length > 0 ? (
        <FlatList
          data={filteredProperties}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PropertyCard
              id={item.id}
              imageSource={item.imageSource}
              areaName={item.areaName}
              cityName={item.cityName}
              country={item.country}
              price={item.price}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noResults}>No results found for "{query}"</Text>
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
  listContainer: {
    paddingVertical: 10,
  },
  noResults: {
    textAlign: 'center',
    color: colors.boldtextcolor,
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    marginTop: 20,
  },
});

export default UserSearchScreen;
