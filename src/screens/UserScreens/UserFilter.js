import React, { useState , useCallback} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import RangeSlider from 'react-native-range-slider'
// import Slider from 'rn-range-slider';
import Slider from '@react-native-community/slider'; // Corrected import for Slider
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const UserFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState('House');
  const [selectedPrice, setSelectedPrice] = useState(1000);
  const [selectedBedrooms, setSelectedBedrooms] = useState(0);
  const [selectedBathrooms, setSelectedBathrooms] = useState(0);
  const [selectedCarSpaces, setSelectedCarSpaces] = useState(0);
  const [selectedConstructionStatus, setSelectedConstructionStatus] = useState('New');
  const [selectedPropertyType, setSelectedPropertyType] = useState('Commercial');
  const [selectedLandSize, setSelectedLandSize] = useState(600);
  

  const navigation = useNavigation();

  const categories = ['House', 'Apartment'];
  const bedroomOptions = [1, 2, 3, 4, 5];
  const bathroomOptions = [1, 2, 3, 4, 5];
  const carSpaceOptions = [1, 2, 3, 4, 5];
  const constructionStatusOptions = ['New', 'Used'];
  const propertyTypes = ['Commercial', 'Industrial'];
  const landSizes = [600, 700, 1000, 1200];

  const renderOptions = (options, selected, onSelect) => {
    return options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.optionButton, selected === option && styles.selectedOption]}
        onPress={() => onSelect(option)}
      >
        <Text style={[styles.optionText, selected === option && styles.selectedOptionText]}>
          {option}
        </Text>
      </TouchableOpacity>
    ));
  };

  const applyFilters = () => {
    const filters = {
      category: selectedCategory,
      price: selectedPrice,
      bedrooms: selectedBedrooms,
      bathrooms: selectedBathrooms,
      carSpaces: selectedCarSpaces,
      constructionStatus: selectedConstructionStatus,
      propertyType: selectedPropertyType,
      landSize: selectedLandSize,
    };
    // console.log("Navigating to UserSearch with filters:", filters);
  navigation.navigate('UserStack', { screen: 'UserSearch', params: { filters } });
  };

  // console.log("UserFilter Component Rendered");

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backbutton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter</Text>
        <TouchableOpacity style={styles.filterIconContainer}>
          <MaterialCommunityIcons name="tune-vertical-variant" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Category */}
      <Text style={styles.sectionTitle}>Category</Text>
      <View style={styles.optionsContainer}>
        {renderOptions(categories, selectedCategory, setSelectedCategory)}
      </View>

      {/* Price Range */}
      <Text style={styles.sectionTitle}>Price Range</Text>
      <View style={styles.sliderContainer}>
        <View style={{ flex: 1, height: 40, width: '100%', }}>
        <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={5000}
        step={6}
        value={selectedPrice}
        onValueChange={value => setSelectedPrice(value)}
        minimumTrackTintColor={colors.buttons}
        maximumTrackTintColor={colors.textinputplaceholdercolor}
        thumbTintColor={colors.buttons}
      />
        </View>
        {/* <View style={styles.priceLabels}>
          <Text style={styles.priceText}>${selectedPrice}</Text>
        </View> */}
      </View>

      {/* Bedrooms */}
      <Text style={styles.sectionTitle}>Bedrooms</Text>
      <View style={styles.optionsContainer2}>
        {renderOptions(bedroomOptions, selectedBedrooms, setSelectedBedrooms)}
      </View>

      {/* Bathrooms */}
      <Text style={styles.sectionTitle}>Bathrooms</Text>
      <View style={styles.optionsContainer}>
        {renderOptions(bathroomOptions, selectedBathrooms, setSelectedBathrooms)}
      </View>

      {/* Car Spaces */}
      <Text style={styles.sectionTitle}>Car Spaces</Text>
      <View style={styles.optionsContainer}>
        {renderOptions(carSpaceOptions, selectedCarSpaces, setSelectedCarSpaces)}
      </View>

      {/* Construction Status */}
      <Text style={styles.sectionTitle}>Construction Status</Text>
      <View style={styles.optionsContainer}>
        {renderOptions(constructionStatusOptions, selectedConstructionStatus, setSelectedConstructionStatus)}
      </View>

      {/* Property Type */}
      <Text style={styles.sectionTitle}>Property Type</Text>
      <View style={styles.optionsContainer}>
        {renderOptions(propertyTypes, selectedPropertyType, setSelectedPropertyType)}
      </View>

      {/* Land Size */}
      <Text style={styles.sectionTitle}>Land Size</Text>
      <View style={styles.optionsContainer}>
        {renderOptions(landSizes, selectedLandSize, setSelectedLandSize)}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  filterIconContainer: {
    backgroundColor: colors.buttons,
    borderRadius: 10,
    padding: 8,
  },
  backbutton: {
    backgroundColor: colors.textinputfill,
    width: width / 7,
    height: height / 15,
    borderRadius: 45,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
    color: colors.primary,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginTop: 8,
    // width:width*0.7,

  },
  optionsContainer2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginTop: 8,
  },
  optionButton: {
    // borderWidth: 1,
    // borderColor: colors.primary,
    // width:width*0.2,
    backgroundColor: colors.textinputfill,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: colors.buttons,
  },
  optionText: {
    fontSize: 14,
    color: colors.primary,
  },
  selectedOptionText: {
    color: '#fff',
  },
  sliderContainer: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceText: {
    fontSize: 14,
    color: colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 32,
  },
  resetButton: {
    // backgroundColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  resetButtonText: {
    color: colors.buttons,
    fontFamily: 'Lato-Bold',
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: colors.buttons,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: width * 0.4,
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UserFilter;
