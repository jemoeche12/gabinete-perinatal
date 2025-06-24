import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CartItem = ({ item }) => {
  if (!item) {
    return null;
  }

  const {
    titulo = "Taller sin título",
    beneficios = "Beneficios no listados",
    price = 0,
  } = item;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.text}>{beneficios}</Text>
      <Text style={styles.price}>Precio: ${price.toFixed(2)}</Text>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  text: {
    fontSize: 18,
    color: "#555",
    marginBottom: 3,
    fontFamily: "Crafty"
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007bff",
    marginTop: 10,
    textAlign: "right",
  },
});
