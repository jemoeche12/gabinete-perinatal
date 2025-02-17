import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  onPressButton,
} from "react-native";
import React from "react";

const BotonTalleres = () => {
  return (
    <TouchableOpacity  style={styles.container} onPress={onPressButton}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>TALLERES</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BotonTalleres;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    alignItems: 'center',
  },
  button: {
    marginBottom: 10,
    width: 100,
    height: 100,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: "rgb(181, 130, 140)",
    borderRadius: '50%',
    marginLeft: 50,
    marginTop: 10,

  },
  buttonText: {
    textAlign: "center",
    padding: 20,
    color: "white",
    fontWeight:'bold',
    fontSize: 15
  },
});