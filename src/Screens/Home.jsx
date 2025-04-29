import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,

} from "react-native";
import fondoInicio from "../../assets/img/fondoInicio2.png";
import BotonTurnos from "../components/BotonTurnos";
import BotonTalleres from "../components/BotonTalleres";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../components/CustomHeader";
import { useState } from "react";
import MenuDesplegable from "../components/MenuDesplegable";
import ModalForm from "../components/ModalForm";



const Home = ({ visible }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(visible);
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation();
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const manejoTaller = () => {
    navigation.navigate("Talleres")
  }

const manejoTurnos = () =>{
  setModalVisible(!modalVisible)
}

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader onMenuPress={toggleMenu} />
      {isMenuVisible && <MenuDesplegable onClose={toggleMenu} visible={isMenuVisible} />}
      <View style={styles.container}>
        <ImageBackground source={fondoInicio} style={styles.background} >
          <Text style={styles.text}>
            Nadie es ajeno a gestar. Se gesta el bebé y la familia que nace con él
          </Text>
          <View style={styles.buttonContainer}>
            <BotonTurnos style={styles.button} title="TURNOS" onPress={manejoTurnos} />
            <ModalForm modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <BotonTalleres style={styles.button} title="TALLERES" onPress={manejoTaller} />
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>

  );
};



export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    resizeMode: "cover",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginRight: "50%",
    gap: 10,
  },
  text: {
    color: "#B78270",
    fontSize: 30,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 10,
    padding: 10,
    width: "50%",
    fontFamily: "Crafty",
    marginBottom: "10%",

  },

});