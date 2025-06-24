import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Picker } from "@react-native-picker/picker";
import Card from "../components/Card";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import { useGetProfileQuery } from "../services/userService";
import { useSelector } from "react-redux";

const ContactoScreen = ({ visible }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [motivo, setMotivo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [quiereContacto, setQuiereContacto] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(visible)
  const {user, localId} = useSelector((state) => state.auth.value)
  const {data: profileDate} = useGetProfileQuery(localId)

  const name = profileDate.name || "";

  const handleSubmit = () => {
    const dataForm = {
      nombre: name || nombre,
      correo: user || correo,
      motivo,
      mensaje,
      quiereContacto,
    };
    Alert.alert(
      "¡Gracias por escribirnos!",
      "Tu mensaje fue enviado con éxito. Nos pondremos en contacto a la brevedad."
    );

    setNombre("");
    setCorreo("");
    setMotivo("");
    setMensaje("");
    setQuiereContacto(null);

  };
  const toggleMenu = () => {

    setIsMenuVisible(!isMenuVisible);
  }

  return (
    <>
      <CustomHeader onMenuPress={toggleMenu} />
      {isMenuVisible && <MenuDesplegable visible={isMenuVisible} onClose={toggleMenu} />}
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Card >
            <View>
              <View style={styles.imageContainer}>
                <Image style={styles.image} />
              </View>
              <Text style={styles.Nombre}>Nombre:      Maria Florencia</Text>
              <Text style={styles.Nombre}>Apellido:      Velasco</Text>
            </View>
            <View style={styles.cardContent}>
              <Feather name="phone-call" size={24} color="black" />
              <Text style={styles.textCard}> +33 777989701</Text>
            </View>
            <View style={styles.cardContent}>
              <Fontisto name="email" size={24} color="black" />
              <Text style={styles.textCard}> florenciavelascopsi@hotmail.com</Text>
            </View>
          </Card>
        </View>
        <View style={styles.form}>
          <Text style={styles.title}>Formulario de contacto</Text>
          <TextInput
            label={"Nombre Completo:"}
            style={styles.input}
            placeholder="Escribí tu nombre"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setNombre}
          />
          <Text style={styles.note}>(Nos contactaremos a este mail)</Text>
          <TextInput
            label={"Correo electrónico:"}
            onChangeText={setCorreo}
            style={styles.input}
            placeholder="example@mail.com"
            placeholderTextColor="#999"
            value={user}
            keyboardType="email-address"
          />
          <Text style={styles.label}>Motivo de contacto:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={motivo}
              onValueChange={(itemValue) => setMotivo(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccioná un motivo..." value="" />
              <Picker.Item label="Consulta general sobre la app" value="consulta" />
              <Picker.Item label="Necesito orientación emocional" value="orientacion" />
              <Picker.Item label="Problemas técnicos o errores" value="tecnico" />
              <Picker.Item label="Sugerencia o mejora" value="sugerencia" />
              <Picker.Item label="Otro" value="otro" />
            </Picker>
          </View>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            placeholder="Contanos lo que necesitás, te leemos con atención"
            placeholderTextColor="#999"
            value={mensaje}
            onChangeText={setMensaje}
          />
          <Text style={styles.label}>¿Querés que te contacte un profesional del equipo?</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setQuiereContacto(true)}
            >
              <View style={[styles.radioCircle, quiereContacto === true && styles.radioSelected]} />
              <Text style={styles.radioLabel}>Sí</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setQuiereContacto(false)}
            >
              <View style={[styles.radioCircle, quiereContacto === false && styles.radioSelected]} />
              <Text style={styles.radioLabel}>No por ahora</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Enviar mensaje</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

export default ContactoScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8EDE3",
    paddingVertical: 30,
  },
  card: {
    width: "95%",
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
    borderRadius: "50%",
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
  form: {
    width: "90%",
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
  label: {
    fontSize: 18,
    color: "#333",
    fontFamily: "Crafty",
    marginTop: 10,
  },
  note: {
    fontSize: 14,
    color: "#777",
    fontStyle: "italic",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    fontFamily: "Crafty",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#B78270",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  radioSelected: {
    backgroundColor: "#B78270",
  },
  radioLabel: {
    fontSize: 16,
    fontFamily: "Crafty",
    color: "#333",
  },
  button: {
    backgroundColor: "#B78270",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Crafty",
  },
});
