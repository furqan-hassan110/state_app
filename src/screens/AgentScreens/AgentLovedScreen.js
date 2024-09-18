import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLoved } from '../../contexts/LovedContext';
import colors from '../../styles/colors';
import { fetchAllUser } from '../../utils/apiUtils'; // Import fetchAllUser function
import { useAuth } from '../../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

const AgentLovedScreen = ({ navigation }) => {
    const { subscribedUsers, setSubscribedUsers } = useLoved();
    const [approvedUsers, setApprovedUsers] = useState([]);
    const { userData } = useAuth();
    const userToken = userData?.token;

    useEffect(() => {
        fetchUser();
    }, [userToken]); // Added userToken as a dependency

    const fetchUser = () => {
        if (!userToken) {
            console.error('User token is missing');
            return;
        }

        fetchAllUser(userToken)
            .then((response) => {
                console.log('success fetched all users');
                setSubscribedUsers(response.data);
            })
            .catch((err) => {
                console.log(err);
                Alert.alert("Error", "Failed to fetch users. Please try again later.");
            });
    };

    const handleApprove = (user) => {
        setApprovedUsers(prevApproved => [...prevApproved, user]);
    };

    const handleCancel = (user) => {
        setApprovedUsers(prevApproved => prevApproved.filter(u => u !== user));
    };

    const renderUserItem = ({ item }) => {
        const isApproved = approvedUsers.includes(item);

        return (
            <View style={styles.userCard}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userDetails}>Phone: {item.phoneNo}</Text>
                <Text style={styles.userDetails}>Email: {item.email}</Text>
                {!isApproved ? (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.approveButton}
                            onPress={() => handleApprove(item)}
                        >
                            <Text style={styles.approveButtonText}>Approve</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => handleCancel(item)}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
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
                    <Text style={styles.header}>Subscription List</Text>
                </View>
            </View>
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
    header: {
        color: colors.boldtextcolor,
        fontFamily: "Lato-Bold",
        fontSize: 20,
        marginLeft: 35,
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
        fontFamily: 'Lato-Bold',
        color: colors.boldtextcolor,
    },
    userDetails: {
        fontSize: 14,
        color: colors.black,
        fontFamily: "Lato-Regular",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    approveButton: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.buttons,
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 5,
    },
    approveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cancelButton: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ff4d4d',
        borderRadius: 8,
        alignItems: 'center',
        marginLeft: 5,
    },
    cancelButtonText: {
        color: 'white',
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
