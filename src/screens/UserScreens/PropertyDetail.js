import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import colors from '../../styles/colors';
import Button from '../../components/Button';

const { width, height } = Dimensions.get('window');

const PropertyDetail = ({ route, navigation }) => {
  const { property } = route.params;


  const [isFavorite, setIsFavorite] = useState(false);

  // Function to handle the press event
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{
        flexDirection: 'row', top: 30,
        left: 20,
        zIndex: 10, justifyContent: 'space-between', width: '100%', position: 'absolute', alignItems: 'center', alignContent: 'center'
      }}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.heartIcon, { backgroundColor: isFavorite ? colors.buttons : colors.boldtextcolor }]}
          onPress={handleToggleFavorite}
        >
          <MaterialCommunityIcons
            name={isFavorite ? 'cards-heart' : 'cards-heart-outline'}
            size={15}
            color='white'
          />
        </TouchableOpacity>
      </View>
      <View style={styles.category}>
        <Text style={styles.categorytext}>{property.category}</Text>
      </View>
      <Image source={property.imageSource} style={styles.image} />
      <View style={styles.detailsContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>{property.Title}</Text>
          <Text style={styles.price}>${property.price}</Text>
        </View>
        <Text style={styles.location}>{property.cityName}, {property.country}</Text>
        <Button
          title="Contact Agent"
          // onPress={handleSubmit}
          style={styles.button}
        />
        <View style={styles.divider}></View>
        {/* <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactText}>Contact Agent</Text>
        </TouchableOpacity> */}
        <View style={styles.agentContainer}>
          <Image source={require('../../../assets/images/profile.png')} style={styles.agentImage} />
          <View>
            <Text style={styles.agentName}>Cynthia</Text>
            <Text style={styles.agentTitle}>Real Estate Agent</Text>
          </View>
        </View>
        <View style={styles.livingdetails}>
          <View style={styles.bedroomcontainer}>
            <MaterialIcon name='bedroom-parent' color={colors.buttons} size={20} />
            <Text style={styles.livingtext}>Bedrooms {property.bedroom}</Text>
          </View>
          <View style={styles.bedroomcontainer}>
            <MaterialIcon name='bathroom' color={colors.buttons} size={20} />
            <Text style={styles.livingtext}>Bathroom {property.bathroom}</Text>
          </View>
          <View style={styles.bedroomcontainer}>
            <MaterialIcon name='garage' color={colors.buttons} size={20} />
            <Text style={styles.livingtext}>Garage {property.garage}</Text>
          </View>
        </View>
        <View style={styles.locationdetailscontainer}>
          <Text style={styles.locationdetials}>Location</Text>
          <View style={{ marginTop: 10, flexDirection:'row', alignItems:'center' }}>
            <View style={{ width: width * 0.14, height: height * 0.06, backgroundColor: colors.textinputfill, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons name='map-marker' size={24} color={colors.black} />
            </View>
            <Text style={styles.adreessText}>
              {property.areaName}, {property.cityName}, {property.country}, 
            </Text>
          </View>
          <View style={styles.locationdetials}>
          <Text>Cost of living</Text>
          </View>
          
        </View>          
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
  backButton: {
    // position: 'absolute',
    backgroundColor: colors.textinputfill,
    width: width * 0.13,
    height: height * 0.06,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  heartIcon: {
    width: width * 0.13,
    height: height * 0.06,
    // position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // margin:20,
    // zIndex: 1,
    borderRadius: 50,
    marginRight: 40
  },
  category: {
    position: 'absolute',
    backgroundColor: colors.primary,
    top: 450,
    left: 20,
    zIndex: 10,
    width: width * 0.25,
    height: height * 0.05,
    borderRadius: 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  categorytext: {
    fontSize: 18,
    fontFamily: 'Lato-Regular'
  },
  image: {
    width: width / 1.07,
    height: height / 1.45,
    resizeMode: 'cover',
    borderRadius: 50
  },
  detailsContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
    color: colors.boldtextcolor,
  },
  location: {
    fontSize: 12,
    color: colors.boldtextcolor,
    // marginVertical: 10,
    fontFamily: 'Lato-Regular',
  },
  price: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    color: colors.primary,
    // marginBottom: 20,
  },
  button: {
    width: width * 0.75,
    height: height * 0.075,
    // top: 60,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: colors.buttons,
    marginVertical: 15
  },
  divider: {
    width: width * 0.9,
    alignSelf: 'center',
    height: 1,
    borderRadius: 10,
    backgroundColor: colors.textinputfill
  },
  contactText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  agentContainer: {
    marginTop: 15,
    Width: width * 0.8,
    height: height * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.textinputfill,
    borderRadius: 20,
    padding: 10,
  },
  agentImage: {
    width: 45,
    height: 40,
    // borderRadius: 25,
    marginRight: 10,
  },
  agentName: {
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    // fontWeight: 'bold',
    color: colors.boldtextcolor,
  },
  agentTitle: {
    fontSize: 12,
    color: colors.boldtextcolor,
    fontFamily: 'Lato-Regular'
  },
  livingdetails: {
    flexWrap: 'wrap',
    marginTop: 20,
    flexDirection: 'row',
    // justifyContent:'space-around'
  },
  bedroomcontainer: {
    backgroundColor: colors.textinputfill,
    width: width * 0.3,
    height: height * 0.06,
    borderRadius: 25,
    marginRight: 30,
    marginTop: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  livingtext: {
    color: colors.boldtextcolor,
    fontSize: 12,
    fontFamily: 'Lato-Regular'
  },
  locationdetailscontainer: {
    marginTop: 20,
  },
  locationdetials: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    color: colors.boldtextcolor,
    // flexDirection:'row'
    },
  adreessText:{
    color:colors.black,
    fontFamily:'Lato-Regular',
    fontSize:12,
    marginLeft:20
  }
});

export default PropertyDetail;
