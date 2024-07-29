import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
  Ionicons
};

const Textinput = ({ icon, label, iconSet = 'MaterialIcons', secureTextEntry, ...props }) => {
  const [field, meta] = useField(props);
  const IconComponent = iconSets[iconSet];
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = secureTextEntry !== undefined;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        secureTextEntry={isPasswordField && !isPasswordVisible}
        onChangeText={field.onChange(props.name)}
        onBlur={field.onBlur(props.name)}
        placeholderTextColor={colors.textinputplaceholdercolor}
        value={field.value}
        {...props}
      />
      {IconComponent && <IconComponent name={icon} size={24} style={styles.icon} />}
      {isPasswordField && (
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={{
          padding: 5, position: 'absolute',
          zIndex: 1,
        }}>
          <IconComponent
            name={isPasswordVisible ? 'visibility' : 'visibility-off'}
            size={24}
            style={styles.passwordvisible}
          />
        </TouchableOpacity>
      )}
      {meta.touched && meta.error ? (
        <Text style={styles.error}>{meta.error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    // color: '#333',
  },
  input: {
    borderWidth: 1,
    flex: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  error: {
    marginTop: 5,
    fontSize: 14,
    color: 'red',
  },
  icon: {
    color: colors.black,
    bottom: 40,
    left: 20,
    color: colors.textinputplaceholdercolor
  },
  passwordvisible: {
    color: colors.black,
    // alignItems:'flex-end',
    // justifyContent:'flex-end',
    // alignContent:'flex-end',
    left: 300,
    // bottom:65,
    color: colors.textinputplaceholdercolor,
    // position:'absolute'
    // display:'flex'
  }
});

export default Textinput;
