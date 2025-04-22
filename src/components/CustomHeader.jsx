import { StyleSheet, Text, View, Image, Pressable, SafeAreaView } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ onMenuPress }) => {
  const navigation = useNavigation();

  const handleNavigationContact = () => {
    navigation.navigate('ContactoScreen');
  }
  const handleNavigationAbout = () => {
    navigation.navigate('AboutApp');
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Image source={require("../../assets/IconApp7.png")} style={styles.img} />
      </Pressable>
      <View style={styles.textContainer}>
        <Pressable onPress={handleNavigationAbout} style={styles.text}>
          <Text style={styles.text}>Acerca de</Text>
        </Pressable>
        <Pressable onPress={handleNavigationContact} style={styles.text}>
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
    width: '100%',

  },
  img: {
    width: 120,
    height: 120,
    marginRight: 5
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
    marginRight: 20
  },
  text: {
    fontFamily: "Crafty",
    fontSize: 18,
    color: "black",
  },

})
