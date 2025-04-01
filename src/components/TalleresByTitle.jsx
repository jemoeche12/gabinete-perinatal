import { useDispatch } from 'react-redux';
import { Pressable, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { setTalleresTitleSelected } from '../features/talleres/TalleresSlice';
import Card from './Card';

const TalleresByTitle = ({ titulo, navigation, id, modalidad, beneficios }) => {

  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(setTalleresTitleSelected(id));
    navigation.navigate('DetailTalleres', { tallerId: id });
  };


  return (
    <Card style={styles.container}>

      <Pressable onPress={handlePress} style={styles.productItem}>
        <Text style={styles.productTextTitle}>{titulo}</Text>
        <Text style={styles.productText}>Beneficios: {beneficios}</Text>
        <Text style={styles.productText}>Dia: {modalidad.dia}</Text>
        <Text style={styles.productText}>Acompañamiento: {modalidad.acompañamiento}</Text>
        <Text style={styles.productText}>Formato: {modalidad.formato}</Text>
      </Pressable>
    </Card>
  );
};

export default TalleresByTitle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8EDE3",
    padding: 10,
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
  },
  productTextTitle: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
    lineHeight: 26

  },
  productText: {
    fontSize: 18,
    color: "black",
    fontFamily: "Crafty",
    marginVertical: 10,
    textAlign: "flex-start",
  },

});
