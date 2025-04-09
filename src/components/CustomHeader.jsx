import { StyleSheet, Text, View, Image, Pressable, SafeAreaView } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const CustomHeader = ({ onMenuPress }) => {

  const handleNavigation = () => {
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/IconApp7.png")} style={styles.img} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Acerca de</Text>
        <Pressable onPress={handleNavigation} style={styles.text}>
          <Text style={styles.text}>Contacto</Text>
        </Pressable>
        <Pressable onPress={onMenuPress} style={styles.drawerIcon}>
          <Ionicons name="menu" size={30} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default CustomHeader;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8EDE3',
    height: 120,

  },
  img: {
    width: 120,
    height: 120,
    marginTop: 20,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  text: {
    fontFamily: "Crafty",
    fontSize: 18,
    color: "black"
  },
  menuContainer: {
    position: 'absolute',
    height: 350,
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 1,
  }
})
