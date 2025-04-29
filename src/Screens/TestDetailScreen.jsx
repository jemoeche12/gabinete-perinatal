import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useGetTestByIdQuery } from '../services/testService';

const TestDetailScreen = ({ route }) => {
  const { id } = route.params;
  console.log('ID recibido en TestDetailScreen:', id);

  const { data: test, isLoading, error } = useGetTestByIdQuery(id, { // <---- Cambié "tests" a "test"
    onSuccess: (data) => {
      console.log('Datos recibidos de la API (onSuccess):', data);
      if (data?.id) {
        console.log('Éxito - ID del test recibido de la API:', data.id);
      } else if (data) {
        console.log('Éxito - Datos recibidos de la API (sin propiedad id):', data);
      } else {
        console.log('Éxito - Datos recibidos de la API: null');
      }
    },
  });

  console.log('Valor de "test" después de la consulta:', test); // <---- Ahora logueamos "test"

  if (isLoading) return <Text>Cargando...</Text>;
  if (error) {
    console.error('Error al cargar el test:', error);
    return <Text>Ocurrió un error al cargar el test</Text>;
  }

  if (!test) { // <---- Verificamos si "test" existe (puede ser null si no se encuentra)
    return <Text>No se encontró el test</Text>; // <---- Mensaje más apropiado
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{test.titulo}</Text>
      <Text style={styles.subTitle}>Objetivo:</Text>
      <Text style={styles.text}>{test.interpretaciones?.objetivo}</Text>
      <Text style={styles.subTitle}>Instrucciones:</Text>
      <Text style={styles.text}>{test.instrucciones}</Text>
    </ScrollView>
  );
};

export default TestDetailScreen;

// ... (estilos)