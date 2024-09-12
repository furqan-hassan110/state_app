import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getPropertiesById, updateCategory } from '../../utils/apiUtils'; // Function to fetch property by ID
import colors from '../../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


const EditListingScreen = () => {
  const route = useRoute();
  const { id } = route.params; // Retrieve property ID from route params

  // const [propertyData, setPropertyData] = useState(null);
  const [propertyData, setPropertyData] = useState({
    title: '',
    constructionStatus: '',
    listingType: '',
    propertyCategory: '',
    propertyType: '',
    sellPrice: '',
    rentPrice: '',
    rentType: '',
    bedrooms: 1,
    bathroom_count: 1,
    carSpace: 1,
    totalRooms: '',
    images: [], // Assuming images are included
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperties= async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await getPropertiesById(id, token); // Fetch property details by ID
        setPropertyData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching property details: ", error);
      }
    };

    fetchProperties();
  }, [id]);
  const handleSave = async () => {
    console.log(id)
    const token = await AsyncStorage.getItem('token');
    console.log(token)
    updateCategory(id, propertyData,token).then(res=>{
      if(res.success){
        console.log("update")
      } else{
        console.log('error')
      }
    }).catch(err=>{
      console.log('err', err)
    }) // Update property details by ID
    //   console.log("Updated property data:", res);
    // } catch (error) {
    //   console.error("Error updating property:", error);
    // }
  };

  const handleIncrement = (field) => {
    setPropertyData({ ...propertyData, [field]: propertyData[field] + 1 });
  };

  const handleDecrement = (field) => {
    if (propertyData[field] > 1) {
      setPropertyData({ ...propertyData, [field]: propertyData[field] - 1 });
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Edit Listing</Text>
      </View>

      <View style={styles.imageContainer}>
        {/* <Image source={{ uri: propertyData.images ? require('../../../assets/images/role1.png') :require('../../../assets/images/role1.png') }} style={styles.image} /> */}
        <View style={styles.imageDetails}>
          <Text style={styles.propertyName}>{propertyData.title}</Text>
          {/* <Text style={styles.propertyLocation}>Newcastle, Australia</Text> */}
        </View>
      </View>

      {/* Listing Title */}
      <TextInput
        style={styles.input}
        value={propertyData?.title}
        onChangeText={(text) => setPropertyData({ ...propertyData, title: text })}
        placeholder="Listing Title"
      />

      {/* Listing Type */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, propertyData.listingType === 'Rent' && styles.activeButton]}
          onPress={() => setPropertyData({ ...propertyData, listingType: 'Rent' })}
        >
          <Text style={styles.toggleButtonText}>Rent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, propertyData.listingType === 'Sell' && styles.activeButton]}
          onPress={() => setPropertyData({ ...propertyData, listingType: 'Sell' })}
        >
          <Text style={styles.toggleButtonText}>Sell</Text>
        </TouchableOpacity>
      </View>

      {/* Property Category */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, propertyData.propertyCategory === 'House' && styles.activeButton]}
          onPress={() => setPropertyData({ ...propertyData, propertyCategory: 'House' })}
        >
          <Text style={styles.toggleButtonText}>House</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, propertyData.propertyCategory === 'Apartment' && styles.activeButton]}
          onPress={() => setPropertyData({ ...propertyData, propertyCategory: 'Apartment' })}
        >
          <Text style={styles.toggleButtonText}>Apartment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, propertyData.propertyCategory === 'Villa' && styles.activeButton]}
          onPress={() => setPropertyData({ ...propertyData, propertyCategory: 'Villa' })}
        >
          <Text style={styles.toggleButtonText}>Villa</Text>
        </TouchableOpacity>
      </View>

      {/* Listing Photos */}
      {/* <View style={styles.photoSection}>
        {propertyData.images.map((image, index) => (
          <View key={index} style={styles.photoContainer}>
            <Image source={{ uri: image }} style={styles.listingImage} />
            <TouchableOpacity style={styles.removePhoto}>
              <Text style={styles.removePhotoText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addPhoto}>
          <Text style={styles.addPhotoText}>+</Text>
        </TouchableOpacity>
      </View> */}

      {/* Sell Price */}
      <TextInput
        style={styles.input}
        value={propertyData.sellPrice}
        onChangeText={(text) => setPropertyData({ ...propertyData, sellPrice: text })}
        placeholder="Sell Price"
        keyboardType="numeric"
      />

      {/* Rent Price */}
      <TextInput
        style={styles.input}
        value={propertyData.rentPrice}
        onChangeText={(text) => setPropertyData({ ...propertyData, rentPrice: text })}
        placeholder="Rent Price"
        keyboardType="numeric"
      />

      {/* Rent Type */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, propertyData.rentType === 'Monthly' && styles.activeButton]}
          onPress={() => setPropertyData({ ...propertyData, rentType: 'Monthly' })}
        >
          <Text style={styles.toggleButtonText}>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, propertyData.rentType === 'Yearly' && styles.activeButton]}
          onPress={() => setPropertyData({ ...propertyData, rentType: 'Yearly' })}
        >
          <Text style={styles.toggleButtonText}>Yearly</Text>
        </TouchableOpacity>
      </View>

      {/* Bedrooms, Bathrooms, Car Space */}
      <View style={styles.counterContainer}>
        <Text>Bedrooms</Text>
        <View style={styles.counter}>
          <TouchableOpacity onPress={() => handleDecrement('bedrooms')}>
            <Text style={styles.counterButton}>-</Text>
          </TouchableOpacity>
          <Text>{propertyData.bedrooms}</Text>
          <TouchableOpacity onPress={() => handleIncrement('bedrooms')}>
            <Text style={styles.counterButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.counterContainer}>
        <Text>Bathrooms</Text>
        <View style={styles.counter}>
          <TouchableOpacity onPress={() => handleDecrement('bathrooms')}>
            <Text style={styles.counterButton}>-</Text>
          </TouchableOpacity>
          <Text>{propertyData.bathrooms}</Text>
          <TouchableOpacity onPress={() => handleIncrement('bathrooms')}>
            <Text style={styles.counterButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.counterContainer}>
        <Text>Car Space</Text>
        <View style={styles.counter}>
          <TouchableOpacity onPress={() => handleDecrement('carSpace')}>
            <Text style={styles.counterButton}>-</Text>
          </TouchableOpacity>
          <Text>{propertyData.carSpace}</Text>
          <TouchableOpacity onPress={() => handleIncrement('carSpace')}>
            <Text style={styles.counterButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Update Button */}
      <TouchableOpacity style={styles.updateButton} onPress={handleSave}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  imageDetails: {
    marginLeft: 10,
  },
  propertyName: {
    color:colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  propertyLocation: {
    fontSize: 14,
    color: '#888',
  },
  input: {
    color:colors.black,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  toggleButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '30%',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  toggleButtonText: {
    color: '#fff',
  },
  photoSection: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  photoContainer: {
    position: 'relative',
    marginRight: 10,
  },
  listingImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removePhoto: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 5,
  },
  removePhotoText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addPhoto: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  addPhotoText: {
    fontSize: 30,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    fontSize: 24,
    marginHorizontal: 10,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditListingScreen;
