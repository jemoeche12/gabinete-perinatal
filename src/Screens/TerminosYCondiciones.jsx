import { StyleSheet, Text, ScrollView, Image, Pressable } from "react-native";
import React from "react";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import back from "../../assets/icon/back.png";

const TerminosYCondiciones = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const navigation = useNavigation();

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <CustomHeader onMenuPress={toggleMenu} />
      {isMenuVisible && (
        <MenuDesplegable onClose={toggleMenu} visible={isMenuVisible} />
      )}
      <ScrollView style={styles.container}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={back} style={styles.backIcon} />
        </Pressable>
        <Text style={styles.text}>
          Al utilizar esta aplicación, aceptas cumplir con los siguientes
          términos y condiciones.{"\n\n"}1. Uso de la Aplicación: La aplicación
          está destinada a proporcionar información y recursos relacionados con la salud mental perinatal. No es un sustituto de la atención médica profesional.{"\n\n"}2.
          Privacidad: Respetamos tu privacidad y nos comprometemos a proteger tus
          datos personales. Consulta nuestra Política de Privacidad para obtener más información sobre cómo recopilamos, usamos y protegemos tu información.{"\n\n"}3. Contenido: El contenido de la aplicación es solo para fines informativos y educativos. No garantizamos la precisión, integridad o utilidad de la información proporcionada.{"\n\n"}4. Responsabilidad: No seremos responsables de ningún daño directo, indirecto, incidental, consecuente o punitivo que surja del uso o la imposibilidad de usar la aplicación.{"\n\n"}5. Cambios en los Términos: Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier cambio será efectivo inmediatamente después de su publicación en la aplicación.{"\n\n"}
          6. Contacto: Si tienes alguna pregunta sobre estos términos y condiciones, por favor contáctanos a través de los medios proporcionados en la aplicación.{"\n\n"}Al continuar utilizando la aplicación, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguno de estos términos, por favor no utilices la aplicación.
        </Text>
      </ScrollView>
    </>
  );
};

export default TerminosYCondiciones;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8EDE3",
    flex: 1,
    paddingVertical: 12,
  },
  text: {
    fontFamily: "Roboto400",
    width: "90%",
    marginHorizontal: "5%",
    fontSize: 18,
    paddingVertical: 40,
  },
  backButton: {
    left: 15,
    marginVertical: 10,
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
