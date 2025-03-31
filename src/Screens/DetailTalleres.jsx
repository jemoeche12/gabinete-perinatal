import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { useGetTallerByIdQuery } from '../services/talleresService';

const DetailTalleres = ({ route, navigation }) => {
  const { tallerId } = route.params;
  const { data: taller, isLoading, error } = useGetTallerByIdQuery(tallerId);

  if (isLoading) return <Text>Cargando detalles del taller...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!taller) return <Text>No se encontró el taller.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>{taller.titulo}</Text>
        <Text style={styles.description}>{taller.objetivo}</Text>
          <View style={styles.modalidad}>
            <Text style={styles.modalidadText}>Dia: {taller.modalidad.dia}</Text>
            <Text style={styles.modalidadText}>Formato: {taller.modalidad.formato}</Text>
            <Text style={styles.modalidadText}>Acompañamiento: {taller.modalidad.acompañamiento}</Text>
          </View>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Volver</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default DetailTalleres;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F8EDE3',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    fontFamily: 'Crafty',
    padding: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    flexGrow: 1,
  },
  modalidad:{
    padding: 10,
    marginVertical: 18,
    marginHorizontal: 10,
    gap: 10,
    fontFamily: "Crafty",
    fontSize: 16
  },
  modalidadText:{
    fontSize: 18,
    color: "black",
    fontFamily: "Crafty"
  }
});