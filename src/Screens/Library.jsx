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

const LibraryScreen = ({ visible }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(visible);
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
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const canAccess = canAccessByLevel(item.requiredLevel);
          return (
            <LibraryComponent
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
              Bienvenida/o a la sección BIBLIOTECA pensados para ti Organizamos
              todo el contenido en botones temáticos, para que accedas fácil y
              rápidamente a la información que necesitas. {"\n"}{"\n"}Cada botón te lleva a
              contenido creado por profesionales de la psicología, con un
              enfoque respetuoso y basado en evidencia. Además, cada tema está
              identificado con un color, según la etapa del camino perinatal que
              representa.{"\n"}{"\n"} Explora, aprende y vive esta etapa con herramientas
              que cuidan tu bienestar emocional. {"\n"}{"\n"}Estamos para acompañarte con
              respeto, cercanía y profesionalismo.
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
    paddingTop: 20,
    paddingBottom: 20,
    lineHeight: 28,
    textAlign: "justify"
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
