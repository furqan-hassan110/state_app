import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';
import SearchCards from '../../components/SearchCards';
import SearchBar from '../../components/SearchBar';
import { getProperties } from '../../utils/apiUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const UserSearch = () => {
  const [properties, setProperties] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const { filters } = route.params;
  const { query, fromHome } = route.params || {}; // Destructure fromHome from params
  console.log(query)

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

  const filteredResults = Array.isArray(properties) ? properties.filter((property) => {
    const searchQuery = query ? query.toLowerCase() : ''; // Default to empty string if query is undefined
    const fromHomeScreen = fromHome || false; // Default to false if fromHome is not provided
  
    // Check if the property title matches the search query when coming from the home screen
    const matchesQuery = fromHomeScreen && property.propertyCategory && property.propertyCategory.toLowerCase() === searchQuery.toLowerCase();
      console.log(property.propertyCategory)
      console.log(searchQuery)
    // Check if the property category matches the filter when not coming from the home screen
    const matchesCategory = !fromHomeScreen && filters?.category ? property.propertyCategory.toLowerCase() === filters.category.toLowerCase() : true;
  
    // Filter by both query and category depending on where the search is initiated from
    if (fromHomeScreen) {
      return matchesQuery;
    } else {
      return matchesCategory;
    }
  }) : [];
  
  

  const renderSearchResult = ({ item }) => {
    return <SearchCards
      id={item.id}
      imageSource={item.image ? { uri: item.image } : require('../../../assets/images/role1.png')}
      title={item.title}
      location={item.location}
      price={item.sellingPrice}
    />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backbutton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <TouchableOpacity style={styles.filterIconContainer} onPress={() => navigation.navigate('UserFilter')}>
          <MaterialCommunityIcons name="tune-vertical-variant" size={20} color="white" style={styles.filterIcon} />
        </TouchableOpacity>
      </View>
      <SearchBar showFilterIcon={false} />
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
