import {
  StyleSheet,
  View,
  onPressButton,
  TouchableOpacity,
} from "react-native";
import React from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const BotonTurnos = () => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressButton}>
      <View style={styles.button}>
        <MaterialCommunityIcons name="calendar-text-outline" size={44} color="white" />
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
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgb(181, 130, 140)",
    borderRadius: '50%',
    marginLeft: 20,
    marginTop: 170,
    shadowOpacity: 0.5,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: "2", height: "3" },
    shadowRadius: 1,
    elevation: 4


  },
  icon: {

    width: 90,
    height: 90,
    position: 'absolute',
    borderRadius: 45,
  },
  buttonText: {
    textAlign: "center",
    padding: 20,
    color: "white",
    fontWeight: 'bold'
  },
});
