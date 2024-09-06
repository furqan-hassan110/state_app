import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useField } from 'formik';
import colors from '../styles/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const iconSets = {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  Entypo,
};
 const {width, height } = Dimensions.get('window')
const CustomTextInput = ({ icon, label, iconSet = 'MaterialIcons', secureTextEntry, ...props }) => {
  const [field, meta] = useField(props);
  const IconComponent = iconSets[iconSet];
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = secureTextEntry !== undefined;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {IconComponent && <IconComponent name={icon} size={24} style={styles.icon} />}
        <TextInput
          style={styles.input}
          secureTextEntry={isPasswordField && !isPasswordVisible}
          onChangeText={field.onChange(props.name)}
          onBlur={field.onBlur(props.name)}
          placeholderTextColor={colors.textinputplaceholdercolor}
          value={field.value}
          {...props} // Ensure any additional props are passed to the TextInput
        />
        {isPasswordField && (
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <MaterialIcons
              name={isPasswordVisible ? 'visibility' : 'visibility-off'}
              size={24}
              style={styles.passwordVisible}
            />
          </TouchableOpacity>
        )}
      </View>
      {meta.touched && meta.error ? (
        <Text style={styles.error}>{meta.error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    // backgroundColor:colors.black
  },
  // label: {
  //   marginBottom: 5,
  //   fontSize: 16,
  //   color: '#333',
  // },
  inputContainer: {
    width:width*0.94,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor:colors.textinputfill
  },
  input: {
    width:width*0.8,
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  
  },
  error: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
  icon: {
    marginRight: 10,
    color: colors.textinputplaceholdercolor,
  },
  passwordVisible: {
    color: colors.textinputplaceholdercolor,
  },
});

export default CustomTextInput;
