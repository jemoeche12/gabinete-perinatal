import React, { useState } from "react";
import {
  Modal,
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../services/userService";
import { useCrearCitaMutation } from "../services/citasService";
import { Picker } from "@react-native-picker/picker";
import { sendEmailFromClient } from "../services/emailService";

const diasDisponibles = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"];

const ModalForm = ({ modalVisible, setModalVisible }) => {
  let today = new Date();
  const [selectedDate, setSelectedDate] = useState(dayjs(today));
  const { email, localId } = useSelector((state) => state.auth.value);
  const { data: profileData, isLoading: profileLoading } =
    useGetProfileQuery(localId);

  const [telefono, setTelefono] = useState("");
  const [textConsulta, setTextConsulta] = useState("");
  const [diaSeleccionado, setDiaSeleccionado] = useState("LUNES");

  const name = profileData?.name || "";
  const lastName = profileData?.lastName || "";

  const [crearCita, { isLoading: isCrearCita }] = useCrearCitaMutation();

  const handleEnvioCita = async () => {
    if (!telefono.trim()) {
      Alert.alert("Error de Formulario", "Por favor, ingresa un número de teléfono válido.");
      return;
    }
    if (!textConsulta.trim()) {
      Alert.alert("Error de Formulario", "Por favor, describe tu consulta.");
      return;
    }

    const selectedDateForEmail = selectedDate.format("YYYY-MM-DD");

    try {
      await crearCita({
        userId: localId,
        name,
        lastName,
        email,
        telefono,
        consulta: textConsulta,
        diaSeleccionado,
        status: "pendiente",
        fechaSeleccionada: selectedDateForEmail,
        createdAt: new Date().toISOString(),
      }).unwrap();

      Alert.alert("Éxito", "Su solicitud de cita ha sido enviada con éxito.");
      setSelectedDate(dayjs(today));
      setTelefono("");
      setTextConsulta("");
      setModalVisible(false);

      await sendEmailFromClient({
        to: [{ email, name: name || "Nuevo Usuario" }],
        subject: "Su solicitud ha sido registrada con éxito",
        htmlContent: `
          <p>Hola ${name || "bienvenido"},</p>
          <p>¡Gracias por solicitar un contacto en la Red Perinatal Digital!</p>
          <p>Recuerda que tu día de preferencia para el llamado es: <strong>${diaSeleccionado}</strong></p>
          <p>Cualquier consulta no dudes en ponerte en contacto con el equipo de Red Perinatal Digital</p>
        `,
      });

      const emailPsicologa = "florenciavelascopsi@hotmail.com";
      const emailSecretario = "jemoeche@gmail.com";

      await sendEmailFromClient({
        to: [
          { email: emailPsicologa },
          { email: emailSecretario },
        ],
        subject: "Nueva solicitud registrada",
        htmlContent: `
          <p>Hola, hemos recibido una solicitud de contacto a nombre de ${name} ${lastName}</p>
          <p>Día preferido de contacto: <strong>${diaSeleccionado}</strong></p>
          <p>Por favor, agendar en el libro de contactos</p>
        `,
      });
    } catch (err) {
      const errorMessage =
        err?.data?.message || err?.message || "Error desconocido al solicitar la cita.";
      Alert.alert("Error al Enviar Solicitud", errorMessage);
    }
  };

  return (
    <Modal visible={modalVisible} animationType="slide">
      <ScrollView contentContainerStyle={styles.modalContainer}>
        <Text style={styles.modalTitle}>Formulario</Text>

        {profileLoading ? (
          <Text style={styles.loadingText}>Cargando datos de perfil...</Text>
        ) : (
          <>
            <TextInput style={styles.input} value={name} editable={false} />
            <TextInput style={styles.input} value={lastName} editable={false} />
            <Text style={styles.label}>Email (Nos contactaremos a este mail):</Text>
            <TextInput style={styles.input} keyboardType="email-address" value={email} editable={false} />
          </>
        )}

        <Text style={styles.label}>Teléfono:</Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
          placeholder="Tu número de teléfono"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Día de preferencia para el contacto:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={diaSeleccionado} onValueChange={setDiaSeleccionado} style={styles.picker}>
            {diasDisponibles.map((dia) => (
              <Picker.Item key={dia} label={dia} value={dia} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Consulta:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          value={textConsulta}
          onChangeText={setTextConsulta}
          numberOfLines={10}
          placeholder="Contanos lo que necesitás, te leemos con atención"
          placeholderTextColor="#999"
        />

        <Pressable style={styles.button} onPress={handleEnvioCita} disabled={isCrearCita || profileLoading}>
          <Text style={styles.buttonText}>{isCrearCita ? "Enviando Solicitud..." : "Solicitar"}</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.closeButton]} onPress={() => setModalVisible(false)}>
          <Text style={styles.buttonText}>Cerrar</Text>
        </Pressable>
      </ScrollView>
    </Modal>
  );
};

export default ModalForm;

const styles = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8EDE3",
    padding: 20,
  },
  modalTitle: {
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
    marginBottom: 5,
    width: "90%",
    textAlign: "left",
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
    width: "90%",
  },
  textArea: {
    height: 150,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: 10,
    width: "90%",
    height: 50,
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: 50,
    fontFamily: "Roboto400",
  },
  button: {
    backgroundColor: "#B78270",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Roboto400",
  },
  closeButton: {
    backgroundColor: "#6c757d",
    marginTop: 10,
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
    fontFamily: "Roboto400",
    marginBottom: 10,
  },
});
