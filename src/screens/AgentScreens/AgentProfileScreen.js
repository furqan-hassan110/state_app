import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import Button from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import profile from '../../../assets/images/profile.png';
import Feather from 'react-native-vector-icons/Feather';
import { useAuth } from '../../contexts/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const UserProfileScreen = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const navigation = useNavigation();
  const { userData, setUserData, logout } = useAuth();

  const handleSubscribe = () => {
    setIsSubscribed(true);
    setModalVisible(false);
    navigation.navigate('UserStack');
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleTextChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from useAuth
      // Ensure navigation resets to the RoleSelection screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'SelectRoleScreen' }], // Adjust to the correct screen name
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
      <View style={styles.profileContainer}>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: "space-between" }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbutton}>
            <Ionicons name="chevron-back" size={18} color="black" />
          </TouchableOpacity>
          <View style={{ alignSelf: 'center', marginRight: 140 }}>
            <Text style={styles.header}>
              Profile
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.profileImageContainer}>
            <Image source={profile} style={styles.profile} />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.username}>
            <Feather name='user' size={18} color={colors.black} style={{ padding: 10 }} />
            <TextInput
              style={styles.infoText}
              value={userData.name}
              editable={isEditing}
              onChangeText={(value) => handleTextChange('name', value)}
            />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.username}>
            <Feather name='phone' size={18} color={colors.black} style={{ padding: 10 }} />
            <TextInput
              style={styles.infoText}
              value={userData.phoneNo}
              editable={isEditing}
              onChangeText={(value) => handleTextChange('phoneNo', value)}
            />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.username}>
            <Feather name='mail' size={18} color={colors.black} style={{ padding: 10 }} />
            <TextInput
              style={styles.infoText}
              value={userData.email}
              editable={isEditing}
              onChangeText={(value) => handleTextChange('email', value)}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {/* <Button
          onPress={handleSubscribe}
          title="Subscribe"
          style={styles.subscribeButton}
        /> */}
        <View style={styles.buttonGroup}>
          <Button
            onPress={handleEditProfile}
            title="Edit Profile"
            style={styles.editProfileButton}
          />
          <Button
            title="Log Out"
            style={styles.button}
            onPress={handleLogout}
          />
        </View>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
  profileImageContainer: {
    backgroundColor: colors.textinputfill,
    width: width * 0.18,
    height: height * 0.09,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
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
    fontFamily: "Lato-Bold",
  },
  subscribeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    color: colors.boldtextcolor,
    paddingLeft: 10,
    fontFamily: 'Lato-Bold',
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editProfileButton: {
    width: width * 0.35,
    height: height * 0.07,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.buttons,
    borderRadius: 10,
    marginRight: 10,
  },
  profileContainer: {
    alignItems: 'center',
  },
  header: {
    color: colors.boldtextcolor,
    fontFamily: "Lato-Bold",
    fontSize: 20,
    alignSelf: 'center',
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
  profile: {
    width: width * 0.09,
    height: height * 0.049,
  },
  infoContainer: {
    padding: 10,
    marginTop: 10,
  },
  username: {
    backgroundColor: colors.textinputfill,
    width: width * 0.9,
    height: height * 0.09,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
    width: width * 0.35,
    height: height * 0.07,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.buttons,
    borderRadius: 10,
  },
  subscribeButton: {
    width: width * 0.72,
    height: height * 0.07,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.boldtextcolor,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: '10%',
    justifyContent: "space-evenly",
    alignContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginBottom:'auto',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 10,
    // margin:'auto'
  },
});

export default UserProfileScreen;
