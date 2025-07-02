import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { clearCart } from "../features/cart/CartSlice";
import { useOrderConfirmMutation } from "../services/orderService";
import AddButton from "../components/AddButton";


const Cart = () => {
  const cartItems = useSelector((state) => state.cart.value.itemCart);
  const total = useSelector((state) => state.cart.value.totalPrecioCarrito);
  const { user } = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const [triggerOrderConfirm] = useOrderConfirmMutation();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlerOrderConfirm = async () => {
    try {
      const result = await triggerOrderConfirm({
        cartItems,
        total,
        user,
        
      }).unwrap();
      Alert.alert("La orden se ha confirmado con exito");
      dispatch(clearCart());
      

      
    } catch (error) {
      Alert.alert(
        "Error",
        error.message || "Ocurrió un error al confirmar la orden."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tu Carrito</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>El carrito está vacío.</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cartItems}
          keyExtractor={(item, index) =>
            item && item.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }) => <CartItem item={item} />}
        />
      )}

      {cartItems.length > 0 && (
        <View style={styles.button}>
          <AddButton
            style={styles.button}
            title="CONFIRMAR"
            onPress={handlerOrderConfirm}
          />
        </View>
      )}
      <View style={styles.totalContainer}>
        <Pressable style={styles.clearCart} onPress={handleClearCart}>
          <FontAwesome name="trash-o" size={24} color="black" />
        </Pressable>
        <Text style={styles.totalText}>Total: ${total}</Text>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8EDE3",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "#666",
  },
  totalContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
    alignItems: "flex-end",
    marginHorizontal: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
  },
  button: {
    alignItems: "center",
    marginVertical: 20,
  },
  clearCart: {
    padding: 10,
  },
});