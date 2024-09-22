import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Alert,
  ToastAndroid
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import Button from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import profile from '../../../assets/images/profile.png';
import Feather from 'react-native-vector-icons/Feather';
import { useAuth } from '../../contexts/AuthContext';
import {
  logout,
  requestSubscribtion,
  subscribeUser,
  updateProfile,
} from '../../utils/apiUtils'; // Import the updateProfile function

import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const UserProfileScreen = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null); // Initialize local userData
  const navigation = useNavigation();
  const { userData: contextUserData, handleSubscribe, contextLogout, updateUserContextData } = useAuth();

  const userToken = contextUserData?.token;
  const userId = contextUserData?.id;

  // Set subscription status and user data based on context
  useEffect(() => {
    if (contextUserData) {
      setIsSubscribed(contextUserData.is_subscribed === 1);
      setUserData(contextUserData); // Set local userData
    }
  }, [contextUserData]);

  const handleLogout = () => {
    if (userToken) {
      logout(userToken)
        .then(async () => {
          await contextLogout();
        })
        .catch(error => {
          console.error('Logout failed:', error);
        });
    } else {
      console.error('No token found in userData');
    }
  };

  const handleUserSubscribe = () => {
    if (userToken) {
      requestSubscribtion(userToken)
        .then(async () => {
          await handleSubscribe();
          // setIsSubscribed(true);
          Alert.alert(
            'Success',
            'Your application has been submitted. Please wait for your approval.',
          );
        })
        .catch(error => {
          console.error('Subscription failed:', error);
          Alert.alert('Error', 'Failed to subscribe. Please try again later.');
        });
    } else {
      Alert.alert('Error', 'No user token found for subscription.');
    }
  };

  const handleEditProfile = () => {
    if (isEditing) {
      if (userData) {
        const { name, email, phone_no } = userData;

        console.log('Updating Profile with:', { name, email, phone_no });

        updateProfile(userToken, { name, email, phone_no })
          .then(async () => {
            ToastAndroid.show('Profile updated successfully', ToastAndroid.SHORT);

            // Update the AuthContext with the new data
            updateUserContextData({
              name,
              email,
              phone_no,
            });

            await AsyncStorage.setItem(
              'userData',
              JSON.stringify({ ...userData, name, email, phone_no })
            );
          })
          .catch(error => {
            console.error('Profile update failed:', error);
            ToastAndroid.show('Failed to update profile', ToastAndroid.SHORT);
          });
      }
    }
    setIsEditing(!isEditing);
  };

  const handleTextChange = (field, value) => {
    setUserData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backbutton}>
              <Ionicons name="chevron-back" size={18} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>Profile</Text>
          </View>
          <View style={styles.profileImageContainer}>
            <Image source={profile} style={styles.profile} />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.username}>
              <Feather
                name="user"
                size={18}
                color={colors.black}
                style={{ padding: 10 }}
              />
              <TextInput
                style={styles.infoText}
                value={userData.name}
                editable={isEditing}
                onChangeText={value => handleTextChange('name', value)}
              />
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.username}>
              <Feather
                name="phone"
                size={18}
                color={colors.black}
                style={{ padding: 10 }}
              />
              <TextInput
                style={styles.infoText}
                value={userData.phone_no}
                editable={isEditing}
                onChangeText={value => handleTextChange('phone_no', value)} // Ensure correct field name
              />
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.username}>
              <Feather
                name="mail"
                size={18}
                color={colors.black}
                style={{ padding: 10 }}
              />
              <TextInput
                style={styles.infoText}
                value={userData.email}
                editable={false} // Email should always be non-editable
              />

            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {!isSubscribed && (
            <Button
              onPress={handleUserSubscribe}
              title="Subscribe"
              style={styles.subscribeButton}
            />
          )}
          <View style={styles.buttonGroup}>
            <Button
              onPress={handleEditProfile}
              title={isEditing ? 'Save Changes' : 'Edit Profile'}
              style={styles.editProfileButton}
            />
            <Button
              title="Log Out"
              style={styles.editProfileButton}
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
    alignSelf: 'center'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  header: {
    color: colors.boldtextcolor,
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    alignSelf: 'center',
    marginRight: 140
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
  infoText: {
    fontSize: 16,
    color: colors.boldtextcolor,
    paddingLeft: 10,
    fontFamily: 'Lato-Bold',
    flex: 1,
  },
  buttonContainer: {
    marginTop: '10%',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 10,
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
});

export default UserProfileScreen;
