import { StyleSheet, Text, View, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { removeItem } from "../features/cart/CartSlice";

const CartItem = ({ item }) => {

  const dispatch = useDispatch()

  const handleClearItem = () => {
    dispatch(removeItem({id: item.id}))
  }
  if (!item) {
    return null;
  }

  const {
    id,
    titulo = "Taller sin título",
    beneficios = "Beneficios no listados",
    price = 0,
  } = item;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.text}>{beneficios}</Text>
      <View style={styles.totalContainer}>
        <Pressable style={styles.clearItem} onPress={handleClearItem}>
          <FontAwesome name="trash-o" size={24} color="black" />
        </Pressable>
        <Text style={styles.price}>Precio: ${price.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  text: {
    fontSize: 18,
    color: "#555",
    marginBottom: 3,
    fontFamily: "Crafty",
  },
  totalContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
    alignItems: "flex-end",
    marginHorizontal: 20
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007bff",
    marginTop: 10,
    textAlign: "right",
  },
});
