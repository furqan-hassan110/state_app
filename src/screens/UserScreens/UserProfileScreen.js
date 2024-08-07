import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import colors from '../../styles/colors';
import Button from '../../components/Button';

import UserBottomTabs from '../../navigations/BottomTabsUser';
import Icon from '@react-native-vector-icons/material-icons';

const { width, height } = Dimensions.get('window');
const UserProfileScreen = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  const navigation = useNavigation();

  const handleSubscribe = () => {
    setIsSubscribed(true);
    setModalVisible(false);
    navigation.navigate('UserStack'); // Replace 'Home' with the actual name of your home screen
  };


  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Handle back button press if needed
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Subscribe to continue</Text>
            <Button
              onPress={handleSubscribe}
              title="Sign In"
              // onPress={handleSubmit}
              style={styles.button}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.profileContainer}>
        <View>
          <Text style={styles.header}>
            Profile
          </Text>
          <Icon>
            
          </Icon>
        </View>
        <View>
          <Image>

          </Image>
        </View>
        <View>

        </View>
      </View>
      {/* <View style={styles.infoContainer}>
          <Text style={styles.label}>Username:</Text> */}
      {/* <Text style={styles.value}>{user.username}</Text> */}
      {/* </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Phone Number:</Text> */}
      {/* <Text style={styles.value}>{user.phoneNumber}</Text> */}
      {/* </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text> */}
      {/* <Text style={styles.value}>{user.email}</Text> */}
      {/* </View>
      </View>
      <TouchableOpacity  style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={[styles.button, { backgroundColor: colors.logout }]}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
     */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: colors.boldtextcolor,
    marginBottom: 16,
    fontSize: 15,
    fontFamily: "Lato-Bold"
  },
  subscribeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  header: {
    color: colors.boldtextcolor,
    fontFamily: "Lato-Bold",
    fontSize: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    width: width * 0.4,
  },
  value: {
    fontSize: 18,
    color: colors.text,
  },
  button: {
    width: width * 0.6,
    height: height * 0.07,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.buttons,
    borderRadius: 10,
    // marginTop: 20,
  },

});

export default UserProfileScreen;
