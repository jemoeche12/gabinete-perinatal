import { StyleSheet, Text, View, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import Card from "../components/Card";


const CardPsicologos = ({ psicologo }) => {
    const { nombre, apellido, telefono, email } = psicologo;
  return (
    <View style={styles.card}>
      <Card>
        <View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} />
          </View>
          <Text style={styles.Nombre}>Nombre: {nombre}</Text>
          <Text style={styles.Nombre}>Apellido: {apellido}</Text>
        </View>
        <View style={styles.cardContent}>
          <Feather name="phone-call" size={24} color="black" />
          <Text style={styles.textCard}> {telefono}</Text>
        </View>
        <View style={styles.cardContent}>
          <Fontisto name="email" size={24} color="black" />
          <Text style={styles.textCard}> {email}</Text>
        </View>
      </Card>
    </View>
  );
};

export default CardPsicologos;

const styles = StyleSheet.create({
    card: {
    width: "100%",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 15,
    paddingHorizontal: 8,
    gap: 12,
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 100, 
    padding: 5,
    marginTop: 10,
    marginBottom: 30,
    width: 150,
    height: 150,
    alignItems: "center",
    marginHorizontal: "auto",
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    resizeMode: "cover",
  },
  Nombre: {
    fontSize: 18,
    fontFamily: "Roboto400",
    color: "black",
    margin: 10,
  },
  textCard: {
    fontSize: 18,
    fontFamily: "Roboto400",
    color: "black",
  },
});
