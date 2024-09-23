import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FloatingAction} from 'react-native-floating-action';
import colors from '../../styles/colors';
import PropertyCardForAgent from '../../components/PropertyCardForAgent';
import {getProperties} from '../../utils/apiUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const AgentSearchResult = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [propertyList, setPropertyList] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Extract the propertyCategory passed from AgentHomeScreen
  const {propertyCategory} = route.params || {};

  const fetchProperties = async () => {
    setRefreshing(true); // Start refreshing animation
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const res = await getProperties(token);
        setPropertyList(res?.data || []);
      }
    } catch (err) {
      console.log('[Error - Fetching Properties]', err);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refreshing animation
    }
  };

  useEffect(() => {
    fetchProperties(); // Fetch properties on mount
  }, []);

  // Filter properties based on the selected category
  useEffect(() => {
    if (propertyCategory) {
      const filtered = propertyList.filter(
        property =>
          property.propertyCategory?.toLowerCase() ===
          propertyCategory.toLowerCase(),
      );
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(propertyList); // Show all properties if no category is selected
    }
  }, [propertyList, propertyCategory]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handlePropertyClick = property => {
    navigation.navigate('AgentStack', {
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
        <Text style={styles.headerText}>Your Listing</Text>
      </View>

      <FlatList
        data={filteredProperties} // Use filtered properties
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handlePropertyClick(item)}>
            {console.log('IAMGES ==> ', item)}
            <PropertyCardForAgent
              id={item.id}
              title={item.title}
              bathrooms={item.bathroomCount}
              bedrooms={item.bedroomCount}
              carSpace={item.carSpaceCount}
              totalRooms={item.totalRoomCount}
              listingType={item.listingType}
              propertyCategory={item.propertyCategory}
              propertyType={item.propertyType}
              rentPrice={item.rentPrice}
              rentType={item.rentPayable}
              sellingPrice={item.sellingPrice}
              images={item.images}
              onRefresh={() => fetchProperties()}
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No listings found for "{propertyCategory}"!
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        refreshing={refreshing} // Bind refreshing state to FlatList
        onRefresh={fetchProperties} // Fetch properties again on refresh
      />

      <FloatingAction
        color={colors.buttons}
        onPressMain={() => navigation.navigate('AddListingScreen')}
        floatingIcon={<Ionicons name="add" size={24} color="white" />}
      />
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
    paddingHorizontal: 10,
    flexGrow: 1,
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
  backbutton: {
    backgroundColor: colors.textinputfill,
    width: width / 7,
    height: height / 15,
    borderRadius: 45,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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

export default AgentSearchResult;
