import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { setIdSelected } from "../features/recursos/InformacionSlice";

const ProductItem = ({ navigation, product }) => {
  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(setIdSelected(product.title));
    navigation.navigate("Detail", { productId: product.id });
  };

  return (
    <Card>
      <Pressable style={[styles.container, {backgroundColor: product.color}]}   onPress={handleNavigate}>
        <Text style={styles.title}>{product.title}</Text>
      </Pressable>
    </Card>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DEC3B2",
  },
  title: {
    fontFamily: "Roboto400",
  },
});
