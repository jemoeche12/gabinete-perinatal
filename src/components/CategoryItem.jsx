import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Card from './Card';

const CategoryItem = ({ category, navigation}) => {
  return (
    <Card>
      <Pressable style={styles.productItem} onPress={() => navigation.navigate('ItemListCategory', {category})}>
        <Text style={styles.productText}>{category}</Text>
      </Pressable>
    </Card>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8EDE3",
    padding: 10,
  },
  searchContainer: {
    marginBottom: 15,
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 18,
    color: "#B78270",
    marginTop: 20,
    fontWeight: "bold",
  },
  list: {
    flexGrow: 1,
  },
  productItem: {
    backgroundColor: "#E3CAA5",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
    alignItems: "center",
  },
  productText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#B78270",
    fontFamily: "Roboto",
  },
});
