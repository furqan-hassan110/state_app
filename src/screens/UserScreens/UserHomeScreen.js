import React from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions } from 'react-native';

import logo from '../../../assets/images/logo.png'
import profile from '../../../assets/images/profile.png'
// Contexts
import { useAuth } from '../../contexts/AuthContext';
import colors from '../../styles/colors';

const { width, height } = Dimensions.get('window');

const UserHomeScreen = () => {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.logoprofilecontainer}>
        <Image source={logo} style={styles.logo}></Image>
        <View style={styles.profilecontainer}>
          <Image source={profile} style={styles.profile}></Image>
        </View>
      </View>
      <View style={styles.namecontainer}>
        <Text style={styles.text}>
          Hey
        </Text>
        <Text style={styles.nametext}>
          Cynthia!
        </Text>
      </View>
      <Text style={styles.text}>
      Let's start exploring  
      </Text>
      {/* <Button title="Logout" onPress={logout} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  logoprofilecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    // alignItems:'stretch',
  },
  logo: {
    width: width * 0.2,
    height: height * 0.1,
    right:15
  },
  profile: {
    width: width * 0.08,
    height: height * 0.04,
  },
  profilecontainer: {
    width: width * 0.15,
    height: height * 0.07,
    backgroundColor: colors.textinputfill,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    left:10
  },
  namecontainer: {
    flexDirection: 'row'
  },
  text: {
    color: colors.primary,
    fontSize: 25,
    fontFamily: 'Lato-Medium'
  },
  nametext: {
    color: colors.boldtextcolor,
    fontSize: 25,
    fontFamily: 'Lato-Black',
    left: 10,

  }
});

export default UserHomeScreen;
