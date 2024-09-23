import React from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import colors from '../styles/colors';
import {DOMAIN} from '../utils/apiUtils';

const {width, height} = Dimensions.get('window');

const defaultImages = [
  require('../../assets/images/role1.png'),
  require('../../assets/images/role2.png'),
  require('../../assets/images/role3.png'),
];

const ImageSlider = ({route}) => {
  const {images} = route.params;
  console.log('DETAILE IMAGS --> ', images);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={
          {
            // flexDirection: 'row', top: 30,
            // left: 20,
            // zIndex: 10, justifyContent: 'space-between', width: '100%', position: 'absolute', alignItems: 'center', alignContent: 'center'
          }
        }></View>
      <View style={styles.overlay} />
      <TouchableOpacity
        style={styles.backbutton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={20} color={colors.black} />
      </TouchableOpacity>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        {images.length > 0
          ? images.map((image, index) => {
              const url = `${DOMAIN}${image.imagePath}`;
              console.log('URL ==> ', url);
              return (
                <View key={index} style={styles.imageContainer}>
                  <Image
                    source={{uri: url}}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
              );
            })
          : defaultImages.map((image, index) => {
              return (
                <View key={index} style={styles.imageContainer}>
                  <Image
                    source={image}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
              );
            })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
  },
  scrollView: {
    width: '100%',
  },
  imageContainer: {
    width: width,
    height: 'auto', // Allows height to adjust based on the image's aspect ratio
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1, // Adjust this value or use a specific height instead of 'undefined' if needed
  },
  backbutton: {
    width: width * 0.13,
    height: height * 0.06,
    backgroundColor: colors.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
  },
});

export default ImageSlider;
