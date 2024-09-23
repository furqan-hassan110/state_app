import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {BASE_URL, deleteCategory, DOMAIN} from '../utils/apiUtils';
import {useAuth} from '../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const PropertyCardForAgent = ({
  id,
  images,
  title,
  propertyCategory,
  propertyType,
  listingType,
  sellingPrice,
  rentPrice,
  rentType,
  bedrooms,
  bathrooms,
  carSpace,
  totalRooms,
  onRefresh,
}) => {
  const token = useAuth();
  const navigation = useNavigation();

  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this property?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const {userData} = token;
            const userToken = userData?.token;

            deleteCategory(id, userToken)
              .then(res => {
                if (res.success) {
                  ToastAndroid.show(
                    'Property deleted successfully',
                    ToastAndroid.SHORT,
                  );
                  onRefresh();
                } else {
                  ToastAndroid.show(
                    'Failed to delete property category',
                    ToastAndroid.SHORT,
                  );
                }
              })
              .catch(err => {
                console.log('PROPERTY DELETED [ERR] ==> ', err);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleUpdate = () => {
    navigation.navigate('EditListingScreen', {id: id});
  };
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={
            images.length
              ? {uri: `${DOMAIN}${images[0].imagePath}`}
              : require('../../assets/images/role1.png')
          }
          style={styles.image}
        />
        <View style={styles.propertyinfocontainer}>
          <Text style={styles.propertyinfo}>{propertyCategory}</Text>
          <Text style={styles.propertyinfo}>{propertyType}</Text>
          <Text style={styles.propertyinfo}>{listingType}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.propertyCategory}>{title}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>Sell:$ {sellingPrice}</Text>
          {rentPrice && (
            <Text style={styles.price}>
              Rent: ${rentPrice} / {rentType}
            </Text>
          )}
        </View>
      </View>
      <Menu>
        <MenuTrigger style={{marginTop: 10}}>
          <MaterialCommunityIcons
            color={colors.black}
            name={'dots-vertical'}
            size={25}
          />
        </MenuTrigger>
        <MenuOptions>
          <TouchableOpacity>
            <MenuOption onSelect={handleUpdate}>
              <Text style={styles.menuText}>Update</Text>
            </MenuOption>
          </TouchableOpacity>

          <TouchableOpacity>
            <MenuOption onSelect={handleDelete}>
              <Text style={styles.menuText}>Delete</Text>
            </MenuOption>
          </TouchableOpacity>
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    width: width * 0.9,
    height: height * 0.19,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    marginTop: 10,
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 15,
  },
  propertyinfocontainer: {
    top: 65,
    left: 70,
    width: width * 0.15,
    height: height * 0.06,
    backgroundColor: colors.boldtextcolor,
    flexDirection: 'column',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  propertyinfo: {
    // position: 'absolute',
    // bottom: 100,
    // right: 5,
    fontSize: 10,
    fontFamily: 'Lato-Regular',
    // fontWeight: 'bold',
    color: colors.white,
    // backgroundColor: colors.text,
    // padding: 5,
    // borderRadius: 8,
  },
  detailsContainer: {
    width: width * 1,
    height: height * 0.3,
    flex: 1,
    padding: 10,
  },
  propertyCategory: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.boldtextcolor,
  },
  propertyType: {
    fontSize: 12,
    color: colors.boldtextcolor,
  },
  listingType: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: 'bold',
  },
  priceContainer: {
    marginVertical: 10,
  },
  price: {
    fontSize: 14,
    color: colors.boldtextcolor,
  },
  featuresContainer: {
    marginTop: 10,
  },
  feature: {
    fontSize: 12,
    color: colors.boldtextcolor,
  },
  menuText: {
    padding: 10,
    fontSize: 16,
    color: colors.black,
  },
});

export default PropertyCardForAgent;
