import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  onPressButton,
} from "react-native";
import React from "react";

const BotonTurnos = () => {
  return (
    <TouchableOpacity  style={styles.container} onPress={onPressButton}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>TURNOS</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BotonTurnos;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    alignItems: 'center',
  },
  button: {
    marginBottom: 10,
    width: 90,
    height: 90,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: "rgb(181, 130, 140)",
    borderRadius: '50%',
    marginLeft: 20,
    marginTop: 200,
    shadowOpacity: 0.5,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width:"2", height:"3" },
    shadowRadius: 1,
    elevation: 4


  },
  buttonText: {
    textAlign: "center",
    padding: 20,
    color: "white",
    fontWeight:'bold'
  },
});
