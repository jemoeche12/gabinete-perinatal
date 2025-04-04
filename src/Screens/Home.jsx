import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,

} from "react-native";
import fondoInicio from "../../assets/img/fondoInicio2.png";
import BotonTurnos from "../components/BotonTurnos";
import BotonTalleres from "../components/BotonTalleres";
import { useNavigation } from "@react-navigation/native";



const Home = ({ navigation }) => {

  const manejoTaller = () => {
    navigation.navigate("Talleres")
  }
 

  return (
    <View style={styles.container}>
      <ImageBackground source={fondoInicio} style={styles.background} >
        <Text style={styles.text}>
          Nadie es ajeno a gestar. Se gesta el bebé y la familia que nace con él
        </Text>
      <BotonTalleres style={styles.button} title="TALLERES" onPress={manejoTaller} />
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
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
  text: {
    color: "#B78270",
    fontSize: 30,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 10,
    padding: 10,
    width: "50%",
    fontFamily: "Crafty",
    marginBottom: "35%",

  },

});