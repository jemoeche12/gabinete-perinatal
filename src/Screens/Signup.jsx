import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import InputForm from '../components/InputForm';
import SubmitButton from '../components/SubmitButton';
import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../services/authService';
import { setUser } from '../features/user/UserSlice';

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const dispatch = useDispatch()

  const [triggerSignUp, result] = useSignUpMutation()

  useEffect(() => {
    if (result.isSuccess) {
        dispatch(setUser({
            user: { 
                email: result.data.email,
                name: name,      
                lastname: lastName  
            },
            idToken: result.data.idToken,
            localId: result.data.localId  
        }));
    }
}, [result]);


  const onSubmit = () => {
    try {
      setErrorMail("")
      setErrorPassword("")
      triggerSignUp({ email, password, returnSecureToken: true })
    } catch (err) {
      switch (err.path) {
        case "email":
          setErrorMail(err)
          break;
        case "password":
          setErrorPassword(err)
          break;
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Registro</Text>
        <InputForm  label={"Nombre"} onChange={setName} />
        <InputForm  label={"Apellido"} onChange={setLastName} />
        <InputForm  label={"Email"} onChange={setEmail} error={errorMail} />
        <InputForm 
          label={"Contraseña"}
          onChange={setPassword}
          error={errorPassword}
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title="Enviar" />
        <Text style={styles.sub}>¿Ya tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.subLink}>Iniciar Sesion</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8EDE3',
  },
  form: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    color: '#B78270',
    fontSize: 30,
    marginBottom: 20,
    fontFamily: 'Crafty',
  },
  
  sub: {
    color: '#555',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  subLink: {
    color: '#B78270',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default Signup;