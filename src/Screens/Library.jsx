import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import { useState } from "react";
import { usePermisses } from "../hooks/usePermisses";
import { useNavigation } from "@react-navigation/native";
import { useGetLibraryByCategoryQuery } from "../services/recursosService";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import back from "../../assets/icon/back.png";
import BannerMembresia from "../components/BannerMembresia";
import { Modal } from "react-native";
import LibraryComponent from "../components/LibraryComponent";

const LibraryScreen = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [requiredLevel, setRequiredLevel] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { canAccessByLevel } = usePermisses();

  const handleLockedPress = (requiredLevel) => {
    setRequiredLevel(requiredLevel);
    setModalVisible(true);
  };

  const handleNavigateToPlans = () => {
    setModalVisible(false);
    navigation.navigate("UpdateMembresias");
  };

  const { data: categories = [] } = useGetLibraryByCategoryQuery();

  const navigation = useNavigation();

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <CustomHeader />
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
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const canAccess = canAccessByLevel(item.requiredLevel);
          return (
            <LibraryComponent
              style={styles.categoryName}
              category={item}
              navigation={navigation}
              onPressLocked={handleLockedPress}
              canAccess={canAccess}
              description={item.description}
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
              Hemos organizado el contenido en diferentes botones temáticos,
              para que puedas acceder fácilmente a la información que más te
              interesa:{"\n\n"}- Encuentra información sobre cambios físicos y
              emocionales, preparación para el parto y autocuidado.{"\n\n"}-
              Consejos y herramientas para acompañar activamente en todo el
              proceso.{"\n\n"}- Guía sobre cómo brindar apoyo desde la empatía y
              el amor.{"\n\n"}- Recursos para fortalecer el lazo con tu bebé
              desde el nacimiento.{"\n\n"}- Respuestas a preguntas comunes sobre
              la gestación y el posparto.{"\n\n"}
              Cada botón te llevará a contenido especializado, elaborado por
              profesionales de la psicología perinatal.{"\n\n"}Explora, aprende
              y vive esta etapa con toda la información.{"\n\n"}Recuerda que
              estamos aquí para acompañarte.
            </Text>
          </View>
        }
          contentContainerStyle={styles.list}
      />
    </>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8EDE3",
    flex: 1,
  },
  view: {
    paddingVertical: 20,
    backgroundColor: "#F8EDE3",
  },
  text: {
    fontFamily: "Roboto400",
    width: "90%",
    marginHorizontal: "5%",
    fontSize: 24,
    paddingBottom: 20,
  },
  list: {
    backgroundColor: "#F8EDE3",
  },
  backButton: {
    left: 15,
    marginVertical: 12,
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
