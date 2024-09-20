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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import Button from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import profile from '../../../assets/images/profile.png';
import Feather from 'react-native-vector-icons/Feather';
import { useAuth } from '../../contexts/AuthContext';
import { logout, subscribeUser } from '../../utils/apiUtils';

const { width, height } = Dimensions.get('window');

const UserProfileScreen = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();
  const { userData, handleSubscribe, contextLogout } = useAuth();

  const userToken = userData?.token;
  const userId = userData?.id;

  // Set subscription status based on userData
  useEffect(() => {
    if (userData?.is_subscribed) {
      setIsSubscribed(userData.is_subscribed === 1);
    }
  }, [userData]);

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
      subscribeUser(userId, userToken)
        .then(async () => {
          await handleSubscribe(); // Call handleSubscribe from AuthContext
          setIsSubscribed(true);
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
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbutton}>
              <Ionicons name="chevron-back" size={18} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>Profile</Text>
          </View>
          <View style={styles.profileImageContainer}>
            <Image source={profile} style={styles.profile} />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.username}>
              <Feather name="user" size={18} color={colors.black} style={{ padding: 10 }} />
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
              <Feather name="phone" size={18} color={colors.black} style={{ padding: 10 }} />
              <TextInput
                style={styles.infoText}
                value={userData.phone_no}
                editable={isEditing}
                onChangeText={value => handleTextChange('phoneNo', value)}
              />
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.username}>
              <Feather name="mail" size={18} color={colors.black} style={{ padding: 10 }} />
              <TextInput
                style={styles.infoText}
                value={userData.email}
                editable={isEditing}
                onChangeText={value => handleTextChange('email', value)}
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
