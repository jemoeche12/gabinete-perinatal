import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../services/userService";
import { useCrearConsultaMutation } from "../services/consultasService";
import { sendEmailFromClient } from "../services/emailService";
import PickerComponent from "../components/PickerComponent";

const FormComponent = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [motivo, setMotivo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [quiereContacto, setQuiereContacto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const authState = useSelector((state) => state.auth.value);
  const { email, localId } = authState;

  const { data: profileDate } = useGetProfileQuery(localId);

  const [triggerCrearConsulta, { isLoading, isSuccess, isError }] =
    useCrearConsultaMutation();

  const name = profileDate?.name || "";

  const handleSubmit = async () => {
    try {
      const dataForm = {
        nombre: name || nombre,
        correo: email || correo,
        motivo,
        mensaje,
        quiereContacto,
      };

      let receptor = email || correo;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!receptor || !emailRegex.test(receptor)) {
        Alert.alert(
          "Error de Correo",
          "La dirección de correo electrónico del destinatario es inválida o está vacía. Por favor, verifica el email."
        );
        return;
      }

      await triggerCrearConsulta(dataForm).unwrap();
      Alert.alert(
        "¡Gracias por escribirnos!",
        "Tu mensaje fue enviado con éxito. Nos pondremos en contacto a la brevedad."
      );

      const emailPsico = "jemoeche@gmail.com";

      await sendEmailFromClient({
        to: [{ email: receptor, name: name || nombre, emailPsico: emailPsico }],
        subject: "Gracias por contactarte con Red Perinatal Digital",
        htmlContent: `Gracias por contactarte con Red Perinatal Digital ${name || nombre},
          <br><br>
          Si solicitaste que nos pongamos en contacto, lo haremos a la brevedad. Si lo que nos dejaste fue un comentario o sugerencia, te agradecemos por ayudarnos a mejorar.<br><br>
          Saludos,<br>
          El equipo de Red Perinatal Digital.
          `,
      });

      const emailEquipo = "florenciavelascopsi@hotmail.com";
      const emailSecretario = "jemoeche@gmail.com";

      await sendEmailFromClient({
        to: [{ email: emailEquipo }, { email: emailSecretario }],
        subject: "consulta recibida",
        htmlContent: `Has recibido una consulta a nombre de ${name},
            con la consulta: ${mensaje}, con el motivo: ${motivo}.
            quiere contacto: ${quiereContacto}
        `,
      });

      setNombre("");
      setCorreo("");
      setMotivo("");
      setMensaje("");
      setQuiereContacto(null);
     
    } catch (error) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Ocurrió un error inesperado al procesar tu solicitud.";
      console.error("Error al enviar el mensaje:", error);
      Alert.alert("Error de Envío", errorMessage);
    }
  };

  return (
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
        value={email || correo}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Motivo de contacto:</Text>
      <PickerComponent motivo={motivo} setMotivo={setMotivo} />
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
        placeholder="Contanos lo que necesitás, te leemos con atención"
        placeholderTextColor="#999"
        value={mensaje}
        onChangeText={setMensaje}
      />
      <Text style={styles.label}>
        ¿Querés que te contacte un profesional del equipo?
      </Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setQuiereContacto(true)}
        >
          <View
            style={[
              styles.radioCircle,
              quiereContacto === true && styles.radioSelected,
            ]}
          />
          <Text style={styles.radioLabel}>Sí</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setQuiereContacto(false)}
        >
          <View
            style={[
              styles.radioCircle,
              quiereContacto === false && styles.radioSelected,
            ]}
          />
          <Text style={styles.radioLabel}>No por ahora</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        disabled={isLoading}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Enviando..." : "Enviar Mensaje"}
        </Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default FormComponent;

const styles = StyleSheet.create({
  form: {
    width: "90%",
    marginHorizontal: "5%",
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
    fontFamily: "Roboto400",
    color: "#B78270",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    color: "#333",
    fontFamily: "Roboto400",
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
    fontFamily: "Roboto400",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
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
    fontFamily: "Roboto400",
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
    fontFamily: "Roboto400",
  },
});