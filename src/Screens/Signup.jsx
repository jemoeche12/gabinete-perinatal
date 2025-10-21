import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useDispatch } from "react-redux";
import { useSignUpMutation } from "../services/authService";
import { setUser } from "../features/user/UserSlice";
import { useDBContext } from "../context/DBContext";
import { sendEmailFromClient } from "../services/emailService";
import { useUpdateUserProfileMutation } from "../services/userService";
import fondoSignUp from "../../assets/fondos/CONTACTO.jpg";
import Membresias from "./Membresias";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("basico");

  const { insertSession, dbInitialized } = useDBContext();
  const dispatch = useDispatch();

  const [triggerSignUp, result] = useSignUpMutation();
  const [triggerUpdateProfile, { isLoading: profileLoading }] =
    useUpdateUserProfileMutation();

  useEffect(() => {
    if (result.isSuccess && result.data) {
      const { localId, email: userEmail, idToken } = result.data;
      (async () => {
        try {
          if (!dbInitialized) {
            Alert.alert("Error de DB", "Base de datos no lista.");
            return;
          }

          await insertSession({ email: userEmail, localId, token: idToken, });

          await triggerUpdateProfile({
            localId,
            name,
            lastName,
            email: userEmail,
            membresia: selectedPlan,
          }).unwrap();

          dispatch(
            setUser({ email: userEmail, idToken, localId, name, lastName, role: "user", membresia: selectedPlan })
          );

          await sendEmailFromClient({
            to: [{ email: userEmail, name: name || "Nuevo Usuario" }],
            subject: "Bienvenido a la Red Perinatal Digital",
            htmlContent: `<p>Hola ${name || "bienvenido"},</p>
              <p>Gracias por registrarte en la Red Perinatal Digital.</p>
              <p>Tu plan seleccionado es <b>${selectedPlan}</b>.</p>`,
          });
        } catch (err) {
          Alert.alert(
            "Error en el registro",
            err.message || "Error inesperado."
          );
        }
      })();
    }

    if (result.isError) {
      const errorData = result.error?.data?.error || result.error;
      Alert.alert("Error", errorData.message || "Ocurrió un error.");
      if (errorData.message?.includes("EMAIL_EXISTS"))
        setErrorMail("Email ya en uso");
      if (errorData.message?.includes("WEAK_PASSWORD"))
        setErrorPassword("Contraseña débil");
      setPassword("");
    }
  }, [
    result,
    insertSession,
    dispatch,
    triggerUpdateProfile,
    name,
    lastName,
    dbInitialized,
    selectedPlan,
  ]);

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

  const handlePlanSelect = (planId) => setSelectedPlan(planId);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <ImageBackground
        source={fondoSignUp}
        style={styles.background}
        resizeMode="cover"
      >
        
          <Membresias onSelectPlan={handlePlanSelect} />
          <Text style={styles.header}>Crea tu cuenta</Text>
          <View style={styles.form}>
            <Text style={styles.title}>Registro</Text>

            <InputForm label="Nombre" value={name} onChangeText={setName} />
            <InputForm
              label="Apellido"
              value={lastName}
              onChangeText={setLastName}
            />
            <InputForm
              label="Email"
              value={email}
              onChangeText={setEmail}
              error={errorMail}
            />
            <InputForm
              label="Contraseña"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChangeText={setPassword}
              error={errorPassword}
              isSecure
            />

            <SubmitButton
              onPress={onSubmit}
              disabled={result.isLoading || profileLoading || !dbInitialized}
            >
              {result.isLoading || profileLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={{ color: "#fff", fontSize: 18 }}>Registrarme</Text>
              )}
            </SubmitButton>

            <Text style={styles.sub}>¿Ya tienes una cuenta?</Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.subLink}>Iniciar Sesión</Text>
            </Pressable>
          </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
 
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#B78270",
    marginTop: 40,
    marginBottom: 10,
    textAlign: "center",
  },
  form: {
    width: "92%",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    marginHorizontal: "4%",
    marginVertical: 40,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    color: "#B78270",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  sub: {
    color: "#555",
    textAlign: "center",
    marginTop: 10,
  },
  subLink: {
    color: "#B78270",
    textAlign: "center",
    marginTop: 4,
    textDecorationLine: "underline",
  },
});
