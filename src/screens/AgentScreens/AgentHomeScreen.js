// UserHomeScreen.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {LovedProvider} from '../../contexts/LovedContext';
import logo from '../../../assets/images/logo.png';
import profile from '../../../assets/images/profile.png';
import SearchBarForAgent from '../../components/SearchBarForAgent';
import Category from '../../components/Category';
import PropertyCard from '../../components/PropertyCard';
import colors from '../../styles/colors';
import Homecards from '../../components/Homecards';
import {getProperties} from '../../utils/apiUtils';
import {useRoute, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../contexts/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

const categroyCards = [
  {
    id: '1',
    category: 'flat',
    imageSource: require('../../../assets/images/role1.png'),
  },
  {
    id: '2',
    category: 'house',
    imageSource: require('../../../assets/images/role2.png'),
  },
  {
    id: '3',
    category: 'apartment',
    imageSource: require('../../../assets/images/role3.png'),
  },
  {
    id: '4',
    category: 'office',
    imageSource: require('../../../assets/images/role4.png'),
  },
  {
    id: '5',
    category: 'floor',
    imageSource: require('../../../assets/images/role1.png'),
  },
];

const AgentHomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState([]);
  const navigation = useNavigation();
  const {userData} = useAuth();
  const [loading, setLoading] = useState(true);

  // const userToken = userData?.token;
  const userName = userData?.name;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Retrieved token:', token);

        if (token) {
          const res = await getProperties(token);
          console.log('[RES - GET ALL PROPERTIES] ==> ', res);
          setProperties(res?.data || []);
          setLoading(false);
        } else {
          console.log('Token not found');
          setLoading(false);
        }
      } catch (err) {
        console.log('[RES - GET ALL PROPERTIES] ==> ', err);
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filterResults = category => {
    setSelectedCategory(category);
  };

  const handlePropertyClick = property => {
    navigation.navigate('AgentStack', {
      screen: 'PropertyDetail',
      params: {property},
    });

    // navigation.navigate('PropertyDetail', { property: item });
    // console.log("go")
  };
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <LovedProvider>
      <View style={styles.container}>
        <View style={styles.logoprofilecontainer}>
          <Image source={logo} style={styles.logo} />
          <TouchableOpacity
            style={styles.profilecontainer}
            onPress={() => navigation.navigate('AgentProfileScreen')}>
            <Image source={profile} style={styles.profile} />
          </TouchableOpacity>
        </View>
        <View style={styles.namecontainer}>
          <Text style={styles.text}>Hey</Text>
          <Text style={styles.nametext}> {userName}</Text>
        </View>
        <Text style={styles.text1}>Let's start exploring</Text>
        {/* <View
          style={{marginRight: 80, flexDirection: 'row', alignItems: 'center'}}>
          <SearchBarForAgent
            customWidth={width * 0.95}
            customHeight={height * 0.07}
            // onPress={}
            // width={width*0.7}
            // height={height*0.1}
            placeholder="Search for properties"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
        </View> */}
        <ScrollView style={{paddingTop: 10}}>
          <View>
            <FlatList
              data={categroyCards}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.category}
              renderItem={({item}) => (
                <Category
                  title={item.category}
                  onPress={() => filterResults(item.category)}
                  isSelected={item.category === selectedCategory}
                />
              )}
              style={styles.categoriesList}
            />
          </View>
          <View style={{}}>
            <FlatList
              data={categroyCards}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity>
                  <Homecards
                    imageSource={item.imageSource}
                    label={item.category}
                  />
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.listContainer}
            />
          </View>
          <View style={styles.featuredcard}>
            <Text style={styles.featuredtext}>Featured Estates</Text>
            <Text style={styles.featuredtext}>View all</Text>
          </View>
          <FlatList
            data={properties} // Use fetched properties
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()} // Ensure unique keys
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handlePropertyClick(item)}>
                <PropertyCard
                  id={item.id}
                  images={item.images} // Ensure the image source is handled correctly
                  title={item.title}
                  // cityName={item.city_name}
                  country={item.location}
                  price={item.sellingPrice}
                />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContainer}
          />
        </ScrollView>
      </View>
    </LovedProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
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
});

export default AgentHomeScreen;
