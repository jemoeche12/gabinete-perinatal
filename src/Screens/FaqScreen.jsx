import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { FlatList } from "react-native";
import React, { useState } from "react";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import back from "../../assets/icon/back.png";
import { useNavigation } from "@react-navigation/native";
import preguntasFrecuentes from "../utils/Faqs";

const FaqItem = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <Pressable onPress={() => setOpen(!open)} style={styles.faqItem}>
      <Text style={styles.question}>{item.pregunta}</Text>
      {open && <Text style={styles.answer}>{item.respuesta}</Text>}
    </Pressable>
  );
};

const FaqScreen = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      <CustomHeader onMenuPress={() => setIsMenuVisible(!isMenuVisible)} />
      <MenuDesplegable
        onClose={() => setIsMenuVisible(false)}
        visible={isMenuVisible}
      />
      <FlatList
        data={preguntasFrecuentes}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <>
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Image source={back} style={styles.backIcon} />
            </Pressable>
            <Text style={styles.title}>Preguntas Frecuentes</Text>
          </>
        }
        renderItem={({ item }) => <FaqItem item={item} />}
      />
    </>
  );
};

export default FaqScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8EDE3",
    flexGrow: 1,
  },
  backButton: {
    top: 15,
    left: 15,
    marginBottom: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginVertical: 20,
    textAlign: "center",
    color: "#3A3A3A",
  },
  faqItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0D6CC",
    marginVertical: 8,
  },
  question: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3A3A3A",
  },
  answer: {
    marginTop: 15,
    fontSize: 15,
    lineHeight: 22,
    color: "black",
  },
});
