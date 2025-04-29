import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';


const BotonTalleres = ({ title, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.button}>
        <Ionicons name="book-outline" size={42} color="#B78270" />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default BotonTalleres;

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
  buttonText: {
    textAlign: "center",
    color: "black",
    fontFamily: "Crafty",
    fontSize: 15,
    color: "#B78270",
  },
});