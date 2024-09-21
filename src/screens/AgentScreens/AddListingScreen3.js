import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import colors from '../../styles/colors';
import {createProperties} from '../../utils/apiUtils';
import {useAuth} from '../../contexts/AuthContext';

const {width, height} = Dimensions.get('window');

const AddListingStep3 = ({route}) => {
  const {images} = route.params;
  const token = useAuth();
  console.log('IAMGES ==> ', images);
  const navigation = useNavigation();
  const [sellPrice, setSellPrice] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [rentType, setRentType] = useState('Monthly');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [carSpace, setCarSpace] = useState('');
  const [totalRooms, setTotalRooms] = useState('<4');
  const [isModalVisible, setModalVisible] = useState(false);

  const handleNext = () => {
    const propertyObject = {
      title: route.params?.listingTitle || 'Sample Title',
      location: route.params?.listingLocation || 'Sample Location',
      address: route.params?.listingAddress || 'Sample Address',
      construction_status:
        route.params?.constructionStatus || 'Under Construction',
      listing_type: route.params?.listingType || 'rent',
      property_category: route.params?.propertyCategory || 'Residential',
      property_size: route.params?.propertySize || '1200',
      property_type: route.params?.propertyType || 'Apartment',
      selling_amount: sellPrice || '',
      rent_amount: rentPrice || '',
      rent_payable: rentType || 'Monthly',
      total_room_count: totalRooms || '2',
      bedroom_count: bedrooms,
      bathroom_count: bathrooms || '',
      car_space_count: carSpace || '',
      images,
    };

    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('images[]', {
        uri: image.uri,
        name: image.name || `image_${index}.jpg`,
        type: image.type || 'image/jpeg',
      });
    });
    formData.append('title', propertyObject.title);
    formData.append('location', propertyObject.location);
    formData.append('address', propertyObject.address);
    formData.append('construction_status', propertyObject.construction_status);
    formData.append('listing_type', propertyObject.listing_type);
    formData.append('property_category', propertyObject.property_category);
    formData.append('property_size', propertyObject.property_size);
    formData.append('property_type', propertyObject.property_type);
    formData.append('selling_amount', propertyObject.selling_amount);
    formData.append('rent_amount', propertyObject.rent_amount);
    formData.append('rent_payable', propertyObject.rent_payable);
    formData.append('total_room_count', propertyObject.total_room_count);
    formData.append('bedroom_count', propertyObject.bedroom_count);
    formData.append('bathroom_count', propertyObject.bathroom_count);
    formData.append('car_space_count', propertyObject.car_space_count);
    // console.log('FORM DATA ==> ', formData);
    const {userData} = token;
    const userToken = userData?.token;

    createProperties(formData, userToken)
      .then(res => {
        console.log('CREATE PROPERTY [RES] ==> ', res);
        if (res.success) {
          setModalVisible(true);
        } else {
          console.error('Error creating property:', res.message);
        }
      })
      .catch(err => {
        console.log('CREATE PROPERTY [ERR] ==> ', err);
      });
  };

  const handleModalFinish = () => {
    navigation.navigate('BottomTabAgent', {
      screen: 'Search',
      // params: { finalDetails },
    });
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Add Listing</Text>
      </View>
      <Text style={styles.subtitle}>
        Almost <Text style={styles.highlight}>finish</Text>, complete the
        listing
      </Text>

      <Text style={styles.label}>Sell Price</Text>
      <TextInput
        style={styles.input}
        value={sellPrice}
        onChangeText={setSellPrice}
        keyboardType="numeric"
        placeholder="$ 180,000"
        placeholderTextColor={colors.textinputplaceholdercolor}
      />

      <Text style={styles.label}>Rent Price</Text>
      <TextInput
        style={styles.input}
        value={rentPrice}
        onChangeText={setRentPrice}
        keyboardType="numeric"
        placeholder="$ 315 /month"
        placeholderTextColor={colors.textinputplaceholdercolor}
      />

      <View style={styles.toggleContainer}>
        {['monthly', 'yearly'].map(type => (
          <TouchableOpacity
            key={type}
            style={[
              styles.toggleButton,
              rentType === type && styles.selectedToggleButton,
            ]}
            onPress={() => setRentType(type)}>
            <Text
              style={[
                styles.toggleText,
                rentType === type && styles.selectedtext,
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
            onPress={() => setBedrooms(prev => Math.max(Number(prev) - 1, 0))}>
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterValue}>{bedrooms}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setBedrooms(prev => Number(prev) + 1)}>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.featureContainer}>
        <Text style={styles.featureLabel}>Bathroom</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setBathrooms(prev => Math.max(Number(prev) - 1, 0))}>
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterValue}>{bathrooms}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setBathrooms(prev => Number(prev) + 1)}>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.featureContainer}>
        <Text style={styles.featureLabel}>Car Space</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setCarSpace(prev => Math.max(Number(prev) - 1, 0))}>
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterValue}>{carSpace}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setCarSpace(prev => Number(prev) + 1)}>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.label}>Total Rooms</Text>
      <View style={styles.roomOptionsContainer}>
        {['<4', '4', '6', '>6'].map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.roomOption,
              totalRooms === option && styles.selectedRoomOption,
            ]}
            onPress={() => setTotalRooms(option)}>
            <Text
              style={[
                styles.roomOptionText,
                totalRooms === option && styles.selectedoption,
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.finishButton} onPress={handleNext}>
        <Text style={styles.finishButtonText}>Finish</Text>
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
            Your listing is now <Text style={styles.boldText}>published</Text>
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
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    backgroundColor: colors.textinputfill,
    width: width / 7,
    height: height / 15,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    color: colors.boldtextcolor,
    marginLeft: 60,
  },
  subtitle: {
    fontSize: 25,
    color: colors.primary,
    fontFamily: 'Lato-Regular',
    marginTop: 20,
  },
  highlight: {
    fontFamily: 'Lato-Bold',
    color: colors.boldtextcolor,
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
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.textinputfill,
    alignItems: 'center',
    justifyContent: 'center',
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
  finishButton: {
    backgroundColor: colors.buttons,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 50,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
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

export default AddListingStep3;
