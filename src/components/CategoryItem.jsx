import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import Card from './Card';
import { useDispatch } from 'react-redux';
import { setCategorySelected } from '../features/recursos/InformacionSlice';

const CategoryItem = ({ category, navigation}) => {
  const dispatch = useDispatch();

  const handleNavigate = () =>{
    dispatch(setCategorySelected(category))
    navigation.navigate('ItemListCategory', {category})
  }


  return (
    <Card>
      <Pressable style={styles.productItem} onPress={handleNavigate}>
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
    backgroundColor: "#DEC3B2",
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
    color: "black",
    fontFamily:"Crafty"
  },
});
