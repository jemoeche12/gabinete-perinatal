import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import Card from './Card';


const CardTalleres = ({ taller, navigation }) => {

  if (!taller) return null; 

  const handlePress = () => {
    navigation.navigate('DetailTalleres', { tallerId: taller.id });
  };
  

    

  return (
    <Card style={styles.container}>
      <Pressable onPress={handlePress} style={styles.productItem}>
        <Text style={styles.title}>{taller.titulo}</Text>
        <Text style={styles.productText}>{taller.descripcion}</Text>
      </Pressable>
    </Card>
  );
};

export default CardTalleres;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  productItem: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});
