import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../navigationscreens/authcontext';

const AgentHome = () => {
  const { logout } = useAuth();

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

export default AgentHome;
