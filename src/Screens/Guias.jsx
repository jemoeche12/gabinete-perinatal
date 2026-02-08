import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { usePermisses } from "../hooks/usePermisses";
import { useNavigation } from "@react-navigation/native";
import GuidesComponent from "../components/GuidesComponent";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import BannerMembresia from "../components/BannerMembresia";
import { Modal } from "react-native";
import { useGetGuidesCategoriesQuery } from "../services/guidesService";
import back from "../../assets/icon/back.png";

const Guias = () => {
  const [requiredLevel, setRequiredLevel] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigation = useNavigation();

  const { data = [] } = useGetGuidesCategoriesQuery();

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const { canAccessByLevel } = usePermisses();

  const handleLockedPress = (requiredLevel) => {
    setRequiredLevel(requiredLevel);
    setModalVisible(true);
  };
  const handleNavigateToPlans = () => {
    setModalVisible(false);
    navigation.navigate("UpdateMembresias");
  };

  return (
    <ScrollView style={styles.container}   showsVerticalScrollIndicator={false}>
      <CustomHeader onMenuPress={toggleMenu} />
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={back} style={styles.backIcon} />
      </Pressable>
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
      <View style={styles.view}>
        <Text style={styles.text}>
          Bienvenidas/os a las Guías de la Red de Apoyo Perinatal{"\n\n"}
          Criar, gestar y acompañar la vida no ocurre en un solo momento: es un
          proceso emocional, físico y vincular que comienza mucho antes del
          nacimiento y continúa a lo largo del tiempo.{"\n\n"}
          Desde la Red de Apoyo Perinatal, creamos estas guías para acompañarte
          de manera respetuosa, profesional y cercana en cada etapa del camino,
          {"\n\n"} brindándote herramientas concretas para cuidar el bienestar
          emocional de toda la familia.{"\n\n"}
          En esta sección de la app encontrarás guías pensadas para acompañarte
          en:
        </Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
        renderItem={({ item }) => {
          const canAccess = canAccessByLevel(item.requiredLevel);
          return (
            <GuidesComponent
              category={item}
              navigation={navigation}
              canAccess={canAccess}
              onPressLocked={handleLockedPress}
              description={item.description}
            />
          );
        }}
      />
    </ScrollView>
  );
};

export default Guias;

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
  backButton: {
    top: 10,
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
