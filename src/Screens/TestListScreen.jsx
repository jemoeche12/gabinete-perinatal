import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import React, { useState } from "react";
import { useGetTestTituloQuery } from "../services/testService";
import TestComponent from "../components/TestComponent";
import iconImageLoading from "../../assets/Red.png";
import { usePermisses } from "../hooks/usePermisses";
import BannerMembresia from "../components/BannerMembresia";
import { Modal } from "react-native";

const TestListScreen = ({ navigation, visible }) => {
  const { data, error, isLoading } = useGetTestTituloQuery();
  const [isMenuVisible, setMenuVisible] = useState(visible);
  const toggleMenu = () => setMenuVisible(!isMenuVisible);
  const [requiredLevel, setRequiredLevel] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { canAccessByLevel } = usePermisses();

  const handleLockedPress = (requiredLevel) => {
    setRequiredLevel(requiredLevel);
    setModalVisible(true);
  };

  const handlePlanNavigation = () => {
    navigation.navigate("UpdateMembresias");
  };

  if (isLoading)
    return (
      <View style={styles.containImageLoading}>
        <Image source={iconImageLoading} style={styles.iconImageLoading} />
      </View>
    );
  if (error) return <Text>Error al cargar los tests</Text>;

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
            onNavigateToPlans={handlePlanNavigation}
          />
        </View>
      </Modal>

      <FlatList
        style={styles.container}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const canAccess = canAccessByLevel(item.requiredLevel);
          return (
            <TestComponent
              categoryTest={item.title}
              navigation={navigation}
              id={item.id}
              canAccess={canAccess}
              onPressLocked={handleLockedPress}
            />
          );
        }}
        ListHeaderComponent={
          
          <View style={styles.view}>
            <Text style={styles.text}>
              La gestación, el parto y la crianza son etapas llenas de desafíos
              y cambios. Para ayudarte en este camino, hemos desarrollado una
              serie de test diseñados para madres, padres y acompañantes
              emocionales, con el objetivo de brindarte un espacio de reflexión
              y autoconocimiento.{"\n"}
              {"\n"}
              ¿Cómo funcionan los test? Cada test está enfocado en un aspecto
              clave de la experiencia perinatal. Puedes hacerlos en cualquier
              momento y tantas veces como desees. Al finalizar, recibirás una
              devolución con sugerencias y recursos que pueden ayudarte en tu
              camino. {"\n"}
              {"\n"}
              Recuerda: Estos test no reemplazan una evaluación profesional,
              pero pueden ser un primer paso para comprender mejor tu
              experiencia y recibir el apoyo adecuado si lo necesitas{"\n"}
              {"\n"}
            </Text>
          </View>
        }
        contentContainerStyle={styles.list}
      />
    </>
  );
};

export default TestListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8EDE3",
    flex: 1,
  },
  containImageLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  iconImageLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  view: {
    marginTop: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  text: {
    fontFamily: "Roboto400",
    width: "90%",
    marginHorizontal: "5%",
    fontSize: 24,
  },
  list: {
    paddingBottom: 40,
  },
});
