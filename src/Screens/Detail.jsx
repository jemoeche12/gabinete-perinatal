import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView
} from "react-native";
import React from "react";
import { useGetProductByIdQuery } from "../services/recursosService";



const Detail = ({ navigation, route }) => {
  const { productId: idSelected } = route.params;
  const { data: product } = useGetProductByIdQuery(idSelected);
  

  return (
    <ImageBackground
      source={require("../../assets/img/aa.png")}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {product ? (
          <View style={styles.content}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
              <Text style={styles.btnText}>Volver</Text>
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
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

  },
  title: {
    fontSize: 24,
    color: "white",
    marginTop: -20

  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "300",
    marginBottom: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.7)",

  }, content: {
    padding: 20,
    alignItems: "center",
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
