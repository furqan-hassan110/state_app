import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import SearchCards from '../../components/SearchCards';
import colors from '../../styles/colors';
import { getProperties } from '../../utils/apiUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

const UserSearchScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const { query } = route.params || {};
  
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false); // Track subscription status

  // Fetch properties and subscription status
  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('userData'); // Assuming userData is stored in AsyncStorage
      const subscriptionStatus = JSON.parse(userData)?.is_subscribed; // Adjust according to your user data structure

      console.log("Retrieved token:", token);
      console.log("User subscription status:", subscriptionStatus);

      if (token && subscriptionStatus) {
        setIsSubscribed(true); // User is subscribed
        const res = await getProperties(token);
        console.log("[RES - GET ALL PROPERTIES] ==> ", res);
        setProperties(res?.data || []);
      } else {
        console.log("User is not subscribed or token not found");
        setError('You must be subscribed to view properties.'); // Set error message
      }
    } catch (err) {
      console.log("[RES - GET ALL PROPERTIES] ==> ", err);
      setError('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handlePropertyClick = (property) => {
    navigation.navigate('UserStack', { screen: 'PropertyDetail', params: { property } });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProperties().finally(() => setRefreshing(false));
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
        <Text style={styles.headerText}>Search</Text>
      </View>
      
      {properties.length > 0 ? (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={properties}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePropertyClick(item)}>
              <SearchCards
                id={item.id}
                images={item.images}
                title={item.title}
                location={item.location}
                price={item.sellingPrice}
              />
            </TouchableOpacity>
          )}
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
    marginLeft: 90,
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
