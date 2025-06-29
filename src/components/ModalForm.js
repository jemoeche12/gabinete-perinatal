import React, { useState, useEffect, useRef } from "react";
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
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../services/userService";
import {
  useCrearCitaMutation,
  useGetTodasLasCitasQuery,
} from "../services/citasService";
import { Picker } from "@react-native-picker/picker";
import { sendEmailFromClient } from "../services/emailService";

const horariosDisponibles = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
];

const ModalForm = ({ modalVisible, setModalVisible }) => {
  let today = new Date();
  const [selectedDate, setSelectedDate] = useState(dayjs(today));
  const { user, localId } = useSelector((state) => state.auth.value);
  const { data: profileData, isLoading: profileLoading } =
    useGetProfileQuery(localId);
  const [telefono, setTelefono] = useState("");
  const [textConsulta, setTextConsulta] = useState("");

  const [horarioFiltrado, setHorarioFiltrado] = useState(horariosDisponibles);
  const [horarioELegido, setHorarioElegido] = useState(null);

  const name = profileData?.name || "";
  const lastName = profileData?.lastName || "";
  const email = user || "";

  const [crearCita, { isLoading: isCrearCita, error: createCitaError }] =
    useCrearCitaMutation();

  const { data: todasLasCitas = [], isLoading: todasLasCitasLoading } =
    useGetTodasLasCitasQuery();

  const citasParafecha = todasLasCitas.filter(
    (cita) => cita.fechaSeleccionada === selectedDate.format("YYYY-MM-DD")
  );

  useEffect(() => {
    if (!todasLasCitasLoading) {
      const horarioOcupado = citasParafecha.map((cita) => cita.horarioELegido);

      const nuevosHorariosDisponibles = horariosDisponibles.filter(
        (horario) => !horarioOcupado.includes(horario)
      );

      const areHorariosEqual =
        nuevosHorariosDisponibles.length === horarioFiltrado.length &&
        nuevosHorariosDisponibles.every(
          (horario, index) => horario === horarioFiltrado[index]
        );

      if (!areHorariosEqual) {
        setHorarioFiltrado(nuevosHorariosDisponibles);
      }

      let nuevoHorarioElegido = null;
      if (nuevosHorariosDisponibles.length > 0) {
        if (!nuevosHorariosDisponibles.includes(horarioELegido)) {
          nuevoHorarioElegido = nuevosHorariosDisponibles[0];
        } else {
          nuevoHorarioElegido = horarioELegido;
        }
      } else {
        nuevoHorarioElegido = null;
      }

      if (nuevoHorarioElegido !== horarioELegido) {
        setHorarioElegido(nuevoHorarioElegido);
      }
    }
  }, [selectedDate, citasParafecha, todasLasCitasLoading, horarioELegido]);

  const handleEnvioCita = async () => {
    if (!telefono.trim()) {
      Alert.alert(
        "Error de Formulario",
        "Por favor, ingresa un número de teléfono válido."
      );
      return;
    }
    if (!textConsulta.trim()) {
      Alert.alert("Error de Formulario", "Por favor, describe tu consulta.");
      return;
    }
    if (horarioELegido === null) {
      Alert.alert(
        "Error de Formulario",
        "Por favor, selecciona un horario disponible."
      );
      return;
    }

    const selectedDateForEmail = selectedDate.format("YYYY-MM-DD")

    try {
      const result = await crearCita({
        userId: localId,
        name,
        lastName,
        email,
        telefono: telefono,
        consulta: textConsulta,
        fechaSeleccionada: selectedDate.format("YYYY-MM-DD"),
        horarioELegido: horarioELegido,
        createdAt: dayjs().toISOString(),
        status: "pendiente",
      }).unwrap();

      Alert.alert("Éxito", "Su solicitud de cita ha sido enviada con éxito.");
      setSelectedDate(dayjs(today));
      setTelefono("");
      setTextConsulta("");
      setModalVisible(false);
      await sendEmailFromClient({
        to: [{ email, name: name || "Nuevo Usuario" }],
        subject: "Su Cita ha sido registrada con exito",
        htmlContent: `
                    <p>Hola ${name || "bienvenido"},</p>
                    <p>¡Gracias por solicitar una cita en la Red Perinatal Digital!</p>
                    <p>Recuerda que tu cita es el dia: ${selectedDateForEmail}</p>
                    <p>A las ${horarioELegido}</p>
                    <p>Cualquier consulta no dude en ponerse en contacto con el equipo de Red Perinatal Digital</p>
                  `,
      });

      const emailPsicologa = "florenciavelascopsi@hotmail.com";
      const emailSecretario = "jemoeche@gmail.com"

      setModalVisible(false);
      await sendEmailFromClient({
        to: [{ email: emailPsicologa , email: emailSecretario }],
        subject: "Reserva de  Cita registrada con exito",
        htmlContent: `
                    <p>Hola hemos recibido una reserva de cita a nombre de ${name} ${lastName}</p>
                    <p>Recuerda que su cita es el dia: ${selectedDateForEmail}</p>
                    <p>A las ${horarioELegido}</p>
                    <p>Agendar en el libro de citas</p>
                  `,
      });
    } catch (err) {
      const errorMessage =
        err?.data?.message ||
        err?.message ||
        "Error desconocido al solicitar la cita.";
      Alert.alert("Error al Enviar Cita", errorMessage);
    }
  };

  return (
    <Modal visible={modalVisible} animationType="slide">
      <ScrollView contentContainerStyle={styles.modalContainer}>
        <Text style={styles.modalTitle}>Formulario de Cita</Text>

        {profileLoading ? (
          <Text style={styles.loadingText}>Cargando datos de perfil...</Text>
        ) : (
          <>
            <TextInput style={styles.input} value={name} editable={false} />
            <TextInput style={styles.input} value={lastName} editable={false} />
            <Text style={styles.label}>
              Email (Nos contactaremos a este mail):
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              value={email}
              editable={false}
            />
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
        <View style={styles.containerCalendar}>
          <Text style={styles.textCalendar}>Fecha de la Cita</Text>
          <DateTimePicker
            styles={{
              today: {
                borderColor: "#B78270",
                borderWidth: 2,
                borderRadius: 10,
              },
              selected: { backgroundColor: "#B78270", borderRadius: 10 },
              selected_label: { color: "white" },
            }}
            locale="es"
            calendar="gregory"
            mode="single"
            date={selectedDate}
            onChange={({ date }) => setSelectedDate(dayjs(date))}
            minDate={today}
            disabledDates={(date) => [0, 6].includes(dayjs(date).day())}
          />
          <Text style={styles.textCalendar}>Horario de la Cita</Text>
          <View style={styles.pickerContainer}>
            {todasLasCitasLoading ? (
              <Text style={styles.loadingText}>Cargando horarios...</Text>
            ) : horarioFiltrado.length > 0 ? (
              <Picker
                style={styles.picker}
                selectedValue={horarioELegido}
                onValueChange={(itemValue, itemIndex) =>
                  setHorarioElegido(itemValue)
                }
              >
                {horarioFiltrado.map((horario, index) => (
                  <Picker.Item
                    key={horario}
                    label={horario}
                    value={horario}
                  ></Picker.Item>
                ))}
              </Picker>
            ) : (
              <Text style={styles.noHorariosText}>
                No hay horarios disponibles para esta fecha.
              </Text>
            )}
          </View>
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
        <Pressable
          style={styles.button}
          onPress={handleEnvioCita}
          disabled={
            isCrearCita ||
            profileLoading ||
            todasLasCitasLoading ||
            horarioELegido === null
          }
        >
          <Text style={styles.buttonText}>
            {isCrearCita ? "Enviando Solicitud..." : "Solicitar Cita"}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.closeButton]}
          onPress={() => setModalVisible(false)}
        >
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
    fontFamily: "Crafty",
    backgroundColor: "#fff",
    marginBottom: 10,
    width: "90%",
  },
  containerCalendar: {
    marginVertical: 20,
    backgroundColor: "rgba(190, 153, 141, 0.85)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#B78270",
    shadowColor: "#B78270",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
    padding: 16,
    width: "90%",
  },
  textCalendar: {
    paddingBottom: 10,
    fontSize: 16,
    color: "#4E342E",
    fontWeight: "600",
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
    fontFamily: "Crafty",
  },
  pickerItem: {
    fontFamily: "Crafty",
    fontSize: 16,
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
    fontFamily: "Crafty",
  },
  closeButton: {
    backgroundColor: "#6c757d",
    marginTop: 10,
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
    fontFamily: "Crafty",
    marginBottom: 10,
  },
});
