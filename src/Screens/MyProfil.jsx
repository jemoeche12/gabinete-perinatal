import { StyleSheet, Image, View, Text } from "react-native";
import AddButton from "../components/AddButton";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileImageQuery } from "../services/recursosService";
import { useDB } from "../hooks/useDB";
import { clearUser } from "../features/user/UserSlice";
import Card from "../components/Card";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useGetProfileQuery } from "../services/userService";

const MyProfil = ({ navigation }) => {
  const { imageCamera, localId, user } = useSelector(
    (state) => state.auth.value
  );

  const { data: imageFromBase } = useGetProfileImageQuery(localId);
  const { truncateSessionTable } = useDB();
  const { data: profileDate, isLoading, isError } = useGetProfileQuery(localId);
  const dispatch = useDispatch();
  const name = profileDate?.name || "";
  const lastName = profileDate?.lastName || "";
  const email = user || "";

  const tomarImagen = () => {
    navigation.navigate("ImagenSeleccionada");
  };
  const cerrarSesion = async () => {
    try {
      const response = await truncateSessionTable();
      dispatch(clearUser());
    } catch (error) {
      alert(error);
    }
  };

  const imageProfileDefault = "../../assets/img/imageProfile2.png";
  if (isLoading) {
    return (
      <View>
        <Text>Por favor espere</Text>
      </View>
    );
  }
  if (isError) {
    return (
      <View>
        <Text>Disculpe en este momento tenemos un error</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Card>
          <View>
            <View style={styles.imageContainer}>
              {imageFromBase || imageCamera ? (
                <Image
                  source={{ uri: imageFromBase?.image || imageCamera }}
                  style={styles.imageProfile}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={require(imageProfileDefault)}
                  style={styles.imageProfile}
                  resizeMode="cover"
                />
              )}
            </View>
            <Text style={styles.Nombre}>Nombre: {name}</Text>
            <Text style={styles.Nombre}>Apellido: {lastName}</Text>
          </View>
          <View style={styles.cardContent}>
            <Feather name="phone-call" size={24} color="black" />
            <Text style={styles.textCard}> +33 777989701</Text>
          </View>
          <View style={styles.cardContent}>
            <Fontisto name="email" size={24} color="black" />
            <Text style={styles.textCard}> {email}</Text>
          </View>
        </Card>
      </View>
      <AddButton onPress={tomarImagen} title="Agregar Imagen" />
      <AddButton onPress={cerrarSesion} title="Cerrar Sesion" />
      <Image
        style={styles.imagen}
        source={require("../../assets/IconApp7.png")}
        resizeMode="cover"
      />
    </View>
  );
};

export default MyProfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F8EDE3",
  },
  card: {
    width: "95%",
    marginTop: 55,
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
    marginVertical: 10,
    paddingHorizontal: 8,
    gap: 12,
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: "black",
    borderRadius: "50%",
    padding: 5,
    marginTop: 10,
    marginBottom: 20,
    width: 110,
    height: 110,
    alignItems: "center",
    marginHorizontal: "auto",
  },
  imageProfile: {
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: "cover",
  },
  Nombre: {
    fontSize: 18,
    fontFamily: "Crafty",
    color: "black",
    margin: 10,
  },
  textCard: {
    fontSize: 18,
    fontFamily: "Crafty",
    color: "black",
  },
  imagen: {
    marginTop: -70,
    height: 300,
    width: 300,
    alignItems: "center",
  },
});
