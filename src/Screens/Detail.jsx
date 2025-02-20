import {
  Button,
  StyleSheet,
  Text,
  View,
  
} from "react-native";
import React, { useEffect, useState } from "react";
import allProducts from "../data/informathions.json";

const Detail = ({ idSelected, setProductSelected }) => {
  const [product, setProduct] = useState(null);

 

  useEffect(() => {
    console.log("ID Seleccionado:", idSelected);
    const productSelected = allProducts.find(
      (product) => product.id.toString() === idSelected.toString()
    );
    console.log("Producto encontrado:", productSelected);
    setProduct(productSelected);
  }, [idSelected]);

  return (
    <View style={styles.container}>
      <Button onPress={() => setProductSelected("")} title="Volver" />
      {product ? (
        <>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </>
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  
});
