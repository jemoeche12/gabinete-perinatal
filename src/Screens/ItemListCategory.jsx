import {
  FlatList,
  StyleSheet,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import { useGetProductsByCategoryQuery } from "../services/recursosService";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import back from "../../assets/icon/back.png";

const ItemListCategory = ({ navigation, route, visible }) => {
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState("");
  const [productsFiltered, setProductFiltered] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(visible);

  const { category: categorySelected } = route.params;
  const {
    data: productsFetched = [],
    error: errorFetched,
    isLoading,
  } = useGetProductsByCategoryQuery(categorySelected.name);

  useEffect(() => {
    if (!isLoading) {
      const productFilter = productsFetched.filter((product) =>
        product.title.toLowerCase().includes(busqueda.toLowerCase()),
      );
      setProductFiltered(productFilter);
      setError("");
    }
  }, [busqueda, categorySelected, productsFetched, errorFetched]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <CustomHeader onMenuPress={toggleMenu} />
        <FlatList style={styles.container}
          data={productsFiltered}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <ProductItem product={item} navigation={navigation} />
            </View>
          )}
          keyExtractor={(product) => product.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View style={styles.view}>
              {isMenuVisible && (
                <MenuDesplegable onClose={toggleMenu} visible={isMenuVisible} />
              )}

              <Pressable
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Image source={back} style={styles.backIcon} />
              </Pressable>
            </View>
          }
        />
    </>
  );
};

export default ItemListCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8EDE3",
  },
  view: {
    paddingVertical: 20,
  },

  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  list: {
    flexGrow: 1,
  },
  productItem: {
    backgroundColor: "#DEC3B2",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
  },
  productText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    fontFamily: "Roboto",
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
