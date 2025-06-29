import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions, 
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window"); 
const MenuDesplegable = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const menuWidth = width * 0.7;
  const slideAnim = useRef(new Animated.Value(-menuWidth));
  const opacityAnim = useRef(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim.current, {
          toValue: 0, 
          duration: 400,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(opacityAnim.current, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim.current, {
          toValue: -menuWidth, 
          duration: 400,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(opacityAnim.current, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          onClose?.();
        }
      });
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.menuContainer,
        {
          transform: [{ translateX: slideAnim.current }],
          opacity: opacityAnim.current,
        },
      ]}
    >
      <Image
        source={require("../../assets/IconApp7.png")}
        style={styles.imgIcon}
      />

      <Pressable
        onPress={() => {
          navigation.navigate("Home");
          onClose?.();
        }}
      >
        <Text style={styles.menuItem}>Inicio</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("SobreNosotros");
          onClose?.();
        }}
      >
        <Text style={styles.menuItem}>Sobre Nosotros</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("FaQ");
          onClose?.();
        }}
      >
        <Text style={styles.menuItem}>Preguntas Frecuentes</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('MiCita');
          onClose?.();
        }}
      >
        <Text style={styles.menuItem}>Mis Citas</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("TerminosYCondiciones");
          onClose?.();
        }}
      >
        <Text style={styles.menuItem}>Términos y Condiciones</Text>
      </Pressable>
      <Pressable onPress={() => onClose?.()} style={styles.closeButton}>
        <Text style={styles.closeBtnText}>Cerrar Menú</Text>
      </Pressable>
    </Animated.View>
  );
};

export default MenuDesplegable;

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0, 
    bottom: 0,
    backgroundColor: "rgba(35, 35, 35, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingTop: 80,
    zIndex: 2,
    width: "70%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: "95%",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#B78270",
    borderRadius: 5,
    color: "white",
    fontFamily: "Crafty",
    borderColor: "transparent",
  },
  closeBtnText: {
    fontSize: 18,
    color: "white",
    fontFamily: "Crafty",
  },
  menuItem: {
    fontSize: 22,
    color: "white",
    paddingVertical: 15,
    fontFamily: "Crafty",
  },
  imgIcon: {
    width: 225,
    height: 225,
    marginBottom: 5,
    marginTop: -200,
    backgroundColor: "transparent",
  },
});