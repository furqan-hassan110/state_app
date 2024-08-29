import React, {useState} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useLoved } from '../../contexts/LovedContext'; // Import the useLoved hook
import colors from '../../styles/colors';

const { width, height } = Dimensions.get('window');

const AgentLovedScreen = () => {
  const { subscribedUsers } = useLoved(); // Access subscribed users from the context
  const [approvedUsers, setApprovedUsers] = useState([]);


  const handleApprove = (user) => {
    setApprovedUsers((prevApproved) => [...prevApproved, user]);
    // Optionally, you can also remove the user from subscribedUsers or perform other actions
  };

  // Render function for each subscribed user
  const renderUserItem = ({ item }) =>{
    const isApproved = approvedUsers.includes(item);
  
  return (  
    <View style={styles.userCard}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userDetails}>Phone: {item.phoneNo}</Text>
      <Text style={styles.userDetails}>Email: {item.email}</Text>
      {!isApproved ? (
          <TouchableOpacity
            style={styles.approveButton}
            onPress={() => handleApprove(item)}
          >
            <Text style={styles.approveButtonText}>Approve</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.approvedText}>Approved</Text>
        )}
    </View>
  );
};

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: "space-between" }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbutton}>
            <Ionicons name="chevron-back" size={18} color="black" />
          </TouchableOpacity>
          <View style={{ alignSelf: 'center', marginRight: 140 }}>
            <Text style={styles.header}>
              Subscription List
            </Text>
          </View>
        </View>
      {/* <Text style={styles.header}>Subscribed Users</Text> */}
      {subscribedUsers.length > 0 ? (
        <FlatList
          data={subscribedUsers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderUserItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noSubscribers}>No subscribers yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  // header: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  //   textAlign: 'center',
  // },
  header: {
    color: colors.boldtextcolor,
    fontFamily: "Lato-Bold",
    fontSize: 20,
    // alignSelf: 'center',
    marginLeft:35
  },
  listContainer: {
    paddingBottom: 20,
  },
  userCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    elevation: 1,
  },
  backbutton: {
    backgroundColor: colors.textinputfill,
    width: width / 7,
    height: height / 15,
    borderRadius: 45,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontFamily:'Lato-Bold',
    color:colors.boldtextcolor
    // fontWeight: 'bold',
  },
  userDetails: {
    fontSize: 14,
    // color: '#666',
    color:colors.black,
    fontFamily:"Lato-Regular"
  },
  approveButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: colors.buttons,
    borderRadius: 8,
    alignItems: 'center',
  },
  approveButtonText: {
    color: colors.buttons,
    fontWeight: 'bold',
  },
  approvedText: {
    marginTop: 10,
    color: colors.buttons,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noSubscribers: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AgentLovedScreen;
