import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import SearchCards from '../../components/SearchCards';
import colors from '../../styles/colors';

const { width, height } = Dimensions.get('window');


const UserSearchScreen = () => {
  const route = useRoute();
  const { query } = route.params || {};

  const propertyDetail = [
    { id: '1', category: 'flat', areaName: 'Western Bay', cityName: 'New Castle', country: 'USA', price: '2M', imageSource: require('../../../assets/images/role1.png') },
    { id: '2', category: 'house', areaName: 'Downtown', cityName: 'New Castle', country: 'Canada', price: '2M', imageSource: require('../../../assets/images/role2.png') },
    { id: '3', category: 'apartment', areaName: 'Green Acres', cityName: 'New Castle', country: 'Australia', price: '2M', imageSource: require('../../../assets/images/role3.png') },
    { id: '4', category: 'office', areaName: 'Sunset Blvd', cityName: 'New Castle', country: 'USA', price: '2M', imageSource: require('../../../assets/images/role4.png') },
    { id: '5', category: 'floor', areaName: 'Shibuya', cityName: 'New Castle', country: 'Japan', price: '2M', imageSource: require('../../../assets/images/role1.png') },
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
        <Text style={styles.headerText}>Search results</Text>
        <TouchableOpacity style={styles.backbutton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        {/* <Text style={styles.resultCount}>Found {filteredProperties.length} estates</Text> */}
      </View>
      {filteredProperties.length > 0 ? (
        <FlatList
          // data={filteredProperties}
          // keyExtractor={(item) => item.id}
          renderItem={renderSearchResult}
          data={propertyDetail}
        keyExtractor={(item) => item.id}
        numColumns={2}
        //     <SearchCards
        //     data={propertyDetail}
        //       // id={item.id}
        //       // imageSource={item.imageSource}
        //       // areaName={item.areaName}
        //       // cityName={item.cityName}
        //       // country={item.country}
        //       // price={item.price}
        //       keyExtractor={(item) => item.id}
        // renderItem={renderSearchResult}
        // numColumns={2}
        //     />
          
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          {/* <Image
            // source={require('../../../assets/images/no_results_icon.png')} // Replace with your no-results icon
            style={styles.noResultsIcon}
          /> */}
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
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily:'Lato-Bold',
    alignSelf:'center',
    // fontWeight: 'bold',
    color: colors.boldtextcolor,
  },
  resultCount: {
    fontSize: 16,
    color: colors.black,
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
  noResultsIcon: {
    width: 60,
    height: 60,
    marginBottom: 20,
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
