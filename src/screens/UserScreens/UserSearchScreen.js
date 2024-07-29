import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserSearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text>User Search Screen</Text>
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

export default UserSearchScreen;
