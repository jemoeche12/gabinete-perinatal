import React, { createContext, useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useDB } from "../hooks/useDb"; 

const DBContext = createContext(null);

export const DBProvider = ({ children }) => {
  const {
    dbInitialized,
    dbError,
    insertSession,
    getSession,
    truncateSessionTable,
  } = useDB();

  if (!dbInitialized && !dbError) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando base de datos...</Text>
      </View>
    );
  }

  if (dbError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          ¡Error crítico! No se pudo cargar la base de datos.
        </Text>
        <Text style={styles.errorMessage}>{dbError.message}</Text>
        <Text style={styles.errorMessage}>
          Por favor, reinicie la aplicación.
        </Text>
      </View>
    );
  }

  return (
    <DBContext.Provider
      value={{ dbInitialized, insertSession, getSession, truncateSessionTable }}
    >
      {children}
    </DBContext.Provider>
  );
};

export const useDBContext = () => {
  const context = useContext(DBContext);

  if (context === undefined) {
    throw new Error("useDBContext must be used within a DBProvider");
  }
  return context;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe6e6",
    padding: 20,
  },
  errorText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
  errorMessage: {
    marginTop: 10,
    fontSize: 14,
    color: "#880000",
    textAlign: "center",
  },
});
