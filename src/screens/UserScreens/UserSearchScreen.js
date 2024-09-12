import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import SearchCards from '../../components/SearchCards';
import colors from '../../styles/colors';
import SearchBar from '../../components/SearchBar';
import { getProperties } from '../../utils/apiUtils'; // Import the API function
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get('window');

const UserSearchScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { query } = route.params || {};
  
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch properties when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Await for the token
        console.log("Retrieved token:", token); // Debugging line to log the token

        if (token) {
          const res = await getProperties(token); // Call the API with the token
          console.log("[RES - GET ALL PROPERTIES] ==> ", res);
          setProperties(res?.data || []); // Assuming `res.data` contains the property list
        } else {
          console.log("Token not found"); // If no token is found in AsyncStorage
        }
      } catch (err) {
        console.log("[RES - GET ALL PROPERTIES] ==> ", err);
      }finally {
        setLoading(false); // Set loading to false after the API call completes (success or error)
      }
    };

    fetchProperties();
  }, []);

  // Filter properties based on the search query
  const filteredProperties = query
    ? properties.filter(property =>
        property.category.toLowerCase().includes(query.toLowerCase()) ||
        property.cityName.toLowerCase().includes(query.toLowerCase()) ||
        property.country.toLowerCase().includes(query.toLowerCase())
      )
    : properties;

  const renderSearchResult = ({ item }) => {
    return <SearchCards item={item} />;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backbutton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Search results</Text>
      </View>
      
      <SearchBar showFilterIcon={false} />
      
      {filteredProperties.length > 0 ? (
        <FlatList
          data={filteredProperties}
          keyExtractor={(item) => item.id.toString()}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default UserSearchScreen;
