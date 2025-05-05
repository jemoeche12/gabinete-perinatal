import { View, Text, StyleSheet, ScrollView, Pressable, FlatList } from 'react-native';
import React from 'react';
import { useGetTestByIdQuery } from '../services/testService';

const TestDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { data, isLoading, error } = useGetTestByIdQuery(id);

  if (isLoading) return <Text style={styles.loading}>Cargando...</Text>;
  if (error || !data) return <Text style={styles.error}>Error al cargar el test</Text>;

  const preguntasArray = data.preguntas ? Object.values(data.preguntas) : [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{data.titulo}</Text>
      <Text style={styles.description}>{data.objetivo}</Text>

      <Text style={styles.subtitulo}>Preguntas:</Text>
      <FlatList
        data={preguntasArray}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item, index }) => (
          <View style={styles.preguntaBox}>
            <Text style={styles.pregunta}>{index + 1}. {item}</Text>
          </View>
        )}
        scrollEnabled={false}
      />


      <Pressable
        style={styles.boton}
        onPress={() => navigation.navigate("TestStart", { id: testId })}
      >
        <Text style={styles.botonTexto}>Comenzar Test</Text>
      </Pressable>

    </ScrollView>
  );
};

export default TestDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8EDE3',
    padding: 20,
  },
  loading: {
    marginTop: 50,
    fontSize: 18,
    textAlign: 'center',
  },
  error: {
    marginTop: 50,
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Crafty',
    marginBottom: 15,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  preguntaBox: {
    backgroundColor: '#DEC3B2',
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
  },
  pregunta: {
    fontSize: 16,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#B78270',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Crafty',
  },
});