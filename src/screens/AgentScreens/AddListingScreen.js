import React, { useState } from 'react';
<<<<<<< HEAD
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
=======
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions , ScrollView} from 'react-native';
>>>>>>> 005a42c (crud agent)
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBar from '../../components/SearchBar';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';

<<<<<<< HEAD
=======

>>>>>>> 005a42c (crud agent)
const { width, height } = Dimensions.get('window');

const AddListingScreen = () => {
  const navigation = useNavigation();
  
  const [listingType, setListingType] = useState(null);
<<<<<<< HEAD
  const [propertyCategory, setPropertyCategory] = useState(null);
  const [propertyType, setPropertyType] = useState(null);
=======
  const [constructionStatus, setConstructionStatus] = useState(null);
  const [propertyCategory, setPropertyCategory] = useState(null);
  const [propertyType, setPropertyType] = useState(null);
  const [listingTitle, setListingTitle] = useState();
>>>>>>> 005a42c (crud agent)

  const handleSelection = (type, value) => {
    switch(type) {
      case 'listingType':
        setListingType(value);
        break;
<<<<<<< HEAD
=======
      case 'constructionStatus':
        setConstructionStatus(value);
        break;
>>>>>>> 005a42c (crud agent)
      case 'propertyCategory':
        setPropertyCategory(value);
        break;
      case 'propertyType':
        setPropertyType(value);
        break;
    }
  };

  const handleNext = () => {
<<<<<<< HEAD
    // Navigate to AddListingStep2 and pass the data
    navigation.navigate('AddListingScreen2', {
      // listingTitle,
=======
    navigation.navigate('AddListingScreen2', {
      constructionStatus,
      listingTitle,
>>>>>>> 005a42c (crud agent)
      listingType,
      propertyCategory,
      propertyType,
    });
  };

  return (
<<<<<<< HEAD
    <View style={styles.container}>
=======
    <ScrollView style={styles.container}>
>>>>>>> 005a42c (crud agent)
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity style={styles.backbutton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
      <Text style={styles.title}>Add Listing</Text>
      </View>
      <Text style={styles.subtitle}>Hi Cynthia, Fill detail of your <Text style={styles.highlight}>real estate</Text></Text>

      {/* <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="The Lodge House"
          placeholderTextColor="#000"
          editable={false}
        />
        <Ionicons name="home-outline" size={24} color="#000" style={styles.homeIcon} />
      </View> */}
      <SearchBar style={{marginBottom:10}}/>
<<<<<<< HEAD
=======
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Listing Title"
          placeholderTextColor={colors.textinputplaceholdercolor}
          value={listingTitle}
          onChangeText={setListingTitle} 
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Construction status</Text>
        <View style={styles.optionsContainer}>
          {['new', 'used'].map(status => (
            <TouchableOpacity
              key={status}
              style={[styles.optionButton, constructionStatus === status && styles.selectedOption]}
              onPress={() => handleSelection('constructionStatus', status)}
            >
              <Text style={[styles.optionText, constructionStatus === status && styles.selectedOptionText]}>{status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
>>>>>>> 005a42c (crud agent)

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Listing type</Text>
        <View style={styles.optionsContainer}>
<<<<<<< HEAD
          {['Rent', 'Sell'].map(type => (
=======
          {['rent', 'sell'].map(type => (
>>>>>>> 005a42c (crud agent)
            <TouchableOpacity
              key={type}
              style={[styles.optionButton, listingType === type && styles.selectedOption]}
              onPress={() => handleSelection('listingType', type)}
            >
              <Text style={[styles.optionText, listingType === type && styles.selectedOptionText]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Property category</Text>
        <View style={styles.optionsContainer}>
<<<<<<< HEAD
          {['House', 'Apartment', 'Villa'].map(category => (
=======
          {['house', 'apartment'].map(category => (
>>>>>>> 005a42c (crud agent)
            <TouchableOpacity
              key={category}
              style={[styles.optionButton, propertyCategory === category && styles.selectedOption]}
              onPress={() => handleSelection('propertyCategory', category)}
            >
              <Text style={[styles.optionText, propertyCategory === category && styles.selectedOptionText]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Property Type</Text>
        <View style={styles.optionsContainer}>
<<<<<<< HEAD
          {['Commercial', 'Industrial', 'Land'].map(type => (
=======
          {['commercial', 'industrial', 'land'].map(type => (
>>>>>>> 005a42c (crud agent)
            <TouchableOpacity
              key={type}
              style={[styles.optionButton, propertyType === type && styles.selectedOption]}
              onPress={() => handleSelection('propertyType', type)}
            >
              <Text style={[styles.optionText, propertyType === type && styles.selectedOptionText]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
<<<<<<< HEAD
    </View>
=======
    </ScrollView>
>>>>>>> 005a42c (crud agent)
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
    fontFamily:'Lato-Bold',
    color:colors.boldtextcolor,
    // marginLeft:
    // alignSelf:''
    marginLeft:60
    // color: '#333',
  },
  subtitle: {
    fontSize: 25,
    color: colors.primary,
    fontFamily:'Lato-Regular',
    marginTop: 20,
  },
  highlight: {
    // fontWeight: 'bold',
    fontFamily:'Lato-Bold',
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
<<<<<<< HEAD
=======
  textInput: {
    color:colors.black,
    width: width * 0.9,
    backgroundColor: colors.textinputfill,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
>>>>>>> 005a42c (crud agent)
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
    marginTop:20

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: '#333',
    color:colors.primary,
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
<<<<<<< HEAD
=======
    marginBottom:50
>>>>>>> 005a42c (crud agent)
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddListingScreen;
