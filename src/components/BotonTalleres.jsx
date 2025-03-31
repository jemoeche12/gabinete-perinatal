import {
  StyleSheet,
  View,
  TouchableOpacity,
  onPressButton,
} from "react-native";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';


const BotonTalleres = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.button}>
      <Ionicons name="book-outline" size={42} color="white" />
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
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgb(181, 130, 140)",
    borderRadius: '50%',
    marginLeft: 50,
    marginTop: 10,

  },
  buttonText: {
    textAlign: "center",
    padding: 10,
    color: "white",
    fontWeight: 'bold',
    fontSize: 15
  },
});