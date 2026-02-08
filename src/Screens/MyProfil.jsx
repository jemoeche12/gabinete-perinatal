import { StyleSheet, Image, View, Text, Alert } from "react-native";
import AddButton from "../components/AddButton";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileImageQuery } from "../services/recursosService";
import { useDBContext } from "../context/DBContext";
import { clearUser } from "../features/user/UserSlice";
import Card from "../components/Card";
import { useGetProfileQuery } from "../services/userService";
import addImg from "../../assets/icon/addImg.png";
import closeSession from "../../assets/icon/closeSession.png";
import { colors } from "../utils/customerStyle";

const MyProfil = ({ navigation }) => {
  const { imageCamera, localId, email } = useSelector(
    (state) => state.auth.value,
  );

  const { data: imageFromBase } = useGetProfileImageQuery(localId);
  const { truncateSessionTable, dbInitialized } = useDBContext();
  const { data: profileDate, isLoading, isError } = useGetProfileQuery(localId);
  const dispatch = useDispatch();
  const name = profileDate?.name || "";
  const lastName = profileDate?.lastName || "";

  const tomarImagen = () => {
    navigation.navigate("ImagenSeleccionada");
  };

  const cerrarSesion = async () => {
    try {
      if (!dbInitialized) {
        Alert.alert(
          "Error de DB",
          "La base de datos no está lista. Intente de nuevo.",
        );
        return;
      }

      await truncateSessionTable();
      dispatch(clearUser());
      Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
    } catch (error) {
      Alert.alert(
        "Error al cerrar sesión",
        error.message || "Error desconocido al cerrar sesión.",
      );
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
            <Text style={styles.Nombre}>Email: {email}</Text>
          </View>
        </Card>
      </View>
      <View style={styles.btnContainer}>
        <AddButton
          style={[styles.addButton, { backgroundColor: colors.btnPodcast }]}
          onPress={tomarImagen}
          title="Subir Imagen"
          iconSource={addImg}
        />
        <AddButton
          style={[styles.addButton, { backgroundColor: colors.btnAsesorias }]}
          onPress={cerrarSesion}
          title="Cerrar Sesion"
          iconSource={closeSession}
        />
      </View>
      <Image
        style={styles.imagen}
        source={require("../../assets/Red.png")}
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 20,
  },
  addButton: {
    marginVertical: 10,
    alignItems: "center",
    marginHorizontal: 10,
    width: 120,
    height: 100,
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
    fontFamily: "Roboto400",
    color: "black",
    margin: 10,
  },
  imagen: {
    marginTop: 8,
    marginHorizontal: "auto",
    height: 200,
    width: 200,
    alignItems: "center",
  },
});
