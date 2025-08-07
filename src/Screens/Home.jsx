import { Image, View, ImageBackground, StyleSheet } from "react-native";
import fondoInicio from "../../assets/fondos/fondo_APP.jpg";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../components/CustomHeader";
import { useState } from "react";
import MenuDesplegable from "../components/MenuDesplegable";
import ModalForm from "../components/ModalForm";
import logo from "../../assets/Red.png";
import AddButton from "../components/AddButton";
import { colors } from "../utils/customerStyle";
import podcast from "../../assets/icon/microphone.png";
import app from "../../assets/icon/instApp.png";
import asesoria from "../../assets/icon/asesoria.png";
import cita from "../../assets/icon/citaApp.png";
import talleres from "../../assets/icon/talleres.png";

const Home = ({ visible }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(visible);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const manejoTaller = () => {
    navigation.navigate("Talleres");
  };

  const manejoTurnos = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <ImageBackground source={fondoInicio} style={styles.background}>
      <View style={{ flex: 1 }}>
        <CustomHeader onMenuPress={toggleMenu} />
        {isMenuVisible && (
          <MenuDesplegable onClose={toggleMenu} visible={isMenuVisible} />
        )}
        <View style={styles.containerBtnLog}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.imgLog} resizeMode="contain" />
            <AddButton
              style={styles.btnInst}
              title="APP"
              onPress={() => navigation.navigate("InstructivoScreen")}
              iconSource={app}
              iconSize={42}
              color="black"
            />
          </View>
          <View style={styles.buttonContainer}>
            <View>
              <AddButton
                style={styles.btnAsesorias}
                title="ASESORIA"
                onPress={manejoTurnos}
                iconSize={42}
                iconSource={asesoria}
              />
            </View>
            <AddButton
              style={styles.btnTalleres}
              title="TALLERES"
              onPress={manejoTaller}
              iconSource={talleres}
            />
            <AddButton
              style={styles.btnPideTuCita}
              title="CITA"
              onPress={() => navigation.navigate("MiCita")}
              iconSource={cita}
            />
            <AddButton
              style={styles.btnPodcasts}
              title="PODCAST"
              onPress={() => navigation.navigate("PodcastScreen")}
              iconSource={podcast}
            />
          </View>
          <ModalForm
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    resizeMode: "cover",
  },
  containerBtnLog: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 20,
  },
  logoContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 30,
    alignItems: "flex-start",
    width: "50%",
  },
  imgLog: {
    width: 225,
    height: 225,
    marginBottom: 70,
    marginTop: -20,
  },
  btnInst: {
    backgroundColor: colors.btnGuia,
    marginLeft: 50
    
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "50%",
    marginBottom: 100,
    gap: 30,
  },
  btnAsesorias: {
    backgroundColor: colors.btnAsesorias,
  },
  btnTalleres: {
    backgroundColor: colors.btnTaller,
  },
  btnPideTuCita: {
    backgroundColor: colors.btnCita,
  },
  btnPodcasts: {
    backgroundColor: colors.btnPodcast,
  },
});
