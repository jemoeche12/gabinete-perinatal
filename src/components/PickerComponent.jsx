import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

const PickerComponent = ({ motivo, setMotivo }) => {
  const motivoItems = [
    { label: "Seleccioná un motivo...", value: "" },
    { label: "Consulta general sobre la app", value: "consulta" },
    { label: "Necesito orientación emocional", value: "orientacion" },
    { label: "Problemas técnicos o errores", value: "tecnico" },
    { label: "Sugerencia o mejora", value: "sugerencia" },
    { label: "Otro", value: "otro" },
  ];

  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={motivo}
        onValueChange={(itemValue) => setMotivo(itemValue)}
        style={[styles.picker, Platform.OS === "ios" && styles.pickerIOS]}
        mode={Platform.OS === "ios" ? "dialog" : "dropdown"}
        dropdownIconColor={Platform.OS === "ios" ? undefined : "#333"}
      >
        {motivoItems.map((item) => (
          <Picker.Item
            key={item.value}
            label={item.label}
            value={item.value}
            color="#000000"
          />
        ))}
      </Picker>
    </View>
  );
};

export default PickerComponent;

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: 10,
    height: 50,
    justifyContent: "center",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#333",
  },
  pickerIOS: {
    marginHorizontal: Platform.OS === "ios" ? -10 : 0,
  },
});
