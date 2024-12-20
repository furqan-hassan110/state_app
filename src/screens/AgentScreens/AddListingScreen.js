import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  ToastAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const AddListingScreen = () => {
  const navigation = useNavigation();

  const [listingType, setListingType] = useState('');
  const [constructionStatus, setConstructionStatus] = useState('');
  const [propertyCategory, setPropertyCategory] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [listingTitle, setListingTitle] = useState('');
  const [listingAddress, setListingAddress] = useState('');
  const [listingLocation, setListingLocation] = useState('');

  const handleSelection = (type, value) => {
    switch (type) {
      case 'listingType':
        setListingType(value);
        break;
      case 'constructionStatus':
        setConstructionStatus(value);
        break;
      case 'propertyCategory':
        setPropertyCategory(value);
        break;
      case 'propertyType':
        setPropertyType(value);
        break;
    }
  };

  const handleNext = () => {
    // Validation: Check if all fields are filled
    if (
      !listingTitle ||
      !listingAddress ||
      !listingLocation ||
      !listingType ||
      !constructionStatus ||
      !propertyCategory ||
      !propertyType
    ) {
      ToastAndroid.show('Please fill all the feilds', ToastAndroid.SHORT);
      return;
    }

    // Navigate to the next screen if validation passes
    navigation.navigate('AddListingScreen2', {
      constructionStatus,
      listingTitle,
      listingAddress,
      listingLocation,
      listingType,
      propertyCategory,
      propertyType,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.backbutton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Add Listing</Text>
      </View>
      <Text style={styles.subtitle}>
        Hi Cynthia, Fill detail of your{' '}
        <Text style={styles.highlight}>real estate</Text>
      </Text>

      <View>
        <Text style={styles.sectionTitle}>Title</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Listing Title"
          placeholderTextColor={colors.textinputplaceholdercolor}
          value={listingTitle}
          onChangeText={setListingTitle}
        />
      </View>
      <View>
        <Text style={styles.sectionTitle}>Address</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Listing Address"
          placeholderTextColor={colors.textinputplaceholdercolor}
          value={listingAddress}
          onChangeText={setListingAddress}
        />
      </View>
      <View>
        <Text style={styles.sectionTitle}>Location</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Listing Location"
          placeholderTextColor={colors.textinputplaceholdercolor}
          value={listingLocation}
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
                constructionStatus === status && styles.selectedOption,
              ]}
              onPress={() => handleSelection('constructionStatus', status)}>
              <Text
                style={[
                  styles.optionText,
                  constructionStatus === status && styles.selectedOptionText,
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
                listingType === type && styles.selectedOption,
              ]}
              onPress={() => handleSelection('listingType', type)}>
              <Text
                style={[
                  styles.optionText,
                  listingType === type && styles.selectedOptionText,
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
                propertyCategory === category && styles.selectedOption,
              ]}
              onPress={() => handleSelection('propertyCategory', category)}>
              <Text
                style={[
                  styles.optionText,
                  propertyCategory === category && styles.selectedOptionText,
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
                propertyType === type && styles.selectedOption,
              ]}
              onPress={() => handleSelection('propertyType', type)}>
              <Text
                style={[
                  styles.optionText,
                  propertyType === type && styles.selectedOptionText,
                ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backIcon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
    color: colors.boldtextcolor,
    // marginLeft:
    // alignSelf:''
    marginLeft: 60,
    // color: '#333',
  },
  subtitle: {
    fontSize: 25,
    color: colors.primary,
    fontFamily: 'Lato-Regular',
    marginTop: 20,
  },
  highlight: {
    // fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#F7F7F7',
  },
  textInput: {
    color: colors.black,
    width: width * 0.88,
    backgroundColor: colors.textinputfill,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  homeIcon: {
    marginLeft: 10,
  },
  section: {
    // marginBottom: 20,
    marginTop: 20,
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
  nextButton: {
    backgroundColor: colors.buttons,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 50,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddListingScreen;
