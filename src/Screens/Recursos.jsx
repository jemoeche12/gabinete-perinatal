import { FlatList, StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import CategoryItem from "../components/CategoryItem";
import { useGetCategoriesQuery } from "../services/recursosService";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import { usePermisses } from "../hooks/usePermisses";
import BannerMembresia from "../components/BannerMembresia";
import { Modal } from "react-native";

const Recursos = ({ navigation, visible }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(visible);
  const [requiredLevel, setRequiredLevel] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { canAccessByLevel } = usePermisses();

  const { data: categories = [] } = useGetCategoriesQuery();

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLockedPress = (requiredLevel) => {
    setRequiredLevel(requiredLevel);
    setModalVisible(true);
  };

  const handleNavigateToPlans = () => {
    setModalVisible(false);
    navigation.navigate("UpdateMembresias"); 
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
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const canAccess = canAccessByLevel(item.requiredLevel);
          return (
            <CategoryItem
              category={item}
              navigation={navigation}
              canAccess={canAccess}
              onPressLocked={handleLockedPress}
            />
          );
        }}
        ListHeaderComponent={
          <View style={styles.view}>
            <Text style={styles.text}>
              Hemos organizado el contenido en diferentes botones
              temáticos, para que puedas acceder fácilmente a la
              información que más te interesa:{'\n\n'}

              - Encuentra información sobre cambios físicos y emocionales,
               preparación para el parto y autocuidado.{'\n\n'}

              - Consejos y herramientas para acompañar activamente en todo
              el proceso.{'\n\n'}
              - Guía sobre cómo brindar apoyo desde la empatía y el amor.{'\n\n'}
              - Recursos para fortalecer el lazo con tu bebé desde
              el nacimiento.{'\n\n'}
              - Respuestas a preguntas comunes sobre la gestación y el posparto.{'\n\n'}
               Cada botón te llevará a contenido especializado, elaborado por profesionales de la
              psicología perinatal.{'\n\n'}Explora, aprende y vive
              esta etapa con toda la información.{'\n\n'}Recuerda que estamos aquí
              para acompañarte.
            </Text>
          </View>
        }
        contentContainerStyle={styles.list}
      />
    </>
  );
};

export default Recursos;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8EDE3",
    flex: 1,
  },
  view: {
    marginTop: 40,
  },
  text: {
    fontFamily: "Roboto400",
    width: "90%",
    marginHorizontal: "5%",
    fontSize: 24,
    paddingBottom: 20,
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
