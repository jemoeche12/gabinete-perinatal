import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useGetDueloQuery } from "../services/DueloService";
import { usePermisses } from "../hooks/usePermisses";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import BannerMembresia from "../components/BannerMembresia";
import DueloComponent from "../components/DueloComponent";
import { Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import back from "../../assets/icon/back.png";

const Duelo = () => {
  const [requiredLevel, setRequiredLevel] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const navigation = useNavigation();

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const { data, error, isLoading } = useGetDueloQuery();
  const { canAccessByLevel } = usePermisses();

  const handleLockedPress = (requiredLevel) => {
    setRequiredLevel(requiredLevel);
    setModalVisible(true);
  };

  const handleNavigateToPlans = () => {
    setModalVisible(false);
    navigation.navigate("UpdateMembresias");
  };

  const listFooterComponent = () => {
    return (
      <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
        <Text style={styles.textFooter}>
          {" "}
          Lo más importante hoy: Queremos recordarte algo, no estás sola, no
          estás solo, y no hay una forma “correcta” de vivir este momento. El
          duelo por un bebé es una experiencia profunda, única y legítima. Cada
          emoción —la tristeza, el enojo, el miedo o el silencio— tiene su razón
          de ser. En la Red de Apoyo PERINATAL queremos ofrecerte un espacio de
          escucha y acompañamiento respetuoso. Podés escribirnos si necesitás
          hablar, recibir orientación o simplemente ser escuchada con
          sensibilidad. ¿Quieres acompañamiento emocional? Pulsa aquí para
          conectarte con una profesional de nuestra red. Atención personalizada
          y confidencial. Espacio de escucha activa, sin juicios, desde la
          psicología perinatal. “Tu historia importa. Tu bebé importa. Tu dolor
          merece cuidado.”{" "}
        </Text>
      </View>
    );
  };

  return (
    <>
      <CustomHeader onMenuPress={toggleMenu} />
    
      {isMenuVisible && (
        <MenuDesplegable onClose={toggleMenu} visible={isMenuVisible} />
      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <BannerMembresia
            requiredLevel={requiredLevel}
            onClose={() => setModalVisible(false)}
            onNavigateToPlans={handleNavigateToPlans}
          />
        </View>
      </Modal>
      <FlatList
        style={styles.container}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const canAccess = canAccessByLevel(item.requiredLevel);
          return (
            <DueloComponent
              category={item}
              navigation={navigation}
              canAccess={canAccess}
              onPressLocked={handleLockedPress}
            />
          );
        }}
        ListHeaderComponent={
          <View style={styles.view}>
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Image source={back} style={styles.backIcon} />
            </Pressable>
            <Text style={styles.text}>
              En este espacio de la Red de Apoyo Perinatal encontrarás compañía,
              palabras que abrazan y recursos pensados para transitar el duelo
              con sensibilidad.{"\n\n"}Podrás acceder a contenidos para madres,
              padres, abuelos, hermanos y también para quienes acompañan desde
              el rol de amigos.
              {"\n\n"}Aquí aprenderás qué hacer, cómo sostener y cómo cuidarte
              en este camino tan único y personal. Un lugar para sentirte
              acompañado y comprendido, estés donde estés.{"\n\n"}Y si en
              cualquier momento necesitas un acompañamiento más cercano, desde
              la pantalla de inicio de la app podés solicitar una cita con una
              psicóloga perinatal.
            </Text>
          </View>
        }
        ListFooterComponent={listFooterComponent}
        contentContainerStyle={styles.list}
      />
    </>
  );
};

export default Duelo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8EDE3",
    flex: 1,
  },
  view: {
    marginTop: 20,
  },
  backButton: {
    left: 15,
    marginBottom: 10,
    width: 40, 
    height: 40,
    justifyContent: "center",
  },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  text: {
    fontFamily: "Roboto400",
    width: "90%",
    marginHorizontal: "5%",
    fontSize: 24,
    paddingBottom: 20,
  },
  textFooter: {
    fontFamily: "Roboto400",
    width: "90%",
    marginHorizontal: "5%",
    fontSize: 20,
    paddingBottom: 20,
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  list: {
    paddingBottom: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
