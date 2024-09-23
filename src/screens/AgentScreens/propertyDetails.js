import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import {DOMAIN, getPropertiesById} from '../../utils/apiUtils'; // API import
import colors from '../../styles/colors';
import Button from '../../components/Button';
import {useAuth} from '../../contexts/AuthContext';

const {width, height} = Dimensions.get('window');

const PropertyDetail = ({route, navigation}) => {
  const {property} = route.params;
  const {userData} = useAuth();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch single property details
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        const response = await getPropertiesById(property.id, userData.token);
        console.log();
        setPropertyDetails(response.data); // Assuming data is returned under `data`
        setLoading(false);
      } catch (error) {
        console.error('Error fetching property details:', error);
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [property.id, userData.token]);

  // Toggle favorite handler
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Toggle modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Handle image press
  const handleImagePress = () => {
    const images = propertyDetails.images; // Replace with actual image URIs
    navigation.navigate('AgentStack', {
      screen: 'ImageSlider',
      params: {images},
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          top: 30,
          left: 20,
          zIndex: 10,
          justifyContent: 'space-between',
          width: '100%',
          position: 'absolute',
        }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.heartIcon,
            {
              backgroundColor: isFavorite
                ? colors.buttons
                : colors.boldtextcolor,
            },
          ]}
          onPress={handleToggleFavorite}>
          <MaterialCommunityIcons
            name={isFavorite ? 'cards-heart' : 'cards-heart-outline'}
            size={15}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.category}>
        <Text style={styles.categorytext}>
          {propertyDetails.propertyCategory}
        </Text>
      </View>

      <Image
        source={
          propertyDetails.images.length > 0
            ? {uri: `${DOMAIN}${propertyDetails.images[0].imagePath}`}
            : require('../../../assets/images/role1.png')
        }
        style={styles.image}
      />
      <View style={{left: 250, top: 450, position: 'absolute'}}>
        <TouchableOpacity onPress={handleImagePress}>
          <View
            style={{
              backgroundColor: colors.black,
              opacity: 0.5,
              width: width * 0.2,
              height: height * 0.08,
              borderRadius: 20,
            }}>
            <Image
              source={
                propertyDetails.images.length
                  ? {uri: `${DOMAIN}${propertyDetails.images[0].imagePath}`}
                  : require('../../../assets/images/role1.png')
              }
              style={{
                marginBottom: 15,
                width: width * 0.2,
                height: height * 0.08,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: colors.white,
              }}></Image>
          </View>
        </TouchableOpacity>
        <Text style={{position: 'obsolute', bottom: 40, left: 20}}>
          {propertyDetails.images.length}
        </Text>
        {/* <Entypo
          style={{position: 'obsolute', bottom: 40, left: 20}}
          name="plus"
          size={24}
          color={colors.white}
        /> */}
      </View>

      {/* Render the rest of the property details */}
      <View style={styles.detailsContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>{propertyDetails.title}</Text>
          <Text style={styles.price}>$ {propertyDetails.sellingPrice}</Text>
        </View>
        <Text style={styles.location}>{propertyDetails.location}</Text>
        <Button
          title="Contact Agent"
          onPress={toggleModal}
          style={styles.button}
        />
        <View style={styles.divider}></View>
        {/* <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactText}>Contact Agent</Text>
        </TouchableOpacity> */}
        <View style={styles.agentContainer}>
          <Image
            source={require('../../../assets/images/profile.png')}
            style={styles.agentImage}
          />
          <View>
            <Text style={styles.agentName}>
              {propertyDetails.createdBy.name}
            </Text>
            <Text style={styles.agentTitle}>
              {propertyDetails.createdBy.email}
            </Text>
          </View>
        </View>
        <View style={styles.livingdetails}>
          <View style={styles.bedroomcontainer}>
            <MaterialIcon
              name="bedroom-parent"
              color={colors.buttons}
              size={20}
            />
            <Text style={styles.livingtext}>
              Bedrooms {propertyDetails.bedroomCount}
            </Text>
          </View>
          <View style={styles.bedroomcontainer}>
            <MaterialIcon name="bathroom" color={colors.buttons} size={20} />
            <Text style={styles.livingtext}>
              Bathroom {propertyDetails.bathroomCount}
            </Text>
          </View>
          <View style={styles.bedroomcontainer}>
            <MaterialIcon name="garage" color={colors.buttons} size={20} />
            <Text style={styles.livingtext}>
              Garage {propertyDetails.carSpaceCount}
            </Text>
          </View>
        </View>
        <View style={styles.locationdetailscontainer}>
          <Text style={styles.locationdetials}>Location</Text>
          <View
            style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: width * 0.14,
                height: height * 0.06,
                backgroundColor: colors.textinputfill,
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="map-marker"
                size={24}
                color={colors.black}
              />
            </View>
            <Text style={styles.adreessText}>{propertyDetails.location}</Text>
          </View>
          <View>
            <Text style={styles.locationdetials}>Cost of living</Text>
            <View
              style={{
                width: width * 0.3,
                height: height * 0.06,
                backgroundColor: colors.textinputfill,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={styles.priceText}>
                $ {propertyDetails.sellingPrice}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        backdropColor={colors.primary}
        backdropOpacity={0.8}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.noContainerModal}>
            <Text style={styles.modalText}>
              {propertyDetails.createdBy.phoneNo}
            </Text>
          </View>
          <Button
            title="Cancel"
            onPress={toggleModal}
            style={styles.modalButton}
          />
        </View>
      </Modal>
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
    marginRight: 40,
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
  imageslidercontainer: {
    position: 'absolute',
    // backgroundColor: colors.primary,
    // borderWidth:1,
    // borderColor:colors.black,
    width: width * 0.2,
    height: height * 0.08,
    borderRadius: 20,
    // alignItems: 'center',
    // alignContent: 'center',
    // justifyContent: 'center',
  },
  categorytext: {
    fontSize: 18,
    fontFamily: 'Lato-Regular',
  },
  image: {
    width: width / 1.07,
    height: height / 1.45,
    resizeMode: 'cover',
    borderRadius: 50,
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
    marginVertical: 15,
  },
  divider: {
    width: width * 0.9,
    alignSelf: 'center',
    height: 1,
    borderRadius: 10,
    backgroundColor: colors.textinputfill,
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
    fontFamily: 'Lato-Regular',
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
    flexDirection: 'row',
  },
  livingtext: {
    color: colors.boldtextcolor,
    fontSize: 12,
    fontFamily: 'Lato-Regular',
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
  adreessText: {
    color: colors.boldtextcolor,
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    marginLeft: 10,
  },
  priceText: {
    alignSelf: 'center',
    color: colors.black,
    fontFamily: 'Lato-Black',
    fontSize: 20,
    // marginLeft: 20,
    color: colors.boldtextcolor,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  noContainerModal: {
    width: width * 0.8,
    height: height * 0.08,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    color: colors.white,
    //

    // alignSelf:'center',
  },
  modalButton: {
    width: width * 0.8,
    height: height * 0.08,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: colors.buttons,
  },
});

export default PropertyDetail;
