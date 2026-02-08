import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
  ActivityIndicator,
  Image,
  ImageBackground,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { clearCart } from "../features/cart/CartSlice";
import { useOrderConfirmMutation } from "../services/orderService";
import AddButton from "../components/AddButton";
import { sendEmailFromClient } from "../services/emailService";
import { useGetProfileQuery } from "../services/userService";
import { useStripe } from "@stripe/stripe-react-native";
import { useState } from "react";
import { colors } from "../utils/customerStyle";
import payment from "../../assets/icon/credit-card.png";
import home from "../../assets/icon/home.png";
import back from "../../assets/icon/back.png";
import fondo from "../../assets/fondos/fondo_APP.jpg";

const Cart = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.value.itemCart);
  const total = useSelector((state) => state.cart.value.totalPrecioCarrito);
  const { email, localId } = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const [triggerOrderConfirm] = useOrderConfirmMutation();

  const { data: profileData } = useGetProfileQuery(localId);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [loading, setLoading] = useState(false);

  const emailEquipo = "florenciavelascopsi@hotmail.com";
  const name = profileData?.name;
  const lastName = profileData?.lastName;
  const tallerComprado = cartItems.map((item) => item.titulo).join(", ");

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const validateTotal = () => {
    const numericTotal = parseFloat(total);
    return !isNaN(numericTotal) && numericTotal >= 0.5;
  };

  const fetchPaymentIntent = async () => {
    try {
      if (!validateTotal()) {
        throw new Error(`El monto del total no es válido: ${total}`);
      }

      const numericTotal = parseFloat(total).toFixed(2);

      const requestData = {
        customerName: `${name} ${lastName}`,
        customerEmail: email,
        cartItems,
        amount: Number(numericTotal),
        currency: "eur",
      };

      const response = await fetch(
        `https://api-yela3b24ha-uc.a.run.app/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error del servidor:", errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.clientSecret) {
        throw new Error("No se recibió el clientSecret del servidor");
      }

      return data.clientSecret;
    } catch (error) {
      console.error("Error en fetchPaymentIntent:", error);
      Alert.alert(
        "Error de Conexión",
        `No se pudo conectar con el servidor de pagos: ${error.message}.`,
      );
      return null;
    }
  };

  const initializePaymentSheet = async () => {
    try {
      const clientSecret = await fetchPaymentIntent();

      if (!clientSecret) {
        return false;
      }

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Gabinete Perinatal",
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: `${name} ${lastName}`,
          email: email,
        },
      });

      if (error) {
        console.error("Error al inicializar PaymentSheet:", error);
        Alert.alert(
          "Error de Configuración",
          `Error al configurar el pago: ${error.message}
            Código de error: ${error.code}`,
        );
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error("Error inesperado en initializePaymentSheet:", error);
      Alert.alert("Error", `Error inesperado: ${error.message}`);
      return false;
    }
  };

  const handlerOrderConfirm = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Error", "El carrito está vacío.");
      return;
    }

    if (!validateTotal()) {
      Alert.alert(
        "Error",
        "El total del carrito no es válido. Por favor, verifica los productos.",
      );
      return;
    }

    if (!name || !lastName || !email) {
      Alert.alert(
        "Error",
        "Faltan datos del perfil. Por favor, completa tu información.",
      );
      return;
    }

    setLoading(true);

    try {
      const paymentSheetReady = await initializePaymentSheet();

      if (!paymentSheetReady) {
        setLoading(false);
        return;
      }

      const { error } = await presentPaymentSheet();

      if (error) {
        if (error.code === "Canceled") {
          Alert.alert("Pago Cancelado", "Has cancelado el proceso de pago.");
        } else {
          console.error("Error en presentPaymentSheet:", error);
          Alert.alert(
            "Error de Pago",
            `El pago no se pudo completar: ${error.message}
              Código: ${error.code}`,
          );
        }
        setLoading(false);
        return;
      }

      const result = await triggerOrderConfirm({
        cartItems,
        amount: parseFloat(total),
        email: email,
      }).unwrap();

      dispatch(clearCart());

      await sendEmailFromClient({
        to: [{ email: email }],
        subject: "Felicitaciones Por la compra del Taller",
        htmlContent: `Felicitaciones por comprar el Taller ${tallerComprado}, una de nuestras psicólogas se va a comunicar para brindarte la información que necesitas para hacer el taller.`,
      });

      await sendEmailFromClient({
        to: [{ email: emailEquipo }],
        subject: "Nueva Venta de Taller",
        htmlContent: `¡Felicitaciones! Se ha vendido el Taller ${tallerComprado}. Comunícate con Nombre y Apellido: ${name} ${lastName}. El email es: ${email}.`,
      });

      Alert.alert(
        "¡Éxito!",
        "Tu orden ha sido confirmada y el pago procesado con éxito. Recibirás un email de confirmación.",
      );
    } catch (orderError) {
      console.error("Error en la confirmación de la orden:", orderError);
      Alert.alert(
        "Error",
        orderError.message ||
          "Ocurrió un error al confirmar la orden después del pago.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={fondo} style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.backIcon} />
        </Pressable>
        <Text style={styles.header}>Tu Carrito</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={cartItems}
        keyExtractor={(item, index) =>
          item && item.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item }) => <CartItem item={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyCartText}>El carrito está vacío.</Text>}
      />

      {cartItems.length > 0 && (
        <View style={styles.footerContainer}>
          <View style={styles.buttonWrapper}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View style={styles.containerButtons}>
                <AddButton
                  onPress={handlerOrderConfirm}
                  disabled={loading || cartItems.length === 0 || !validateTotal()}
                  iconSource={payment}
                  iconSize={30}
                  style={styles.addButton}
                  title="Pagar"
                />
                <AddButton
                  title="Inicio"
                  onPress={() => navigation.navigate("Main")}
                  iconSource={home}
                  iconSize={30}
                  style={styles.addButtonHome}
                />
              </View>
            )}
          </View>

          <View style={styles.totalContainer}>
            <Pressable style={styles.clearCart} onPress={handleClearCart}>
              <FontAwesome name="trash-o" size={24} color="black" />
            </Pressable>
            <Text style={styles.totalText}>
              Total: €{validateTotal() ? parseFloat(total).toFixed(2) : "0.00"}
            </Text>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6C6B7",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    marginTop: 50,
  },
  footerContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 1,
    borderTopColor: "transparent",
  },
  buttonWrapper: {
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    width: "100%",
  },
  addButton: {
    backgroundColor: colors.btnGuia,
    width: 90,
    height: 90, 
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 5,
    marginVertical: 0,
    overflow: "hidden", 
  },
  addButtonHome: {
    backgroundColor: colors.btnAsesorias,
    width: 90,
    height: 90,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 5,
    marginVertical: 0,
    overflow: "hidden",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#f9f9f9",
  },
  clearCart: {
    padding: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    tintColor: "black",
  },
});