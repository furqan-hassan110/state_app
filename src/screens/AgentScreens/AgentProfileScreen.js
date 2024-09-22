import React, { useState } from 'react';
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
  ToastAndroid
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import Button from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import profile from '../../../assets/images/profile.png';
import Feather from 'react-native-vector-icons/Feather';
import { useAuth } from '../../contexts/AuthContext';
import { logout, updateProfile } from '../../utils/apiUtils'; // Import updateProfile and logout functions
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const AgentProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();
  const { userData, setUserData, contextLogout, updateUserContextData } = useAuth();

  const userToken = userData?.token;

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

  const handleEditProfile = () => {
    if (isEditing) {
      if (userData) {
        const { name, email, phone_no } = userData;

        // Call the updateProfile API
        updateProfile(userToken, { name, email, phone_no })
          .then(async () => {
            ToastAndroid.show('Profile updated successfully', ToastAndroid.SHORT);

            // Update the AuthContext with the new data
            updateUserContextData({ name, email, phone_no });

            // Update AsyncStorage
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
    setUserData({
      ...userData,
      [field]: value,
    });
  };

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
              <Feather name="user" size={18} color={colors.black} style={styles.icon} />
              <TextInput
                style={styles.infoText}
                value={userData.name}
                editable={isEditing}
                onChangeText={value => handleTextChange('name', value)}
              />
            </View>
            <View style={styles.username}>
              <Feather name="phone" size={18} color={colors.black} style={styles.icon} />
              <TextInput
                style={styles.infoText}
                value={userData.phone_no}
                editable={isEditing}
                onChangeText={value => handleTextChange('phone_no', value)}
              />
            </View>
            <View style={styles.username}>
              <Feather name="mail" size={18} color={colors.black} style={styles.icon} />
              <TextInput
      style={styles.infoText}
      value={userData.email}
      editable={false} // Email field is always non-editable
    />
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
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
    padding: 15,
  },
  profileContainer: {
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 20,
  },
  header: {
    color: colors.boldtextcolor,
    fontFamily: 'Lato-Bold',
    fontSize: 22,
    textAlign: 'center',
    alignSelf: 'center',
    marginRight: 130,
  },
  backbutton: {
    backgroundColor: colors.textinputfill,
    width: width / 6,
    height: height / 13,
    borderRadius: 45,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageContainer: {
    backgroundColor: colors.textinputfill,
    width: width * 0.18,
    height: height * 0.09,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  profile: {
    width: width * 0.09,
    height: height * 0.049,
  },
  infoContainer: {
    width: '100%',
    padding: 10,
  },
  username: {
    backgroundColor: colors.textinputfill,
    width: '100%',
    height: height * 0.08,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  infoText: {
    fontSize: 16,
    color: colors.boldtextcolor,
    paddingLeft: 10,
    fontFamily: 'Lato-Bold',
    flex: 1,
  },
  icon: {
    padding: 10,
  },
  buttonContainer: {
    marginTop: '5%',
    alignItems: 'center',
  },
  editProfileButton: {
    width: width * 0.7,
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.buttons,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    width: width * 0.7,
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.buttons,
    borderRadius: 10,
  },
});

export default AgentProfileScreen;
