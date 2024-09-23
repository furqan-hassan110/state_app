import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {getPropertiesById, updateCategory} from '../../utils/apiUtils'; // Function to fetch property by ID
import colors from '../../styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const EditListingScreen = () => {
  const route = useRoute();
  const {id} = route.params; // Retrieve property ID from route params
  const navigation = useNavigation();

  // const [propertyData, setPropertyData] = useState(null);
  const [listingType, setListingType] = useState(null);
  const [constructionStatus, setConstructionStatus] = useState(null);
  const [propertyCategory, setPropertyCategory] = useState(null);
  const [propertyType, setPropertyType] = useState(null);
  const [listingTitle, setListingTitle] = useState();
  const [listingAddress, setListingAddress] = useState();
  const [listingLocation, setListingLocation] = useState();
  const [sellPrice, setSellPrice] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [rentType, setRentType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [carSpace, setCarSpace] = useState('');
  const [totalRooms, setTotalRooms] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const [propertyData, setPropertyData] = useState({
    title: '',
    address: '',
    location: '',
    construction_status: '',
    listing_type: '',
    property_category: '',
    property_size: '1200',
    property_type: '',
    selling_amount: '',
    rent_amount: '',
    rent_payable: '',
    bedroom_count: '',
    bathroom_count: '',
    car_space_count: '',
    total_room_count: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await getPropertiesById(id, token); // Fetch property details by ID
        // console.log(propertyData.location)
        const {
          title,
          address,
          location,
          constructionStatus,
          listingType,
          propertyCategory,
          propertySize,
          propertyType,
          sellingPrice,
          rentPrice,
          rentPayable,
          bedroomCount,
          bathroomCount,
          carSpaceCount,
          totalRoomCount,
        } = res.data;
        const propertyObj = {
          title: title,
          address: address,
          location: location,
          construction_status: constructionStatus,
          listing_type: listingType,
          property_category: propertyCategory,
          property_size: propertySize,
          property_type: propertyType,
          selling_amount: sellingPrice,
          rent_amount: rentPrice,
          rent_payable: rentPayable,
          bedroom_count: bedroomCount,
          bathroom_count: bathroomCount,
          car_space_count: carSpaceCount,
          total_room_count: totalRoomCount,
        };
        console.log(res.data.bedroomCount);

        setPropertyData(propertyObj);
        setListingType(listingType);
        setConstructionStatus(constructionStatus);
        setPropertyCategory(propertyCategory);
        setPropertyType(propertyType);
        setListingTitle(title);
        setListingAddress(address);
        setListingLocation(location);
        setSellPrice(sellingPrice);
        setRentPrice(rentPrice);
        setRentType(rentPayable);
        setBedrooms(bedroomCount);
        setBathrooms(bathroomCount);
        setCarSpace(carSpaceCount);
        setTotalRooms(totalRoomCount);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching property details: ', error);
      }
    };

    fetchProperties();
  }, [id]);
  const handleSave = async () => {
    const updatedPropertyData = {
      title: listingTitle || propertyData.title,
      location: listingLocation || propertyData.location,
      property_size: '100',
      address: listingAddress || propertyData.address,
      construction_status:
        constructionStatus || propertyData.construction_status,
      listing_type: listingType || propertyData.listing_type,
      property_category: propertyCategory || propertyData.property_category,
      property_type: propertyType || propertyData.property_type,
      selling_amount: sellPrice || propertyData.selling_amount,
      rent_amount: rentPrice || propertyData.rent_amount,
      rent_payable: rentType || propertyData.rent_payable,
      bedroom_count: bedrooms || propertyData.bedroom_count,
      bathroom_count: bathrooms || propertyData.bathroom_count,
      car_space_count: carSpace || propertyData.car_space_count,
      total_room_count: totalRooms || propertyData.total_room_count,
      // images: images // Assuming the image data is in correct format
    };
    console.log(id);
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    updateCategory(id, updatedPropertyData, token)
      .then(res => {
        if (res.success) {
          console.log('update');
          setModalVisible(true);
        } else {
          console.log('error');
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  const handleModalFinish = () => {
    navigation.navigate('BottomTabAgent', {
      screen: 'Search',
      // params: { finalDetails },
    });
    setModalVisible(false);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backbutton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Listing</Text>
      </View>

      <View style={styles.imageContainer}>
        {/* <Image source={{ uri: propertyData.images ? require('../../../assets/images/role1.png') :require('../../../assets/images/role1.png') }} style={styles.image} /> */}
        {/* <View style={styles.imageDetails}>
          <Text style={styles.propertyName}>{propertyData.title}</Text>
          {/* <Text style={styles.propertyLocation}>Newcastle, Australia</Text> */}
        {/* </View>  */}
      </View>

      {/* Listing Title */}
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Listing Title"
          placeholderTextColor={colors.textinputplaceholdercolor}
          value={listingTitle || propertyData?.title}
          onChangeText={setListingTitle}
        />
      </View>
      <View>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Listing Address"
          placeholderTextColor={colors.textinputplaceholdercolor}
          value={listingAddress || propertyData?.address}
          onChangeText={setListingAddress}
        />
      </View>
      <View>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Listing Location"
          placeholderTextColor={colors.textinputplaceholdercolor}
          value={listingLocation || propertyData?.location}
          onChangeText={setListingLocation}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Construction status</Text>
        <View style={styles.optionsContainer}>
          {['new', 'used'].map(status => (
            <TouchableOpacity
              key={status}
              style={[
                styles.optionButton,
                propertyData.construction_status === status &&
                  styles.selectedOption,
              ]}
              onPress={() => setConstructionStatus(status)}>
              <Text
                style={[
                  styles.optionText,
                  propertyData.construction_status === status &&
                    styles.selectedOptionText,
                ]}>
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Listing type</Text>
        <View style={styles.optionsContainer}>
          {['rent', 'sell'].map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.optionButton,
                propertyData.listing_type === type && styles.selectedOption,
              ]}
              onPress={() => setListingType(type)}>
              <Text
                style={[
                  styles.optionText,
                  propertyData.listing_type === type &&
                    styles.selectedOptionText,
                ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Property category</Text>
        <View style={styles.optionsContainer}>
          {['house', 'apartment'].map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.optionButton,
                propertyData.property_category === category &&
                  styles.selectedOption,
              ]}
              onPress={() => setPropertyCategory(category)}>
              <Text
                style={[
                  styles.optionText,
                  propertyData.property_category === category &&
                    styles.selectedOptionText,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Property Type</Text>
        <View style={styles.optionsContainer}>
          {['commercial', 'industrial', 'land'].map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.optionButton,
                propertyData.property_type === type && styles.selectedOption,
              ]}
              onPress={() => setPropertyType(type)}>
              <Text
                style={[
                  styles.optionText,
                  propertyData.property_type === type &&
                    styles.selectedOptionText,
                ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Text style={styles.label}>Sell Price</Text>
      <TextInput
        style={styles.textInput}
        value={propertyData?.selling_amount}
        onChangeText={setSellPrice}
        keyboardType="numeric"
        placeholder="$ 180,000"
        placeholderTextColor={colors.textinputplaceholdercolor}
      />

      <Text style={styles.label}>Rent Price</Text>
      <TextInput
        style={styles.textInput}
        value={propertyData?.rent_amount}
        onChangeText={setRentPrice}
        keyboardType="numeric"
        placeholder="$ 315 /month"
        placeholderTextColor={colors.textinputplaceholdercolor}
      />

      <View style={styles.optionsContainer}>
        {['monthly', 'yearly'].map(type => (
          <TouchableOpacity
            key={type}
            style={[
              styles.optionButton,
              propertyData.rent_payable === type && styles.selectedOption,
            ]}
            onPress={() => setRentType(type)}>
            <Text
              style={[
                styles.optionText,
                propertyData.rent_payable === type && styles.selectedOptionText,
              ]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Property Features</Text>
      <View style={styles.featureContainer}>
        <Text style={styles.featureLabel}>Bedroom</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() =>
              setBedrooms(prev => (prev !== '' ? parseInt(prev, 10) - 1 : 0))
            }>
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterValue}>
            {bedrooms || propertyData?.bedroom_count}
          </Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() =>
              setBedrooms(prev => (prev !== '' ? parseInt(prev, 10) + 1 : 0))
            }>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.featureContainer}>
        <Text style={styles.featureLabel}>Bathroom</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() =>
              setBathrooms(prev => (prev !== '' ? parseInt(prev, 10) - 1 : 0))
            }>
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterValue}>
            {bathrooms || propertyData?.bathroom_count}
          </Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() =>
              setBathrooms(prev => (prev !== '' ? parseInt(prev, 10) + 1 : 0))
            }>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.featureContainer}>
        <Text style={styles.featureLabel}>Car Space</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() =>
              setCarSpace(prev => (prev !== '' ? parseInt(prev, 10) - 1 : 0))
            }>
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterValue}>
            {carSpace || propertyData?.car_space_count}
          </Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() =>
              setCarSpace(prev => (prev !== '' ? parseInt(prev, 10) + 1 : 0))
            }>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.featureContainer}>
        <Text style={styles.featureLabel}>Total Rooms</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() =>
              setTotalRooms(prev => (prev !== '' ? parseInt(prev, 10) - 1 : 0))
            }>
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterValue}>
            {totalRooms || propertyData?.total_room_count}
          </Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() =>
              setTotalRooms(prev => (prev !== '' ? parseInt(prev, 10) + 1 : 0))
            }>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <Text style={styles.label}>Total Rooms</Text>
      <View style={styles.roomOptionsContainer}>
        {['<4', '4', '6', '>6'].map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.roomOption,
              propertyData.total_room_count === option &&
                styles.selectedRoomOption,
            ]}
            onPress={() => setTotalRooms(option)}>
            <Text
              style={[
                styles.roomOptionText,
                propertyData.total_room_count === option &&
                  styles.selectedoption,
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View> */}

      {/* Update Button */}
      <TouchableOpacity style={styles.updateButton} onPress={handleSave}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.checkIconContainer}>
            <Ionicons name="checkmark-circle" size={70} color="#6DC94E" />
          </View>
          <Text style={styles.publishedText}>
            Your listing is <Text style={styles.boldText}>updated</Text>
          </Text>
          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Add More</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.finishButtonModal}
              onPress={handleModalFinish}>
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 24,
    marginRight: 10,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    // marginBottom: 20,
    marginTop: 20,
  },
  textInput: {
    color: colors.black,
    width: width * 0.9,
    backgroundColor: colors.textinputfill,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: '#333',
    color: colors.primary,
    marginBottom: 10,
    // marginTop:10
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    // borderWidth: 1,
    // borderColor: '#EAEAEA',
    backgroundColor: colors.textinputfill,
    marginRight: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    color: colors.boldtextcolor,
    marginTop: 20,
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: colors.textinputfill,
    height: height / 12,
    borderRadius: 15,
    padding: 10,
  },
  featureLabel: {
    fontSize: 16,
    color: colors.boldtextcolor,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 20,
    color: colors.boldtextcolor,
  },
  counterValue: {
    marginHorizontal: 10,
    fontSize: 18,
    color: colors.black,
  },
  selectedOption: {
    backgroundColor: colors.primary,
    borderColor: '#0047AB',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  selectedOptionText: {
    color: '#fff',
  },
  label: {
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    color: colors.boldtextcolor,
    marginTop: 20,
  },
  input: {
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
    backgroundColor: '#F7F7F7',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: colors.textinputfill,
  },
  selectedToggleButton: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    color: colors.boldtextcolor,
    fontSize: 14,
    fontFamily: 'Lato-Medium',
  },
  selectedtext: {
    color: colors.white,
  },
  imageContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  imageDetails: {
    marginLeft: 10,
  },
  propertyName: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  propertyLocation: {
    fontSize: 14,
    color: '#888',
  },
  input: {
    color: colors.black,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  toggleButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '30%',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  toggleButtonText: {
    color: '#fff',
  },
  photoSection: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  photoContainer: {
    position: 'relative',
    marginRight: 10,
  },
  listingImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removePhoto: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 5,
  },
  removePhotoText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addPhoto: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  addPhotoText: {
    fontSize: 30,
  },
  roomOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  roomOption: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: colors.textinputfill,
    width: width / 6,
    alignItems: 'center',
  },
  selectedRoomOption: {
    backgroundColor: colors.primary,
  },
  roomOptionText: {
    color: colors.boldtextcolor,
    fontSize: 16,
  },
  selectedoption: {
    color: colors.white,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    fontSize: 24,
    marginHorizontal: 10,
  },
  updateButton: {
    backgroundColor: colors.buttons,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    paddingBottom: 50,
  },
  checkIconContainer: {
    backgroundColor: '#EAF7EA',
    borderRadius: 50,
    padding: 20,
    marginBottom: 20,
  },
  publishedText: {
    fontSize: 20,
    color: colors.boldtextcolor,
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    marginBottom: 20,
  },
  boldText: {
    fontFamily: 'Lato-Bold',
    color: colors.primary,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  addButton: {
    backgroundColor: colors.buttons,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  finishButtonModal: {
    backgroundColor: '#6DC94E',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditListingScreen;
