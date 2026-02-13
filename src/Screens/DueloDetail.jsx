import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { useGetDueloByIdQuery } from "../services/DueloService";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import { ScrollView, Pressable } from "react-native";
import iconImageLoading from "../../assets/Red.png";


const DueloDetail = ({route, navigation}) => {
  const { dueloId} = route.params || {};
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  

  const { data, isLoading, error } = useGetDueloByIdQuery(dueloId);

    

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  if (isLoading) {
    return (
      <View style={styles.containImageLoading}>
        <Image source={iconImageLoading} style={styles.iconImageLoading} />
      </View>
    );
  }
  

  return (
    <View style={styles.container}>
      <CustomHeader onMenuPress={toggleMenu} />
      {isMenuVisible && (
        <MenuDesplegable onClose={toggleMenu} visible={isMenuVisible} />
      )}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data ? (
          <ScrollView style={styles.content}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.description}>{data.description}</Text>
            <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
              <Text style={styles.btnText}>Volver</Text>
            </Pressable>
          </ScrollView>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default DueloDetail;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  },
   containImageLoading: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      height: "100%",
      width: "100%",
    },
    iconImageLoading: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: 250,
      height: 250,
      resizeMode: "contain",
    },
  title: {
    fontSize: 24,
    color: "white",
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",

  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "300",
    marginVertical: 30,
    fontFamily: 'Roboto400',
    lineHeight: 28,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.7)",

  }, 
  content: {
    flex: 1,
    width: "100%",
  },
  btn: {
    borderRadius: 10,
    backgroundColor: "#B78270",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
