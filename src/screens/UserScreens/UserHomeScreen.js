// UserHomeScreen.js
import React, { useState,useEffect  } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList, ScrollView, TouchableOpacity , ActivityIndicator} from 'react-native';
import { LovedProvider } from '../../contexts/LovedContext';
import logo from '../../../assets/images/logo.png';
import profile from '../../../assets/images/profile.png';
import SearchBar from '../../components/SearchBar';
import Category from '../../components/Category';
import PropertyCard from '../../components/PropertyCard';
import colors from '../../styles/colors';
import Homecards from '../../components/Homecards';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getProperties } from '../../utils/apiUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../contexts/AuthContext';



const { width, height } = Dimensions.get('window');

const propertyDetail = [
  { id: '1', category: 'flat',Title: 'Bungalow House', areaName: 'Western Bay', cityName: 'New Castle', country: 'USA', price: '$ 2M',bedroom:"2",bathroom:'3', garage:'2', imageSource: require('../../../assets/images/role1.png') },
  { id: '2', category: 'house',Title: 'Bungalow House', areaName: 'Downtown', cityName: 'New Castle', country: 'Canada', price: '$ 2M',bedroom:"2",bathroom:'3', garage:'2', imageSource: require('../../../assets/images/role2.png') },
  { id: '3', category: 'apartment',Title: 'Bungalow House', areaName: 'Green Acres', cityName: 'New Castle', country: 'Australia', price: '$ 2M',bedroom:"2",bathroom:'3', garage:'2', imageSource: require('../../../assets/images/role3.png') },
  { id: '4', category: 'office',Title: 'Bungalow House', areaName: 'Sunset Blvd', cityName: 'New Castle', country: 'USA', price: '$ 2M',bedroom:"2",bathroom:'3', garage:'2', imageSource: require('../../../assets/images/role4.png') },
  { id: '5', category: 'floor',Title: 'Bungalow House', areaName: 'Shibuya', cityName: 'New Castle', country: 'Japan', price: '$ 2M',bedroom:"2",bathroom:'3', garage:'2', imageSource: require('../../../assets/images/role1.png') },
];

const UserHomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);  // To manage loading state

  const navigation = useNavigation();
  const token = useAuth();
  const {userData} = useAuth();
  const userName = userData?.name;
  // console.log(userName)
  // const subscribed = userData?.is_subscribed;
  // console.log(subscribed)

  useEffect(() => {
    const fetchPropertiesAndSubscriptionStatus = () => {
      setLoading(true);
  
      AsyncStorage.getItem('token')  // Retrieve token
        .then((token) => {
          const subscriptionStatus = userData?.is_subscribed; // Retrieve subscription status
          console.log("Subscription status:", subscriptionStatus);
  
          if (subscriptionStatus === 1) { // Check if subscribed
            setIsSubscribed(true);
  
            if (token) {
              // Fetch properties if subscribed
              getProperties(token)
                .then((res) => {
                  setProperties(res?.data || []); // Set properties
                })
                .catch((error) => {
                  console.log("[ERROR] Fetching properties: ", error);
                });
            }
          } else {
            setIsSubscribed(false); // Not subscribed
          }
        })
        .catch((error) => {
          console.log("[ERROR] Retrieving token: ", error);
        })
        .finally(() => {
          setLoading(false); // Hide loading indicator
        });
    };
  
    fetchPropertiesAndSubscriptionStatus();
  }, [userData]);
  

  const filterResults = (category) => {
    setSelectedCategory(category);
  };

  const handlePropertyClick = (property) => {
    navigation.navigate('UserStack', { screen: 'PropertyDetail', params: { property } });
  };

  const handleCategoryPress = (category) => {
    navigation.navigate('UserSearch', { selectedCategory: category });
  };

  if (loading) {
    return  <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <LovedProvider>
      <View style={styles.container}>
        <View style={styles.logoprofilecontainer}>
          <Image source={logo} style={styles.logo} />
          <TouchableOpacity style={styles.profilecontainer} onPress={()=>navigation.navigate('UserProfileScreen')}>
            <Image source={profile} style={styles.profile} />
          </TouchableOpacity>
        </View>
        <View style={styles.namecontainer}>
          <Text style={styles.text}>Hey</Text>
          <Text style={styles.nametext}> {userName}</Text>
        </View>
        <Text style={styles.text1}>Let's start exploring</Text>
        <SearchBar
          placeholder="Search for properties"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
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
      onPress={() => handleCategoryPress(item.category)} // Pass the selected category
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
                <TouchableOpacity  onPress={() => handleCategoryPress(item.category)} >
                <Homecards imageSource={item.imageSource} label={item.category} />
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.listContainer}
            />
          </View>

          {/* Display featured properties only if user is subscribed */}
          {isSubscribed ? (
            <>
              <View style={styles.featuredcard}>
                <Text style={styles.featuredtext}>Featured Estates</Text>
                <Text style={styles.featuredtext}>View all</Text>
              </View>
              <FlatList
                data={properties}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handlePropertyClick(item)}>
                    <PropertyCard
                      id={item.id}
                      images={item.images}
                      title={item.title}
                      country={item.location}
                      price={item.sellingPrice}
                    />
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContainer}
              />
            </>
          ) : (
            <View style={styles.warningContainer}>
              <Text style={styles.warningText}>You need to subscribe to view properties!</Text>
            </View>
          )}
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
  warningContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  warningText: {
    color: colors.boldtextcolor,
    fontSize: 18,
    fontFamily: 'Lato-Bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: colors.primary,
  },
});

export default UserHomeScreen;
