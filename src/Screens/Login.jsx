import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import InputForm from "../components/InputForm";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "../services/authService";
import { setUser } from "../features/user/UserSlice";
import SubmitButton from "../components/SubmitButton";
import { useDBContext } from "../context/DBContext";
import { useLazyGetProfileQuery } from "../services/userService";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();

  const dispatch = useDispatch();
  const { insertSession, dbInitialized } = useDBContext();

  const [triggerSignIn, result] = useSignInMutation();
  const [
    triggerGetProfile,
    { data: profileDate, isLoading: profileLoading, error: profileError },
  ] = useLazyGetProfileQuery();

  useEffect(() => {
    if (result?.data && result.isSuccess) {
      (async () => {
        try {
          if (!dbInitialized) {
            Alert.alert("Error de DB", "La base de datos no está lista. Intente de nuevo.");
            return;
          }

          await insertSession({
            email: result.data.email,
            localId: result.data.localId,
            token: result.data.idToken,
          });
        } catch (error) {
          Alert.alert("Error de Sesión", error.message || "Error al guardar la sesión.");
        }
        triggerGetProfile(result.data.localId);
      })();
    }
  }, [result, insertSession, triggerGetProfile, dbInitialized]);

  useEffect(() => {
    if (profileError) {
      Alert.alert("Disculpe, algo salió mal al cargar la información", JSON.stringify(profileError));
      return;
    }
    if (!profileLoading && profileDate && result.data) {
      dispatch(setUser({
        email: result.data.email,
        localId: result.data.localId,
        idToken: result.data.idToken,
        name: profileDate.name,
        lastName: profileDate.lastName
      }));
      navigation.navigate("HomePrincipal");
    }
  }, [profileDate, profileLoading, profileError, dispatch, result.data, navigation]);

  const onSubmit = () => {
    triggerSignIn({ email, password });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Bienvenida/o {profileDate?.name}</Text>
        <InputForm label={"Email"} onChangeText={setEmail} error={errorMail} />
        <InputForm
          style={styles.placeholder}
          label={"Contraseña"}
          onChangeText={setPassword}
          error={errorPassword}
          isSecure={true}
          placeholder={"Mínimo 6 caracteres"}
        />
        <SubmitButton onPress={onSubmit} title="Iniciar Sesion" />
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8EDE3",
  },
  form: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 30,
    fontFamily: "Crafty",
    color: "#B78270",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#B78270",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Crafty",
  },
  placeholder: {
    color: "black",
    fontSize: 18,
    fontFamily: "Crafty",
  },
});
