import {
  StyleSheet,
  View,
  Text,
  onPressButton,
  Pressable,
} from "react-native";
import React from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const BotonTurnos = ({ title, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.button}>
        <MaterialCommunityIcons name="calendar-text-outline" size={44} color="#B78270" />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default BotonTurnos;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    alignItems: 'center',
  },
  button: {
    width: 95,
    height: 95,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#E6C6B7",
    borderRadius: 45,
    marginLeft: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {

    width: 90,
    height: 90,
    position: 'absolute',
    borderRadius: 45,
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    fontFamily: "Crafty",
    fontSize: 15,
    color: "#B78270",
  },
},
);
