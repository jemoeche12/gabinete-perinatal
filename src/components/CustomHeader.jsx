import { StyleSheet, Text, View, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const CustomHeader = ({ onMenuPress }) => {
  const navigation = useNavigation();
  const total = useSelector((state) => state.cart.value.total)

  const handleNavigationContact = () => {
    navigation.navigate("ContactoScreen");
  };
  const handleNavigationAbout = () => {
    navigation.navigate("AboutApp");
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable onPress={onMenuPress} style={styles.menuIconWrapper}>
          <Ionicons name="menu" size={30} color="black" />
        </Pressable>

        <View style={styles.textContainer}>
          <Pressable onPress={handleNavigationAbout}>
            <Text style={styles.headerText}>Acerca de</Text>
          </Pressable>
          <Pressable onPress={handleNavigationContact}>
            <Text style={styles.headerText}>Contacto</Text>
          </Pressable>
        </View>

        <View style={styles.cartIconWrapper}>
          <Pressable onPress={() => navigation.navigate("Cart")}>
            <EvilIcons name="cart" size={40} color="black" />
          </Pressable>
          <Text style={styles.numberCart}>{total}</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F8EDE3",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 25,
    width: "100%",
  },
  menuIconWrapper: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginHorizontal: 10,
    marginTop: 5,
  },
  headerText: {
    fontFamily: "Crafty",
    fontSize: 18,
    color: "black",
  },
  cartIconWrapper: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  numberCart:{
    fontFamily: "Crafty",
    fontSize: 20,
    position: "absolute",
    marginTop: 40,
    marginLeft: 45
  }
});
