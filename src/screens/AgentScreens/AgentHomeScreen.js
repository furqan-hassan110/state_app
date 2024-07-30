import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
// Contexts
import {useAuth} from '../../contexts/AuthContext';

const AgentHomeScreen = () => {
  const {logout} = useAuth();

  return (
    <View style={styles.container}>
      <Text>Agent Home Screen</Text>
      <Button title="Logout" onPress={logout} />
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

export default AgentHomeScreen;