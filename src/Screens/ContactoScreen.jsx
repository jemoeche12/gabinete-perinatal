import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import FormComponent from "../components/FormComponent";
import CardPsicologos from "../components/CardPsicologos";
import back from "../../assets/icon/back.png";

const ContactoScreen = ({ visible, navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(visible);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <CustomHeader onMenuPress={toggleMenu} />
      <ScrollView>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={back} style={styles.backIcon} />
        </Pressable>
        {isMenuVisible && (
          <MenuDesplegable visible={isMenuVisible} onClose={toggleMenu} />
        )}
        <View
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
        </View>
      </ScrollView>
    </>
  );
};

export default ContactoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8EDE3",
    paddingVertical: 30,
  },
  backButton: {
    left: 15,
    marginVertical: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});
