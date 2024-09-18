import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useAuth } from '../../contexts/AuthContext';
import { getLovedProperties } from '../../utils/apiUtils';
import colors from '../../styles/colors';
import SearchResultCard from '../../components/SearchCards';

const { width, height } = Dimensions.get('window');

const UserLovedScreen = () => {
    const [lovedProperties, setLovedProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLovedProperties();
    }, []);

    const { userData } = useAuth();
    const userToken = userData?.token;

    const fetchLovedProperties = () => {
        getLovedProperties(userToken)
            .then((response) => {
                console.log('success loved properties get it ')
                setLovedProperties(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
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
            data={lovedProperties}
            keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
            numColumns={2}
            renderItem={({ item }) => (
                <SearchResultCard item={item} isLoved={true} />
            )}
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
    emptyText: {
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
        marginRight:60
      },
      filterIconContainer: {
        backgroundColor: colors.buttons,
        borderRadius: 10,
        padding: 8,
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
