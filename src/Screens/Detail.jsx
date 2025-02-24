import {
  Button,
  StyleSheet,
  Text,
  View,
  
} from "react-native";
import React, { useEffect, useState } from "react";
import allProducts from "../data/informathions.json";

const Detail = ({ navigation, route }) => {
  const [product, setProduct] = useState(null);

  const {productId: idSelected} = route.params

 

  useEffect(() => {
    const productSelected = allProducts.find(
      (product) => product.id === Number(idSelected)
    );
    setProduct(productSelected);
  }, [idSelected]);

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()} title="Volver" />
      {product ? (
        <>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </>
      ) : null}
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
