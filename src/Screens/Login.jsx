import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import InputForm from "../components/InputForm";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "../services/authService";
import { setUser } from "../features/user/UserSlice";
import SubmitButton from "../components/SubmitButton";
import { useDB } from "../hooks/useDB";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const dispatch = useDispatch()
  const {insertSession} = useDB()

  const [triggerSignIn, result] = useSignInMutation()

  useEffect(() => {
    if (result?.data && result.isSuccess) {
      (async() =>{
        try{
          const response = await insertSession({
            email: result.data.email,
            localId: result.data.localId,
            token: result.data.idToken
          })
        }catch(error){
          alert(error)
        }
      })()
      dispatch(setUser({
        email: result.data.email,
        localId: result.data.localId,
        idToken: result.data.idToken,

      }))

    }
  }, [result])

  const onSubmit = () => {
    triggerSignIn({ email, password })
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Bienvenida/o</Text>
        <InputForm label={"Email"} onChange={setEmail} error={errorMail} />
        <InputForm label={"Contraseña"} onChange={setPassword} error={errorPassword} isSecure={true} placeholder={"Mínimo 6 caracteres"}
        />
        <SubmitButton onPress={onSubmit} title="Iniciar Sesion" />
        <Pressable style={styles.button} onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </Pressable>
      </View>
    </View >
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