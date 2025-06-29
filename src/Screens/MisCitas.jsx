import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useGetCitaQuery } from "../services/citasService";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

const MisCitas = () => {
  const localId = useSelector((state) => state.auth.value.localId);

  const [fechaElegida, setFechaElegida] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const {
    data: citasPorUsuario = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCitaQuery(localId);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#B78270" />
        <Text style={styles.loadingText}>Cargando tus citas...</Text>
      </View>
    );
  }

  if (isError) {
    console.error("Error al cargar las citas:", error);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error al cargar tus citas: {error?.message || "Desconocido"}
        </Text>
        <Text style={styles.errorText}>
          Por favor, inténtalo de nuevo más tarde.
        </Text>
        <Pressable style={styles.refreshButton} onPress={() => refetch()}>
          <Text style={styles.refreshButtonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  if (citasPorUsuario.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.header}>Mis Citas</Text>
        <Text style={styles.emptyText}>
          No tienes citas programadas al dia de la fecha:{" "}
          {dayjs(fechaElegida).format("DD [de] MMMM [de] YYYY")}.
        </Text>
        <Text style={styles.emptyText}>
          ¡Solicita una nueva cita si lo deseas!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Tus Citas al dia de la fecha:{" "}
        {dayjs(fechaElegida).format("DD [de] MMMM [de] YYYY")}
      </Text>
      <FlatList
        data={citasPorUsuario}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.citaCard}>
            <Text style={styles.citaText}>Fecha: {item.fechaSeleccionada}</Text>
            <Text style={styles.citaText}>Horario: {item.horarioELegido}</Text>
            <Text style={styles.citaText}>Consulta: {item.consulta}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MisCitas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8EDE3",
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontFamily: "Crafty",
    color: "#B78270",
    marginBottom: 20,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8EDE3",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: "Crafty",
    color: "#B78270",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8EDE3",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 5,
    fontFamily: "Crafty",
  },
  refreshButton: {
    backgroundColor: "#B78270",
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  refreshButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Crafty",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8EDE3",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    fontFamily: "Crafty",
    marginBottom: 10,
  },
  citaCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  citaText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
    fontFamily: "Crafty",
  },
});
