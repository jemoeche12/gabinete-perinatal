import React, { useState, useEffect } from "react";
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
  useCrearAsesoriaMutation,
  useGetTodasLasAsesoriasQuery,
} from "../services/asesoriasService";
import { Picker } from "@react-native-picker/picker";
import { sendEmailFromClient } from "../services/emailService";

const horariosDisponibles = [
  "09:00 - 09:40",
  "10:00 - 10:40",
  "11:00 - 11:40",
  "14:00 - 14:40",
  "15:00 - 15:40",
  "16:00 - 16:40",
  "17:00 - 17:40",
  "18:00 - 18:40",
];

const ModalAsesoriaForm = ({ modalVisible, setModalVisible }) => {
  let today = new Date();
  const [selectedDate, setSelectedDate] = useState(dayjs(today));
  const { email, localId } = useSelector((state) => state.auth.value);
  const { data: profileData, isLoading: profileLoading } =
    useGetProfileQuery(localId);
  const [telefono, setTelefono] = useState("");
  const [textConsulta, setTextConsulta] = useState("");

  const [horarioFiltrado, setHorarioFiltrado] = useState(horariosDisponibles);
  const [horarioElegido, setHorarioElegido] = useState(null);

  const name = profileData?.name || "";
  const lastName = profileData?.lastName || "";

  const [crearAsesoria, { isLoading: isCrearAsesoria }] =
    useCrearAsesoriaMutation();

  const {
    data: todasLasAsesorias = [],
    isLoading: todasLasAsesoriasLoading,
  } = useGetTodasLasAsesoriasQuery();

  const asesoriasParaFecha = todasLasAsesorias.filter(
    (asesoria) =>
      asesoria.fechaSeleccionada === selectedDate.format("YYYY-MM-DD")
  );

  useEffect(() => {
    if (!todasLasAsesoriasLoading) {
      const horariosOcupados = asesoriasParaFecha.map(
        (asesoria) => asesoria.horarioElegido
      );

      const nuevosHorariosDisponibles = horariosDisponibles.filter(
        (horario) => !horariosOcupados.includes(horario)
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
        if (!nuevosHorariosDisponibles.includes(horarioElegido)) {
          nuevoHorarioElegido = nuevosHorariosDisponibles[0];
        } else {
          nuevoHorarioElegido = horarioElegido;
        }
      } else {
        nuevoHorarioElegido = null;
      }

      if (nuevoHorarioElegido !== horarioElegido) {
        setHorarioElegido(nuevoHorarioElegido);
      }
    }
  }, [selectedDate, asesoriasParaFecha, todasLasAsesoriasLoading, horarioElegido]);

  const handleEnvioAsesoria = async () => {
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
    if (horarioElegido === null) {
      Alert.alert(
        "Error de Formulario",
        "Por favor, selecciona un horario disponible."
      );
      return;
    }

    const selectedDateForEmail = selectedDate.format("YYYY-MM-DD");

    try {
      const result = await crearAsesoria({
        userId: localId,
        name,
        lastName,
        email,
        telefono: telefono,
        consulta: textConsulta,
        fechaSeleccionada: selectedDateForEmail,
        horarioElegido: horarioElegido,
        createdAt: dayjs().toISOString(),
        status: "pendiente",
      }).unwrap();

      Alert.alert(
        "Éxito",
        "Su solicitud de asesoría ha sido enviada con éxito."
      );
      setSelectedDate(dayjs(today));
      setTelefono("");
      setTextConsulta("");
      setModalVisible(false);

      await sendEmailFromClient({
        to: [{ email, name: name || "Usuario" }],
        subject: "Asesoría registrada con éxito",
        htmlContent: `
          <p>Hola ${name || "Usuario"},</p>
          <p>Tu solicitud de asesoría ha sido registrada para el <strong>${selectedDateForEmail}</strong> a las <strong>${horarioElegido}</strong>.</p>
          <p>Gracias por confiar en la Red Perinatal Digital.</p>
        `,
      });

      await sendEmailFromClient({
        to: [
          { email: "florenciavelascopsi@hotmail.com" },
          { email: "jemoeche@gmail.com" },
        ],
        subject: "Nueva asesoría agendada",
        htmlContent: `
          <p>Se ha registrado una nueva asesoría a nombre de ${name} ${lastName}.</p>
          <p>Fecha: ${selectedDateForEmail}</p>
          <p>Horario: ${horarioElegido}</p>
          <p>Por favor, agendar en el libro de asesorías.</p>
        `,
      });
    } catch (err) {
      const errorMessage =
        err?.data?.message ||
        err?.message ||
        "Error desconocido al solicitar la asesoría.";
      Alert.alert("Error al Enviar Asesoría", errorMessage);
    }
  };

  return (
    <Modal visible={modalVisible} animationType="slide">
      <ScrollView contentContainerStyle={styles.modalContainer}>
        <Text style={styles.modalTitle}>Formulario de Asesoría</Text>

        {profileLoading ? (
          <Text style={styles.loadingText}>Cargando datos de perfil...</Text>
        ) : (
          <>
            <TextInput style={styles.input} value={name} editable={false} />
            <TextInput style={styles.input} value={lastName} editable={false} />
            <Text style={styles.label}>Email:</Text>
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
          <Text style={styles.textCalendar}>Fecha:</Text>
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

          <Text style={styles.textCalendar}>Horario</Text>
          <View style={styles.pickerContainer}>
            {todasLasAsesoriasLoading ? (
              <Text style={styles.loadingText}>Cargando horarios...</Text>
            ) : horarioFiltrado.length > 0 ? (
              <Picker
                style={styles.picker}
                selectedValue={horarioElegido}
                onValueChange={setHorarioElegido}
              >
                {horarioFiltrado.map((horario) => (
                  <Picker.Item
                    key={horario}
                    label={horario}
                    value={horario}
                  />
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
          onPress={handleEnvioAsesoria}
          disabled={
            isCrearAsesoria ||
            profileLoading ||
            todasLasAsesoriasLoading ||
            horarioElegido === null
          }
        >
          <Text style={styles.buttonText}>
            {isCrearAsesoria ? "Enviando..." : "Solicitar Asesoría"}
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

export default ModalAsesoriaForm;

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
