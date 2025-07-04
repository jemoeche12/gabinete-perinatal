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
import { useState } from "react";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";


const Detail = ({ navigation, route, visible }) => {
  const { productId: idSelected } = route.params;
  const { data: product } = useGetProductByIdQuery(idSelected);
  const [isMenuVisible, setIsMenuVisible] = useState(visible);
  
    const toggleMenu = () => {
      setIsMenuVisible(!isMenuVisible);
    };


  return (
    <ImageBackground
      source={require("../../assets/img/fondoRecurso.png")}
      style={styles.background}
    >
      <CustomHeader onMenuPress={toggleMenu} />
      {isMenuVisible && <MenuDesplegable onClose={toggleMenu} visible={isMenuVisible} />}
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
    marginTop: -20,
    textAlign: "center",
    fontWeight: "bold",

  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "300",
    marginBottom: 40,
    fontFamily: "Crafty"
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
