import { StyleSheet, Text, Pressable } from 'react-native';
import Card from './Card';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setCategoryTestSelected } from '../features/test/TestSlice';

const TestComponent = ({ categoryTest, navigation, id }) => {
  const dispatch = useDispatch();

  const handleNavigation = () => {
    dispatch(setCategoryTestSelected(id));
    navigation.navigate('TestDetail', { id });
  };

  return (
    <Card>
      <Pressable style={styles.productItem} onPress={handleNavigation}>
        <Text style={styles.productText}>{categoryTest}</Text>
      </Pressable>
    </Card>
  );
};

export default TestComponent;

const styles = StyleSheet.create({
  productItem: {
    backgroundColor: '#DEC3B2',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
    alignItems: 'center',
  },
  productText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Crafty',
  },
});
