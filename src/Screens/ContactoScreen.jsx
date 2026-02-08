import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import FormComponent from "../components/FormComponent";
import CardPsicologos from "../components/CardPsicologos";
import back from "../../assets/icon/back.png";

const ContactoScreen = ({ visible, navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(visible);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <View style={styles.mainWrapper}>
      <CustomHeader onMenuPress={toggleMenu} />
      
      {isMenuVisible && (
        <MenuDesplegable visible={isMenuVisible} onClose={toggleMenu} />
      )}

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={back} style={styles.backIcon} />
        </Pressable>

        <CardPsicologos
          style={styles.cardPsicologos}
          psicologo={{
            nombre: "Florencia",
            apellido: "Velasco",
            telefono: "+33 777989701",
            email: "florencia.velasco@example.com",
          }}
          uri="https://example.com/imagen.jpg"
        />
        
        <FormComponent style={styles.formComponent} />
        
        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
};

export default ContactoScreen;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#F8EDE3", 
  },
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40, 
    alignItems: "center", 
  },
 
  backButton: {
    alignSelf: 'flex-start', 
    marginLeft: 15,
    marginVertical: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});