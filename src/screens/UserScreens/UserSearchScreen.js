import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SearchCards from '../../components/SearchCards';
import { useRoute } from '@react-navigation/native';
import colors from '../../styles/colors'

const UserSearchScreen = () => {
  const route = useRoute();
  const { query } = route.params;
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Filter results based on the query
    // You can adjust this to match your search logic
    const results = propertydeatail.filter((item) =>
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.areaName.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  }, [query]);
  return (
    <View style={styles.container}>
    <FlatList
      data={searchResults}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <SearchResultCard item={item} />}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.listContainer}
    />
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
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default UserSearchScreen;
