import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useGetDueloByCategoryQuery } from "../services/DueloService";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import DueloItem from "../components/DueloItem";

const ItemListDuelo = ({ navigation, route }) => {
  const [busqueda, setBusqueda] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const { category } = route.params;

  const { data, isLoading, error } = useGetDueloByCategoryQuery(category.name);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  if (isLoading) return <View style={styles.container} />;

  return (
    <>
      <CustomHeader onMenuPress={toggleMenu} />
      {isMenuVisible && (
        <MenuDesplegable onClose={toggleMenu} visible={isMenuVisible} />
      )}
      <FlatList
        style={styles.container}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <DueloItem duelo={item} navigation={navigation} />
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </>
  );
};

export default ItemListDuelo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8EDE3",
  },
  list: {
    paddingBottom: 20,
  },
  productItem: {
    backgroundColor: "#DEC3B2",
    marginVertical: 8,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
  },
});