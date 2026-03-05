import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const PickerComponent = ({ motivo, setMotivo }) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={motivo}
        onValueChange={(itemValue) => setMotivo(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccioná un motivo..." value="" color="#000000" backgroundColor="white"/>
        <Picker.Item label="Consulta general sobre la app" value="consulta" color="#000000" backgroundColor="white"/>
        <Picker.Item
          label="Necesito orientación emocional"
          value="orientacion"
          color="#000000"
          backgroundColor="white" 
        />
        <Picker.Item label="Problemas técnicos o errores" value="tecnico" color="#000000" backgroundColor="white"/>
        <Picker.Item label="Sugerencia o mejora" value="sugerencia" color="#000000" backgroundColor="white"/>
        <Picker.Item label="Otro" value="otro" color="#000000" backgroundColor="white"/>
      </Picker>
    </View>
  );
};

export default PickerComponent;

const styles =  StyleSheet.create({
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
    fontFamily: "Roboto400",
    color: "#333",
  },
});
