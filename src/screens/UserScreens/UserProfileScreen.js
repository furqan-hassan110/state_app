import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import colors from '../../styles/colors';
import Button from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import profile from '../../../assets/images/profile.png';
import Feather from 'react-native-vector-icons/Feather';


const { width, height } = Dimensions.get('window');
const UserProfileScreen = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  const navigation = useNavigation();

  const handleSubscribe = () => {
    setIsSubscribed(true);
    setModalVisible(false);
    navigation.navigate('UserStack');
  };


  return (
    <View style={styles.container}>
      
      <View style={styles.profileContainer}>
        <View style={{ width:'100%',flexDirection: 'row', justifyContent:"space-between" }}>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbutton}>
            <Ionicons name="chevron-back" size={18} color="black" />
          </TouchableOpacity>
          <View style={{alignSelf:'center', marginRight:140}}>
          <Text style={styles.header}>
            Profile
          </Text>
          </View>

        </View>
        <View>
          <View style={{ backgroundColor: colors.textinputfill, width: width * 0.18, height: height * 0.09, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginTop:30 }}>
            <Image source={profile} style={styles.profile}></Image>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style=
          {styles.username}>
              <Feather name='user' size={18} color={colors.black} style={{marginTop:20,}}/>
          </View>
          
        </View>
        <View style={styles.infoContainer}>
          <View style=
          {styles.username}>
              <Feather name='user' size={18} color={colors.black} style={{marginTop:20}}/>
          </View>
          
        </View>
        <View style={styles.infoContainer}>
          <View style=
          {styles.username}>
              <Feather name='user' size={18} color={colors.black} style={{marginTop:20}}/>
          </View>
          
        </View>
        </View>
       <View style={{marginTop:'auto', justifyContent:"space-evenly",alignContent:'center', width:'100%', alignItems:'center',}}>
        <Button
              onPress={handleSubscribe}
              title="Subscribe"
              
              style={styles.Subscribebutton}
            />
             <View style={{flexDirection:'row', marginTop:10,}}>
        <Button
              // onPress={handleSubscribe}
              title="Edit Profile"
              
              style={styles.Editprofilebutton}
            />
            <Button
              // onPress={handleSubscribe}
              title="Log Out"
              style={styles.button}
              // onPress={navigation.navigate('logout')}
            />

          </View>
          </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding:10
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
  Editprofilebutton:{
    width: width * 0.35,
    height: height * 0.07,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.buttons,
    borderRadius: 10,
    marginRight:10

  },
  profileContainer: {
    alignItems: 'center',
    // marginVertical: 20,
  },
  header: {
    color: colors.boldtextcolor,
    fontFamily: "Lato-Bold",
    fontSize: 20,
    alignSelf:'center'
  },
  backbutton: {
    backgroundColor: colors.textinputfill,
    width: width / 7,
    height: height / 15,
    borderRadius: 45,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profile: {
    width: width * 0.09,
    height: height * 0.049,
  },
 
  infoContainer: {
    padding:10,
    marginTop:10
  },
  username:{
    backgroundColor:colors.textinputfill,
    paddingLeft:10,
    width:width*0.8,
    height:height*0.08,
    borderRadius:15,
    
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
  Subscribebutton:{
    width: width * 0.72,
    height: height * 0.07,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.boldtextcolor,
    borderRadius: 10,
  }
});

export default UserProfileScreen;
