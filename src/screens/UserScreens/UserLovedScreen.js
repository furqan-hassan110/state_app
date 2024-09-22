import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../contexts/AuthContext';
import { getLovedProperties, removeLovedProperty } from '../../utils/apiUtils'; // Import remove function
import colors from '../../styles/colors';
import SearchCards from '../../components/SearchCards';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const UserLovedScreen = () => {
    const [lovedProperties, setLovedProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    const { userData } = useAuth();
    const userToken = userData?.token;

    useEffect(() => {
        fetchLovedProperties();
    }, []);

    const fetchLovedProperties = () => {
        setLoading(true);
        getLovedProperties(userToken)
            .then((response) => {
                setLovedProperties(response.data);
                setLoading(false);
                setRefreshing(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setRefreshing(false);
            });
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchLovedProperties();
    };

    const handlePropertyClick = (property) => {
        navigation.navigate('UserStack', { screen: 'PropertyDetail', params: { property } });
    };

    const handleRemoveLovedProperty = (propertyId) => {
        removeLovedProperty(userToken, propertyId) // Add your API call to remove loved property
            .then(() => {
                setLovedProperties(prev => prev.filter(property => property.id !== propertyId));
            })
            .catch(err => console.log(err));
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backbutton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Loved Properties</Text>
            </View>

            {lovedProperties.length > 0 ? (
                <FlatList
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    data={lovedProperties}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handlePropertyClick(item)}>
                            <SearchCards
                                id={item.id}
                                images={item.images }
                                title={item.title}
                                location={item.location}
                                price={item.sellingPrice}
                                isLovedScreen={true}  // Indicate that this is the loved screen
                            />
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <Text style={styles.noResultsText}>No loved properties found</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 10,
    },
    listContainer: {
        paddingVertical: 10,
    },
    noResultsText: {
        textAlign: 'center',
        color: colors.boldtextcolor,
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
        marginRight: 60,
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
});

export default UserLovedScreen;
