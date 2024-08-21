import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useLoved } from '../../contexts/LovedContext';
import PropertyCard from '../../components/PropertyCard';
import colors from '../../styles/colors';

const { width, height } = Dimensions.get('window');

const UserLovedScreen = () => {
    const { lovedProperties } = useLoved();

    console.log('Loved Properties:', lovedProperties); // Debugging log

    if (!lovedProperties || lovedProperties.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyText}>You have no loved properties yet.</Text>
            </View>
        );
    }
    else{

    return (
        <View style={styles.container}>
            <FlatList
                data={lovedProperties}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <PropertyCard
                        id={item.id}
                        imageSource={item.imageSource}
                        areaName={item.areaName}
                        cityName={item.cityName}
                        country={item.country}
                        price={item.price}
                    />
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};
}

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
});

export default UserLovedScreen;
