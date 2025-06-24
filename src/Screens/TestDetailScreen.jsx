import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useGetTestByIdQuery } from "../services/testService";
import iconImageLoading from "../../assets/IconApp7.png";

const TestDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { data, error, isLoading } = useGetTestByIdQuery(id);
  const [selectedRespuesta, setSelectedRespuesta] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [puntajeFinal, setPuntajeFinal] = useState(0);
  const [mensajeResultado, setMensajeResultado] = useState("");

  if (isLoading)
    return (
      <View style={styles.containImageLoading}>
        <Image source={iconImageLoading} style={styles.iconImageLoading} />
      </View>
    );
  if (error || !data)
    return <Text style={styles.error}>Error al cargar el test</Text>;

  const arrayPreguntas = Array.isArray(data.preguntas)
    ? data.preguntas
    : Object.values(data.preguntas || {});

  const handleAnswerPress = (respuestaValor, questionId) => {
    setSelectedRespuesta((prev) => ({
      ...prev,
      [questionId]: respuestaValor,
    }));
  };

  const obtenerMensaje = (puntaje) => {
    const mensajePorPuntaje = data.resultadosPorPuntaje || [];
    const resultadoMensaje = mensajePorPuntaje.find(
      (r) => puntaje >= r.min && puntaje <= r.max
    );
    return (
      resultadoMensaje?.mensaje ||
      "No se encontró un mensaje para este puntaje."
    );
  };

  const calcularResultado = () => {
    const puntaje = Object.values(selectedRespuesta);
    const totalPuntaje = puntaje.reduce(
      (sum, valor) => sum + parseInt(valor || 0),
      0
    );
    return totalPuntaje;
  };

  const handleMostrarResultado = () => {
    const resultado = calcularResultado();
    const mensaje = obtenerMensaje(resultado);
    setPuntajeFinal(resultado);
    setMensajeResultado(mensaje);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.objetivo}</Text>
      </View>

      <Text style={styles.subtitulo}>Preguntas:</Text>

      <FlatList
        data={arrayPreguntas}
        keyExtractor={(_, index) => `q-${index}`}
        renderItem={({ item: preguntaItem, index }) => {
          const questionId = `q-${index}`;

          const arrayRespuestas = Array.isArray(preguntaItem.respuestas)
            ? preguntaItem.respuestas
            : Object.values(preguntaItem.respuestas || {});

          const isCurrentQuestionAnswered = selectedRespuesta[questionId];

          return (
            <View style={styles.preguntaBox}>
              <Text style={styles.pregunta}>{preguntaItem.pregunta}</Text>
              {arrayRespuestas.map((respuestaItem, idx) => {
                const isSelected =
                  isCurrentQuestionAnswered === respuestaItem.valor;

                return (
                  <Pressable
                    key={`${questionId}-${respuestaItem.valor}-${idx}`}
                    style={[
                      styles.respuestaButton,
                      isSelected && styles.respuestaButtonSelected,
                    ]}
                    onPress={() =>
                      handleAnswerPress(respuestaItem.valor, questionId)
                    }
                  >
                    <Text
                      style={[
                        styles.respuestaButtonText,
                        isSelected && styles.respuestaButtonTextSelected,
                      ]}
                    >
                      {respuestaItem.text || respuestaItem.texto}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          );
        }}
        scrollEnabled={false}
      />

      <Pressable style={styles.button} onPress={handleMostrarResultado}>
        <Text style={styles.buttonText}>Mostrar Resultado del Test</Text>
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <ScrollView style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{data.interpretaciones}</Text>
            <Text style={styles.scoreText}>{mensajeResultado}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Cerrar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

export default TestDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8EDE3",
    padding: 20,
    flexGrow: 1,
  },
  loading: {
    marginTop: 50,
    fontSize: 18,
    textAlign: "center",
  },
  containImageLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  iconImageLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  error: {
    marginTop: 50,
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  headerContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "Crafty",
    textAlign: "center",
    marginVertical: 25,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  subtitulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
    color: "#333",
  },
  preguntaBox: {
    backgroundColor: "#DEC3B2",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pregunta: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  respuestaButton: {
    backgroundColor: "#F0D9C5",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#D4B9A6",
  },
  respuestaButtonText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    fontWeight: "normal",
  },
  respuestaButtonSelected: {
    backgroundColor: "#B78270",
    borderColor: "#B78270",
  },
  respuestaButtonTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    marginVertical: 30,
    backgroundColor: "#B78270",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Crafty",
  },
  centeredView: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#DEC3B2",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    color: "#555",
  },
  scoreText: {
    fontSize: 26,
    fontFamily: "Crafty",
    color: "#B78270",
    marginBottom: 25,
  },
  buttonClose: {
    backgroundColor: "#B78270",
    marginTop: 15,
  },
});
