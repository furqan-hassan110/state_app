import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import colors from '../../styles/colors';
import Button from '../../components/Button';

const { width, height } = Dimensions.get('window');

const AddListingStep2 = ({ route }) => {
  const navigation = useNavigation();
  const [images, setImages] = useState(route.params?.images || []);

  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 600,
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.assets) {
          const selectedImageUri = response.assets[0].uri;
          setImages([...images, selectedImageUri]);
        }
      }
    );
  };

  const handleNext = () => {
    navigation.navigate('AddListingScreen3', {
      ...route.params,
      images,
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
      <View style={{flexDirection:'row', marginTop:100}}>
      <Text style={styles.headerText}>Add </Text>
<Text style={styles.headerTextBold}>Photos</Text>
      <Text style={styles.headerText}> to Your Listing</Text>
      </View>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => setImages(images.filter((_, i) => i !== index))}
            >
              <Text style={styles.removeText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity onPress={pickImage} style={styles.addButton}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
      <Button
                  title="Next"
                  onPress={handleNext}
                  style={styles.button}
                />
      {/* <Button title="Next" onPress={handleNext} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 16,
    backgroundColor: colors.white,
  },
  backbutton: {
    backgroundColor: colors.textinputfill,
    width: width / 7,
    height: height / 15,
    borderRadius: 45,
    // marginLeft:100,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
  headerText: {
    fontSize: 25,
    fontFamily:'Lato-Medium',
    marginBottom: 16,
    // fontWeight: 'bold',
    color:colors.boldtextcolor
  },
  headerTextBold:{
    fontSize: 25,
    fontFamily:'Lato-Bold',
    marginBottom: 16,
    // fontWeight: 'bold',
    color:colors.boldtextcolor
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 16,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
  },
  removeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 24,
    color: '#ccc',
  },
  button: {
    width: width * 0.9,
    height: height * 0.075,
    // top: 60,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: colors.buttons,
    marginTop:'auto'
  },
});

export default AddListingStep2;
