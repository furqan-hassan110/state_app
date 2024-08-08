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
              title="subscribe"
              style={styles.button}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.profileContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbutton}>
            <Ionicons name="chevron-back" size={18} color="black" />
          </TouchableOpacity>
          <Text style={styles.header}>
            Profile
          </Text>

        </View>
        <View>
          <View style={{ backgroundColor: colors.textinputfill, width: width * 0.18, height: height * 0.09, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginTop:30 }}>
            <Image source={profile} style={styles.profile}></Image>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style=
          {styles.username}>
              <Feather name='user' size={18} color={colors.black} style={{marginTop:20, left:10}}/>
          </View>
          
        </View>
        <View style={styles.infoContainer}>
          <View style=
          {styles.username}>
              <Feather name='user' size={18} color={colors.black} style={{marginTop:20, left:10}}/>
          </View>
          
        </View>
        <View style={styles.infoContainer}>
          <View style=
          {styles.username}>
              <Feather name='user' size={18} color={colors.black} style={{marginTop:20, left:10}}/>
          </View>
          
        </View>
        <View style={{flexDirection:'row'}}>
        <Button
              onPress={handleSubscribe}
              title="Edit Profile"
              
              style={styles.Editprofilebutton}
            />
            <Button
              onPress={handleSubscribe}
              title="Log Out"
              style={styles.button}
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
    color:colors.buttons,

  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  header: {
    color: colors.boldtextcolor,
    fontFamily: "Lato-Bold",
    fontSize: 20,
    right: 20
  },
  backbutton: {
    backgroundColor: colors.textinputfill,
    width: width / 7,
    height: height / 15,
    borderRadius: 45,
    right: 100,
    bottom: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profile: {
    width: width * 0.1,
    height: height * 0.06,
  },
 
  infoContainer: {
    // flexDirection: 'row',
    // marginTop: 50,
    padding:10
  },
  username:{
    // top:20,
    backgroundColor:colors.textinputfill,
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
