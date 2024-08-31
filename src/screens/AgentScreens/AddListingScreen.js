import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBar from '../../components/SearchBar';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const AddListingScreen = () => {
  const navigation = useNavigation();
  
  const [listingType, setListingType] = useState(null);
  const [propertyCategory, setPropertyCategory] = useState(null);
  const [propertyType, setPropertyType] = useState(null);

  const handleSelection = (type, value) => {
    switch(type) {
      case 'listingType':
        setListingType(value);
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
    // Navigate to AddListingStep2 and pass the data
    navigation.navigate('AddListingScreen2', {
      // listingTitle,
      listingType,
      propertyCategory,
      propertyType,
    });
  };

  return (
    <View style={styles.container}>
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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Listing type</Text>
        <View style={styles.optionsContainer}>
          {['Rent', 'Sell'].map(type => (
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
          {['House', 'Apartment', 'Villa'].map(category => (
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
          {['Commercial', 'Industrial', 'Land'].map(type => (
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
    </View>
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
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddListingScreen;
