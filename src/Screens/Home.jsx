import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  
} from "react-native";
import fondoInicio from "../../assets/img/fondoInicio.jpg";
import BotonTurnos from "../components/BotonTurnos";
import BotonTalleres from "../components/BotonTalleres";



const Home = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={fondoInicio} style={styles.background} resizeMode="cover">
        <Text style={styles.text}>
          Nadie es ajeno a gestar. Se gesta el bebé y la familia que nace con él.
        </Text>
        <BotonTurnos />
        <BotonTalleres />
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    heigth: "100%",
    justifyContent: "top",
    alignItems: "flex-start",
  },
  text: {
    fontFamily: "Roboto",
    color: "#B78270",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 150,
    marginLeft: 10,
    borderRadius: 10,
    padding: 10,
    width: "50%",
  },
});

export default Home;
