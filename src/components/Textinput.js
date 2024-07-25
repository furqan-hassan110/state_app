import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useField } from 'formik';
import colors from '../styles/colors';

const Textinput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        onChangeText={field.onChange(props.name)}
        onBlur={field.onBlur(props.name)}
        placeholderTextColor={colors.textinputplaceholdercolor}
        value={field.value}
        {...props}
      />
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
    color: '#333',
  },
  input: {
    borderWidth: 1,
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
});

export default Textinput;
