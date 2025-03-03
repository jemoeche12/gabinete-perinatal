import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import allProducts from "../data/informathions.json";

const Detail = ({ navigation, route }) => {
  const [product, setProduct] = useState(null);
  const { productId: idSelected } = route.params;

  useEffect(() => {
    const productSelected = allProducts.find(
      (product) => product.id === Number(idSelected)
    );
    setProduct(productSelected);
  }, [idSelected]);

  return (
    <ImageBackground
      source={require("../../assets/img/aa.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        {product ? (
          <>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>Volver</Text>
        </Pressable>
          </>
        ) : (
          null)}


      </View>
    </ImageBackground>
  );
};

export default Detail;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",

  },
  title: {
    fontSize: 24,
    color: "white",
    marginTop: -20

  },
  description: {
    fontSize: 17,
    textAlign: "center",
    marginTop: -75,
    paddingVertical: 80,
    color: "white",
    width: "100%",
    height: "100%",
    fontWeight: "300"
  },
  btn: {
    borderRadius: 10,
    backgroundColor: "#B78270",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: -10,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
