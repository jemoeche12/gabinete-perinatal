import { StyleSheet, Text, View, FlatList } from 'react-native'; 
import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem'; 

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.value.itemCart);
  const total = useSelector((state) => state.cart.value.totalPrecioCarrito); 

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tu Carrito</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>El carrito está vacío.</Text>
      ) : (
        <FlatList
          data={cartItems} 
          keyExtractor={(item, index) => (item && item.id) ? item.id.toString() : index.toString()}
          renderItem={({ item }) => (
            <CartItem item={item} /> 
          )}
        />
      )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total}</Text>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8EDE3',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
  totalContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginRight: 30
  },
  
});