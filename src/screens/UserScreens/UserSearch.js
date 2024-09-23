import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';
import SearchCards from '../../components/SearchCards';
import SearchBar from '../../components/SearchBar';
import {getProperties} from '../../utils/apiUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const UserSearch = () => {
  const [properties, setProperties] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();

  // Retrieve filters or category from route parameters
  const {filters, query, fromHome, selectedCategory} = route.params || {};

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const res = await getProperties(token);
          setProperties(res?.data || []);
        }
      } catch (err) {
        console.log('[ERROR] Fetching properties: ', err);
      }
    };

    fetchProperties();
  }, []);

  console.log('FILTERSS ==> ', selectedCategory);

  const filteredResults = properties.filter(property => {
    const searchQuery = query ? query.toLowerCase() : ''; // Default to empty string if query is undefined
    const fromHomeScreen = fromHome || false; // Default to false if fromHome is not provided

    // Check if the property title matches the search query when coming from the home screen
    const matchesQuery =
      fromHomeScreen && searchQuery !== ''
        ? property?.title.toLowerCase() === searchQuery.toLowerCase()
        : false;

    // Check if the property matches the selected category or filters passed from UserFilter
    const categoryToCheck = selectedCategory
      ? selectedCategory
      : filters?.category
      ? filters.category
      : '';
    const matchesCategory =
      categoryToCheck !== ''
        ? property.propertyCategory.toLowerCase() === categoryToCheck
        : true;
    const matchesPrice =
      !fromHomeScreen && filters?.price
        ? property.sellingPrice >= filters.price
        : true;
    const matchesBedrooms =
      !fromHomeScreen && filters?.bedrooms
        ? property.bedroomCount === filters.bedrooms.toString()
        : true;
    const matchesBathrooms =
      !fromHomeScreen && filters?.bathrooms
        ? property.bathroomCount === filters.bathrooms.toString()
        : true;
    const matchesCarSpaces =
      !fromHomeScreen && filters?.carSpaces
        ? property.carSpaceCount === filters.carSpaces.toString()
        : true;
    const matchesConstructionStatus =
      !fromHomeScreen && filters?.constructionStatus
        ? property.constructionStatus?.toLowerCase() ===
          filters.constructionStatus.toLowerCase()
        : true;
    const matchesPropertyType =
      !fromHomeScreen && filters?.propertyType
        ? property.propertyType?.toLowerCase() ===
          filters.propertyType.toLowerCase()
        : true;
    const matchesLandSize =
      !fromHomeScreen && filters?.landSize
        ? property.propertySize <= filters.landSize
        : true;

    // Apply search query filter if coming from the home screen
    if (fromHomeScreen) {
      return matchesQuery;
    } else {
      return (
        matchesCategory &&
        matchesPrice &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesCarSpaces &&
        matchesConstructionStatus &&
        matchesPropertyType &&
        matchesLandSize
      );
    }
  });

  const renderSearchResult = ({item}) => {
    return (
      <TouchableOpacity onPress={() => handlePropertyClick(item)}>
        <SearchCards
          id={item.id}
          images={item.images}
          title={item.title}
          location={item.location}
          price={item.sellingPrice}
        />
      </TouchableOpacity>
    );
  };

  const handlePropertyClick = property => {
    navigation.navigate('UserStack', {
      screen: 'PropertyDetail',
      params: {property},
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backbutton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <TouchableOpacity
          style={styles.filterIconContainer}
          onPress={() => navigation.navigate('UserFilter')}>
          <MaterialCommunityIcons
            name="tune-vertical-variant"
            size={20}
            color="white"
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>
      <SearchBar showFilterIcon={false} />
      <FlatList
        data={filteredResults}
        keyExtractor={item => item.id.toString()}
        renderItem={renderSearchResult}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No listings found for the applied filters
            </Text>
          </View>
        )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.6, // Adjust height as needed
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    color: colors.textinputplaceholdercolor,
  },
});

export default UserSearch;
