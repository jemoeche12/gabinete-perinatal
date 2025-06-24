import { StyleSheet, Text, View, Pressable, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { useGetTallerByIdQuery } from '../services/talleresService';
import iconImageLoading from '../../assets/IconApp7.png';
import CustomHeader from '../components/CustomHeader';
import MenuDesplegable from '../components/MenuDesplegable';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../features/cart/CartSlice';

const DetailTalleres = ({ route, navigation, visible }) => {
  const { tallerId } = route.params;
  const { data: taller, isLoading, error } = useGetTallerByIdQuery(tallerId);
  const [isMenuVisible, setIsMenuVisible] = useState(visible);
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.value.itemCart);
  const isCartEmpty = cartItems.length === 0;

  const handleAddItem = () => {
      dispatch(addCartItem({...taller}));
  };

  const handleViewCart = () => {
    navigation.navigate('Cart');
  };

  if (isLoading) return (
    <View style={styles.containImageLoading}>
      <Image source={iconImageLoading} style={styles.iconImageLoading} />
    </View>
  );
  if (error) return <Text>Error: {error.message}</Text>;
  if (!taller) return <Text>No se encontró el taller.</Text>;

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <CustomHeader onMenuPress={toggleMenu} />
      {isMenuVisible && <MenuDesplegable onClose={toggleMenu} visible={isMenuVisible} />}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{taller.titulo}</Text>
        <Text style={styles.description}>{taller.objetivo}</Text>
        <Text style={styles.contenidos}>{taller.contenidos}</Text>
        <View style={styles.modalidad}>
          <Text style={styles.modalidadText}>Dia: {taller.modalidad.dia}</Text>
          <Text style={styles.modalidadText}>Formato: {taller.modalidad.formato}</Text>
          <Text style={styles.modalidadText}>Acompañamiento: {taller.modalidad.acompañamiento}</Text>
        </View>

        {isCartEmpty ? (
          <Text style={styles.cartStatusText}>Tu carrito está vacío.</Text>
        ) : (
          <Text style={styles.cartStatusText}>Hay {cartItems.length} talleres en tu carrito.</Text>
        )}

        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Volver</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Agregar al Carrito</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleViewCart}>
          <Text style={styles.buttonText}>Ver Carrito</Text>
        </Pressable>
      </ScrollView>
    </>
  );
};

export default DetailTalleres;
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F8EDE3',
    width: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  contenidos: {
    fontSize: 18,
    textAlign: 'justify',
    marginBottom: 24,
    fontFamily: 'Crafty',
    padding: 10,
    lineHeight: 28,
  },
  description: {
    fontSize: 18,
    textAlign: 'justify',
    marginBottom: 32,
    fontFamily: 'Crafty',
    padding: 10,
    lineHeight: 28,
  },
  button: {
    backgroundColor: '#E6C6B7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '10%',
    marginTop: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    flexGrow: 1,
  },
  modalidad: {
    padding: 10,
    marginVertical: 24,
    width: '100%',
    gap: 10,
  },
  modalidadText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Crafty',
    lineHeight: 26,
  },
  containImageLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  iconImageLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  cartStatusText: { // Nuevo estilo para el mensaje del carrito
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
