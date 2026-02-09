import { ScrollView, StyleSheet, Text, Pressable, Image } from "react-native";
import React from "react";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import { useState } from "react";
import back from "../../assets/icon/back.png";
import { useNavigation } from "@react-navigation/native";

const SobreNosotros = () => {
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
          La Red de Apoyo Perinatal fue creada por María Florencia Velasco,
          Psicóloga General Sanitaria, formada en la Universidad Nacional de La
          Plata (Argentina), con título homologado en España. {"\n\n"}Cuenta con
          formación especializada como Máster Experta en Psicología Perinatal
          por el Instituto Español de Psicoterapia Integrativa. {"\n\n"}
          Actualmente trabaja en consulta clínica online y presencial en Irún,
          acompañando procesos individuales, de pareja y familiares, con
          especial foco en la etapa perinatal. {"\n\n"}La Red no es un proyecto
          individual, sino un trabajo en equipo. Detrás de la Red de Apoyo
          Perinatal hay un equipo interdisciplinario conformado por psicólogas y
          una terapista ocupacional, que comparten una mirada sensible, ética y
          comprometida con la salud mental perinatal.{"\n\n"}Nuestro objetivo es
          seguir creciendo e incorporando nuevas especialidades, para ofrecer
          cada vez un acompañamiento más completo, integral y accesible a la
          comunidad. {"\n\n"}La creación de esta app surge del deseo de ampliar
          el alcance del acompañamiento psicológico, acercando recursos de
          calidad a quienes no siempre pueden acceder a un espacio terapéutico
          tradicional.{"\n\n"} Nuestro propósito Nuestro propósito es tender
          redes, humanizar el cuidado en salud mental y ofrecer un
          acompañamiento respetuoso, cercano y sensible.{"\n\n"}
          Acompañar implica estar, sostener, escuchar y validar. La Red de Apoyo
          Perinatal es un espacio para pensar(se), sentir(se) y transitar cada
          etapa con mayor conciencia, información y apoyo. {"\n\n"}Porque cuidar
          también es cuidar(se). {"\n\n"}Trabajamos desde una perspectiva de la
          psicología perinatal, integradora y respetuosa, que entiende la
          maternidad, la paternidad, el duelo y la crianza como procesos
          profundamente emocionales, atravesados por la historia personal, los
          vínculos, el contexto social y cultural. {"\n\n"}Nuestra mirada pone
          en el centro:{"\n\n"} El cuidado de la salud mental perinatal {"\n\n"}
          La prevención y la psicoeducación {"\n\n"}El respeto por la diversidad
          de familias y recorridos {"\n\n"}El acompañamiento sin juicios ni
          mandatos {"\n\n"}Entendemos que el bienestar emocional de quienes cuidan
          también es parte fundamental del bienestar de quienes nacen y crecen.
        </Text>
      </ScrollView>
    </>
  );
};

export default SobreNosotros;

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
