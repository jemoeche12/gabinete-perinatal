import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { setGuideSelectedId } from "../features/guides/GuidesSlice";

const GuideItem = ({ guide, navigation }) => {
  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(setGuideSelectedId(guide.id));
    navigation.navigate("GuidesDetailScreen", { guide: guide });
  };
  return (
    <Card style={styles.container}>
      <Pressable style={[styles.productItem, { backgroundColor: guide.color }]} onPress={handleNavigate}>
        <Text style={styles.productTextCategorie}>
          Categoria: {guide.categories}
        </Text>
        <Text style={styles.productTextTitle}>
          Titulo: {guide.title}
        </Text>
        <Text style={styles.productText}>Descripcion: {guide.description}</Text>
      </Pressable>
    </Card>
  );
};

export default GuideItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8EDE3",
    padding: 10,

  },
  productItem: {
    backgroundColor: "#DEC3B2",
    padding: 15,
    marginVertical: 12,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
  },
  productTextCategorie: {
    fontSize: 18,
    color: "black",
    textAlign: "left",
    marginVertical: 16,
    lineHeight: 26,
    
},
productTextTitle: {
    fontSize: 18,
    color: "black",
    fontFamily: "Roboto400",
    marginVertical: 16,
    textAlign: "left",
    fontWeight: "bold",
},
productText: {
    fontSize: 18,
    color: "black",
    fontFamily: "Roboto400",
    marginVertical: 16,
    textAlign: "left",
},
});
