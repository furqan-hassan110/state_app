import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FloatingAction } from 'react-native-floating-action';

const { width, height } = Dimensions.get('window');

const AgentSearchScreen = () => {
  const navigation = useNavigation();

  const handleAddListing = () => {
    navigation.navigate('AddListingScreen'); // Ensure this matches your actual route name
  };

  return (
    <View style={styles.container}>
      <Text>Agent Search Screen</Text>
      <FloatingAction
        color="#ff6347" // Customize the button color
        onPressMain={handleAddListing}
        floatingIcon={<Ionicons name="add" size={24} color="white" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AgentSearchScreen;
