import React from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../styles/colors'; 
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');

const SearchBar = ({ placeholder, onChangeText, value }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
      <View>
      <TouchableOpacity style={styles.filterIconcon} onPress={() => navigation.navigate('UserFilter')}>
        <MaterialCommunityIcons name="tune-vertical-variant" size={20} color="white" style={styles.filterIcon} />
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.textinputfill,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: width * 0.93,
    height: height * 0.07,
    alignSelf: 'center',
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  filterIconcon:{
    backgroundColor:colors.buttons,
    width:width*0.11,
    height:height*0.05,
    borderRadius:10,
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    
  },
  filterIcon: {
    marginLeft: 10,
    alignSelf:'center',
    marginRight:10
  },
});

export default SearchBar;
