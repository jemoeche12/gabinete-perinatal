import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useDispatch } from "react-redux";
import { useSignUpMutation } from "../services/authService";
import { setUser } from "../features/user/UserSlice";
import { useDBContext } from "../context/DBContext"; 
import { sendEmailFromClient } from "../services/emailService";
import { useUpdateUserProfileMutation } from "../services/userService";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const { insertSession, dbInitialized } = useDBContext();
  const dispatch = useDispatch();

  const [triggerSignUp, result] = useSignUpMutation();
  const [
    triggerUpdateProfile,
    { isLoading: profileLoading }
  ] = useUpdateUserProfileMutation();

  
  useEffect(() => {
    if (result.isSuccess && result.data) {
      const { localId, email, idToken } = result.data;

      (async () => {
        try {
          if (!dbInitialized) {
            Alert.alert("Error de DB", "La base de datos no está lista para guardar la sesión. Por favor, inténtelo de nuevo.");
            return; 
          }

          await insertSession({ email, localId, token: idToken });
          await triggerUpdateProfile({ localId, name, lastName, email }).unwrap();
          dispatch(
            setUser({ email, idToken, localId, name, lastName })
          );
          await sendEmailFromClient({
            to: [{ email, name: name || "Nuevo Usuario" }],
            subject: "Bienvenido a la Red Perinatal Digital",
            htmlContent: `
              <p>Hola ${name || "bienvenido"},</p>
              <p>¡Gracias por registrarte en la Red Perinatal Digital! Estamos encantados de tenerte con nosotros.</p>
              <p>Esperamos que disfrutes de tu experiencia.</p>
              <p>Saludos cordiales,<br>El equipo de Red Perinatal Digital</p>
            `,
          });
          navigation.navigate("HomePrincipal");
        } catch (error) {
          Alert.alert(
            "Error en el registro",
            error.message || "Error inesperado en el registro."
          );
        }
      })();
    }

    if (result.isError) {
      const errorData = result.error?.data?.error || result.error;
      Alert.alert(
        "Error en el registro",
        errorData.message || "Ocurrió un error. Intenta de nuevo."
      );

      if (
        errorData.path === "email" ||
        errorData.message?.includes("EMAIL_EXISTS")
      ) {
        setErrorMail(errorData.message || "Email inválido o ya en uso.");
      } else if (
        errorData.path === "password" ||
        errorData.message?.includes("WEAK_PASSWORD")
      ) {
        setErrorPassword(
          errorData.message ||
          "Contraseña débil o inválida (mínimo 6 caracteres)."
        );
      } else {
        setErrorMail(
          errorData.message ||
          "Error inesperado. Por favor, intenta de nuevo."
        );
      }

      setPassword("");
    }
  }, [result, insertSession, dispatch, triggerUpdateProfile, navigation, name, lastName, dbInitialized]); // Agrega dbInitialized

  const onSubmit = () => {
    setErrorMail("");
    setErrorPassword("");
    if (!name || !lastName || !email || !password) {
      Alert.alert(
        "Campos incompletos",
        "Por favor, completa todos los campos."
      );
      return;
    }
    triggerSignUp({ email, password, returnSecureToken: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Registro</Text>
        <InputForm label="Nombre" value={name} onChangeText={setName} />
        <InputForm label="Apellido" value={lastName} onChangeText={setLastName} />
        <InputForm label="Email" value={email} onChangeText={setEmail} error={errorMail} />
        <InputForm
          label="Contraseña"
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChangeText={setPassword}
          error={errorPassword}
          isSecure={true}
        />
        <SubmitButton
          onPress={onSubmit}
          title={result.isLoading || profileLoading ? "" : "Enviar"}
          disabled={result.isLoading || profileLoading || !dbInitialized} // Deshabilita si la DB no está lista
        >
          {(result.isLoading || profileLoading) ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontSize: 18 }}>Enviar</Text>
          )}
        </SubmitButton>
        <Text style={styles.sub}>¿Ya tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.subLink}>Iniciar Sesión</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Signup;



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
    color: "#B78270",
    fontSize: 30,
    marginBottom: 20,
    // fontFamily: "Crafty",
  },
  sub: {
    color: "#555",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  subLink: {
    color: "#B78270",
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
