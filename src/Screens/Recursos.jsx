import {
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  View,
  Text,
} from "react-native";
import React, { useState } from "react";
import CategoryItem from "../components/CategoryItem";
import { useGetCategoriesQuery } from "../services/recursosService";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import back from "../../assets/icon/back.png";

const Recursos = ({ navigation, visible, route }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(visible);
  const [modalVisible, setModalVisible] = useState(false);

  const { category } = route.params;

  const { data: categories = [] } = useGetCategoriesQuery(category.id);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <CustomHeader onMenuPress={toggleMenu} />

      {isMenuVisible && (
        <MenuDesplegable onClose={toggleMenu} visible={isMenuVisible} />
      )}

      <FlatList
        style={styles.container}
        showsVerticalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <CategoryItem
              category={item}
              navigation={navigation}
              canAccess={true}
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
    paddingVertical: 20,
  },
  text: {
    fontFamily: "Roboto400",
    width: "90%",
    marginHorizontal: "5%",
    fontSize: 24,
    paddingBottom: 20,
  },
  backButton: {
    left: 15,
    marginVertical: 7,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  list: {
    paddingVertical: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
