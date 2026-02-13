import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import FuncionTalleres from "../components/FuncionTalleres";
import fondo from "../../assets/fondos/fondoTalleres.jpg";
import AddButton from "../components/AddButton";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import iconTalleres from "../../assets/icon/talleres.png";

const Talleres = ({ navigation, visible }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(visible);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <View style={styles.container}>
      <CustomHeader onMenuPress={toggleMenu} />
      {isMenuVisible && (
        <MenuDesplegable onClose={toggleMenu} visible={isMenuVisible} />
      )}
      <ImageBackground source={fondo} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>
            Te damos la bienvenida a la sección TALLERES de Red de Apoyo
            Perinatal Digital, un espacio diseñado para acompañarte en el camino
            de la maternidad y paternidad con información especializada y un
            espacio de escucha profesional.
          </Text>
          <FuncionTalleres />
        </ScrollView>
          <AddButton
            style={styles.btnTalleres}
            title="Talleres"
            onPress={() => navigation.navigate("ListTalleres")}
            iconSource={iconTalleres}
          />
      </ImageBackground>
    </View>
  );
};

export default Talleres;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    height: "100%",
    resizeMode: "cover",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    color: "black",
    marginTop: 35,
    textAlign: "center",
    padding: 20,
    fontFamily: "Roboto400",
    
  },
btnTalleres: {
  position: "absolute",   
  right: 20,
  bottom: 40,
  
  backgroundColor: "#E6C6B7",
  width: 100,
  height: 100,
  zIndex: 10,
  elevation: 10,
}

});
