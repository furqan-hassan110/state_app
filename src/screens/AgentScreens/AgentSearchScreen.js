import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FloatingAction } from 'react-native-floating-action';
import colors from '../../styles/colors';
import PropertyCardForAgent from '../../components/PropertyCardForAgent';

const { width, height } = Dimensions.get('window');

const AgentSearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [propertyList, setPropertyList] = useState([]);


  useEffect(() => {
    if (route.params?.finalDetails) {
      setPropertyList(prevList => {
        const existingIndex = prevList.findIndex(
          property => property.id === route.params.finalDetails.id
        );
        
        if (existingIndex !== -1) {
          // Update the existing property
          const updatedList = [...prevList];
          updatedList[existingIndex] = route.params.finalDetails;
          return updatedList;
        } else {
          // Add the new property
          return [...prevList, route.params.finalDetails];
        }
      });
    }
  }, [route.params?.finalDetails]);

  const handleAddListing = () => {
    navigation.navigate('AddListingScreen'); // Ensure this matches your actual route name
  };

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <TouchableOpacity style={styles.backbutton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Search results</Text>
      </View>
      <FlatList
        data={propertyList}
        // horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()} // Ideally use item.id if available
        renderItem={({ item }) => (
          <TouchableOpacity>
            <PropertyCardForAgent
              bathrooms={item.bathrooms}
              bedrooms={item.bedrooms}
              carSpace={item.carSpace}
              listingType={item.listingType}
              propertyCategory={item.propertyCategory}
              propertyType={item.propertyType}
              rentPrice={item.rentPrice}
              rentType={item.rentType}
              sellPrice={item.sellPrice}
              totalRooms={item.totalRooms}
              images={item.images}
              
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
      <FloatingAction
        color={colors.buttons} // Customize the button color
        onPressMain={handleAddListing}
        floatingIcon={<Ionicons name="add" size={24} color="white" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding:10
  },
  listContainer: {
    paddingHorizontal: 10,
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
});

export default AgentSearchScreen;
