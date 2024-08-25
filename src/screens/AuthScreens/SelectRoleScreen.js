/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Images
import img1 from '../../../assets/images/role1.png';
import img2 from '../../../assets/images/role2.png';
import img3 from '../../../assets/images/role3.png';
import img4 from '../../../assets/images/role4.png';
// Styles
import colors from '../../styles/colors';
// Contexts
import { useAuth } from '../../contexts/AuthContext';
// Components
import Button from '../../components/Button';

const { width, height } = Dimensions.get('window');
const SelectRoleScreen = () => {
  const { selectRole } = useAuth();
  const navigation = useNavigation();

  const handleRoleSelection = (selectedRole) => {
    selectRole(selectedRole);
    navigation.navigate('Register'); // Navigate to Register screen after selecting role
  };

  return (
    <View style={styles.maincontaier}>
      <View style={styles.imagecontainer}>
        <Image source={img1} style={styles.image} />
        <Image source={img2} style={styles.image} />
      </View>
      <View style={styles.imagecontainer}>
        <Image source={img3} style={styles.image} />
        <Image source={img4} style={styles.image} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.findtext}>Find</Text>
        <Text style={styles.findtextbold}> perfect choice </Text>
        <Text style={styles.findtext}>for</Text>
      </View>
      <Text style={styles.futuretext}>your future house</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.findtext}>Ready to</Text>
        <Text style={styles.findtextbold}> explore ?</Text>
      </View>
      <View
        style={{
          marginTop: 'auto',
          width: '100%',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <Button
            style={styles.button}
            onPress={() => handleRoleSelection('agent')}
            title="Agent"
            backgroundColor={colors.buttons}
            textColor="#fff"
            width={width * 0.30}
            height={height * 0.07}
            borderRadius={10}
            fontFamily="Lato-Bold"
          />
          <Button
            style={styles.button}
            onPress={() => handleRoleSelection('user')}
            title="User"
            backgroundColor={colors.buttons}
            textColor="#fff"
            width={width * 0.30}
            height={height * 0.07}
            borderRadius={10}
            fontFamily="Lato-Bold"
          />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 'auto' }}>
          <Text style={styles.alreadytext}>
            If you already have an account ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.sign}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  maincontaier: {
    padding: 10,
    flex: 1,
    backgroundColor: colors.white,
  },
  imagecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,

  },
  image: {
    width: width * 0.463,
    height: height * 0.23,
    borderRadius: 20,
    // marginTop: 10,
  },
  findtext: {
    fontSize: 22,
    color: colors.text,
    fontFamily: 'Lato-Medium',
  },
  findtextbold: {
    fontSize: 22,
    marginLeft: 10,
    color: colors.text,
    marginRight: 10,
    fontFamily: 'Lato-Black',
  },
  futuretext: {
    fontSize: 22,
    color: colors.text,
    fontFamily: 'Lato-Medium',
    marginTop: 15,
  },
  alreadytext: {
    color: colors.thintextcolo,
    fontFamily: 'Lato-Regular',
    fontSize: 12,
  },
  sign: {
    color: colors.text,
    fontFamily: 'Lato-Bold',
    fontSize: 12,
  },
});
export default SelectRoleScreen;
