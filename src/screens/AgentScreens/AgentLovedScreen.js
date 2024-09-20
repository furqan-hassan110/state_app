import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLoved } from '../../contexts/LovedContext';
import colors from '../../styles/colors';
import { fetchAllUser } from '../../utils/apiUtils';
import { useAuth } from '../../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

const AgentLovedScreen = ({ navigation }) => {
    const { setSubscribedUsers } = useLoved();
    const [approvedUsers, setApprovedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userData } = useAuth();
    const userToken = userData?.token;

    const [allUsers, setAllUsers] = useState([]);
    const [filter, setFilter] = useState('requested');
    const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

    useEffect(() => {
        fetchUser();
    }, [userToken]);

    const fetchUser = () => {
        if (!userToken) {
            console.error('User token is missing');
            setLoading(false);
            return;
        }

        fetchAllUser(userToken)
            .then((response) => {
                console.log('Success fetched all users', response.data);
                setAllUsers(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                Alert.alert("Error", "Failed to fetch users. Please try again later.");
                setLoading(false);
            });
    };

    // Function to refresh the list
    const onRefresh = () => {
        setRefreshing(true);
        fetchUser(); // Fetch the users again
        setRefreshing(false); // Reset refreshing state after fetch
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const handleApprove = (user) => {
        const updatedUsers = allUsers.map(u =>
            u.id === user.id ? { ...u, subscriptionStauts: 'approved' } : u
        );
        setAllUsers(updatedUsers);
    };

    const handleCancel = (user) => {
        const updatedUsers = allUsers.map(u =>
            u.id === user.id ? { ...u, subscriptionStauts: 'rejected' } : u
        );
        setAllUsers(updatedUsers);
    };

    const renderUserItem = ({ item }) => {
        return (
            <View style={styles.userCard}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userDetails}>Phone: {item.phoneNo}</Text>
                <Text style={styles.userDetails}>Email: {item.email}</Text>

                {item.subscriptionStauts === 'requested' ? (
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
                            <Text style={styles.cancelButtonText}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                ) : item.subscriptionStauts === 'approved' ? (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => handleCancel(item)}
                        >
                            <Text style={styles.cancelButtonText}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.approveButton}
                            onPress={() => handleApprove(item)}
                        >
                            <Text style={styles.approveButtonText}>Approve</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };

    const filteredUsers = allUsers.filter(user => user.subscriptionStauts === filter);

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

            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'requested' && styles.activeFilter]}
                    onPress={() => setFilter('requested')}
                >
                    <Text style={[styles.filterText, filter === "requested" && styles.activefiltertext]}>Requested</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'approved' && styles.activeFilter]}
                    onPress={() => setFilter('approved')}
                >
                    <Text style={[styles.filterText, filter === "approved" && styles.activefiltertext]}>Approved</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'rejected' && styles.activeFilter]}
                    onPress={() => setFilter('rejected')}
                >
                    <Text style={[styles.filterText, filter === "rejected" && styles.activefiltertext]}>Canceled</Text>
                </TouchableOpacity>
            </View>

            {filteredUsers.length > 0 ? (
                <FlatList
                    data={filteredUsers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderUserItem}
                    contentContainerStyle={styles.listContainer}
                    refreshing={refreshing} // Add refreshing state
                    onRefresh={onRefresh} // Add onRefresh function
                />
            ) : (
                <Text style={styles.noSubscribers}>No users found.</Text>
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
    filterContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    filterButton: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: colors.textinputfill,
        flex: 1,
        alignItems: 'center',
    },
    activeFilter: {
        backgroundColor: colors.boldtextcolor,
    },
    filterText: {
        color: colors.black,
        fontFamily: 'Lato-Regular',
    },
    activefiltertext: {
        color: colors.white,
        fontFamily: 'Lato-Regular',
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
    canceledText: {
        marginTop: 10,
        color: '#ff4d4d',
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
