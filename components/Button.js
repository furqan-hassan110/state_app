// src/components/CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Button = ({
  title,
  onPress,
  backgroundColor = '#3498db',
  textColor = '#fff',
  fontSize = 16,
  paddingVertical = 10,
  paddingHorizontal = 20,
  borderRadius,
  isLoading = false,
  fontFamily='system',
  style,
  textStyle,
  width,
  height
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, paddingVertical, paddingHorizontal, borderRadius , width, height},
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor, fontSize, fontFamily }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default Button;
