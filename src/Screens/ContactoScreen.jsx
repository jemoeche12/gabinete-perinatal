import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import FormComponent from "../components/FormComponent";
import CardPsicologos from "../components/CardPsicologos";

const ContactoScreen = ({ visible, navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(visible);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <CustomHeader onMenuPress={toggleMenu} />
      {isMenuVisible && (
        <MenuDesplegable visible={isMenuVisible} onClose={toggleMenu} />
      )}
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <CardPsicologos
          psicologo={{
            nombre: "Florencia",
            apellido: "Velasco",
            telefono: "+33 777989701",
            email: "florencia.velasco@example.com",
          }}
          uri="https://example.com/imagen.jpg"
        />
        <FormComponent />
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("Main")}}>
          <Text style={styles.buttonText}>Volver al Inicio</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default ContactoScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8EDE3",
    paddingVertical: 30,
  },
   button: {
    backgroundColor: "#B78270",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Roboto400",
  },
});
