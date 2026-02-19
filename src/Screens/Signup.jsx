import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useDispatch } from "react-redux";
import { useSignUpMutation } from "../services/authService";
import { setUser } from "../features/user/UserSlice";
import { useDBContext } from "../context/DBContext";
import { sendEmailFromClient } from "../services/emailService";
import { useUpdateUserProfileMutation } from "../services/userService";
import fondoSignUp from "../../assets/fondos/CONTACTO.jpg";
import Membresias from "./Membresias";

const PLAN_CONFIG = {
  basico: {
    name: "Básico",
    color: "#E8D5C4",
    options: [
      { id: "basico_free", price: 0, period: "gratis", currency: "eur" },
    ],
  },
  intermedio: {
    name: "Intermedio",
    color: "#C9A690",
    options: [
      { id: "intermedio_month", price: 18, period: "mes", currency: "eur" },
      {
        id: "intermedio_6months",
        price: 70,
        period: "6 meses",
        currency: "eur",
      },
      { id: "intermedio_year", price: 100, period: "año", currency: "eur" },
    ],
  },
  premium: {
    name: "Premium",
    color: "#B78270",
    options: [
      { id: "premium_year", price: 130, period: "año", currency: "eur" },
    ],
  },
};

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("basico");
  const [selectedOption, setSelectedOption] = useState({
    id: "basico_free",
    price: 0,
    period: "gratis",
    currency: "eur",
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const { insertSession, dbInitialized } = useDBContext();
  const dispatch = useDispatch();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [triggerSignUp, result] = useSignUpMutation();
  const [triggerUpdateProfile, { isLoading: profileLoading }] =
    useUpdateUserProfileMutation();

  useEffect(() => {
    const currentPlan = PLAN_CONFIG[selectedPlan];
    if (currentPlan?.options?.[0]) {
      setSelectedOption(currentPlan.options[0]);
    }
  }, [selectedPlan]);

  useEffect(() => {
    if (result.isSuccess && result.data) {
      const { localId, email: userEmail, idToken } = result.data;
      completeRegistration(localId, userEmail, idToken);
    }

    if (result.isError) {
      const errorData = result.error?.data?.error || result.error;
      Alert.alert("Error", errorData.message || "Ocurrió un error.");
      if (errorData.message?.includes("EMAIL_EXISTS"))
        setErrorMail("Email ya en uso");
      if (errorData.message?.includes("WEAK_PASSWORD"))
        setErrorPassword("Contraseña débil");
      setPassword("");
      setIsProcessingPayment(false);
    }
  }, [result]);

  const completeRegistration = async (localId, userEmail, idToken) => {
    try {
      if (!dbInitialized) {
        Alert.alert("Error de DB", "Base de datos no lista.");
        return;
      }

      await insertSession({
        email: userEmail,
        localId,
        token: idToken,
      });

      await triggerUpdateProfile({
        localId,
        name,
        lastName,
        email: userEmail,
        membresia: {
          tipo: selectedPlan,
          subscriptionType: selectedOption?.id || "basico_free",
          fechaInicio: Date.now(),
        },
      }).unwrap();

      dispatch(
        setUser({
          email: userEmail,
          idToken,
          localId,
          name,
          lastName,
          role: "user",
          membresia: {
            tipo: selectedPlan,
            subscriptionType: selectedOption?.id || "basico_free",
            fechaInicio: Date.now(),
          },
        }),
      );

      const planName = PLAN_CONFIG[selectedPlan]?.name || selectedPlan;
      const currencySymbol = selectedOption?.currency === "eur" ? "€" : "$";

      await sendEmailFromClient({
        to: [{ email: userEmail, name: name || "Nuevo Usuario" }],
        subject: "¡Bienvenido a la Red Perinatal Digital!",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #B78270;">¡Hola ${name || ""}!</h2>
            <p>Gracias por registrarte en la Red Perinatal Digital.</p>
            <p>Tu plan seleccionado es: <strong>${planName}</strong></p>
            ${
              selectedOption?.price > 0
                ? `<p>Tu pago de ${currencySymbol}${selectedOption.price} (${selectedOption.period}) ha sido procesado exitosamente.</p>`
                : ""
            }
            <p>¡Esperamos que disfrutes de todos nuestros recursos!</p>
            <br>
            <p>Saludos,<br>El equipo de Red Perinatal Digital</p>
          </div>
        `,
      });

      setIsProcessingPayment(false);

      Alert.alert(
        "¡Registro exitoso!",
        "Tu cuenta ha sido creada correctamente.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: "Main" }],
              });
            },
          },
        ],
      );
    } catch (err) {
      setIsProcessingPayment(false);
      Alert.alert("Error en el registro", err.message || "Error inesperado.");
    }
  };

  const validateForm = () => {
    setErrorMail("");
    setErrorPassword("");

    if (!name.trim()) {
      Alert.alert("Campo requerido", "Por favor, ingresa tu nombre.");
      return false;
    }
    if (!lastName.trim()) {
      Alert.alert("Campo requerido", "Por favor, ingresa tu apellido.");
      return false;
    }
    if (!email.trim()) {
      Alert.alert("Campo requerido", "Por favor, ingresa tu email.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMail("Email inválido");
      return false;
    }
    if (!password) {
      Alert.alert("Campo requerido", "Por favor, ingresa una contraseña.");
      return false;
    }
    if (password.length < 6) {
      setErrorPassword("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    return true;
  };

  const fetchPaymentIntent = async () => {
    try {
      const planName = PLAN_CONFIG[selectedPlan]?.name || selectedPlan;

      const requestData = {
        customerName: `${name} ${lastName}`,
        customerEmail: email,
        cartItems: [
          {
            titulo: `Membresía ${planName} - ${selectedOption.period}`,
            name: `Plan ${planName}`,
          },
        ],
        amount: selectedOption.price,
        currency: selectedOption.currency,
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
        merchantDisplayName: "Red Perinatal Digital",
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
          `Error al configurar el pago: ${error.message}`,
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error inesperado en initializePaymentSheet:", error);
      Alert.alert("Error", `Error inesperado: ${error.message}`);
      return false;
    }
  };

  const onSubmit = async () => {
    if (!validateForm()) return;

    const optionPrice = selectedOption?.price || 0;

    if (optionPrice === 0) {
      triggerSignUp({ email, password, returnSecureToken: true });
      return;
    }

    setIsProcessingPayment(true);

    try {
      const paymentSheetReady = await initializePaymentSheet();

      if (!paymentSheetReady) {
        setIsProcessingPayment(false);
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
            `El pago no se pudo completar: ${error.message}`,
          );
        }
        setIsProcessingPayment(false);
        return;
      }

      triggerSignUp({ email, password, returnSecureToken: true });
    } catch (error) {
      console.error("Error en el proceso de pago:", error);
      Alert.alert(
        "Error",
        error.message || "Ocurrió un error al procesar el pago",
      );
      setIsProcessingPayment(false);
    }
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleDurationSelect = (option) => {
    if (option) {
      setSelectedOption({
        id: option.id || `${selectedPlan}_${option.period}`,
        price: option.price,
        period: option.period,
        currency: option.currency,
      });
    }
  };

  const currentPlan = PLAN_CONFIG[selectedPlan];
  const currencySymbol = selectedOption?.currency === "eur" ? "€" : "$";

  return (
    <ImageBackground
      source={fondoSignUp}
      style={styles.background}
      resizeMode="cover"
    >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Membresias
            onSelectPlan={handlePlanSelect}
            onSelectDuration={handleDurationSelect}
          />
          <Text style={styles.header}>Crea tu cuenta</Text>
          <View style={styles.form}>
            <Text style={styles.title}>Registro</Text>

            <InputForm label="Nombre" value={name} onChangeText={setName} />
            <InputForm
              label="Apellido"
              value={lastName}
              onChangeText={setLastName}
            />
            <InputForm
              label="Email"
              value={email}
              onChangeText={setEmail}
              error={errorMail}
            />
            <InputForm
              label="Contraseña"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChangeText={setPassword}
              error={errorPassword}
              isSecure
            />
            {currentPlan?.options && currentPlan.options.length > 1 && (
              <View style={styles.optionsContainer}>
                <Text style={styles.optionsLabel}>Selecciona el período:</Text>
                {currentPlan.options.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      selectedOption?.id === option.id &&
                        styles.optionButtonSelected,
                      { borderColor: currentPlan.color },
                    ]}
                    onPress={() => setSelectedOption(option)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.optionContent}>
                      <View style={styles.optionLeft}>
                        <Text
                          style={[
                            styles.optionPeriod,
                            selectedOption?.id === option.id &&
                              styles.optionTextSelected,
                          ]}
                        >
                          {option.period}
                        </Text>
                        {selectedOption?.id === option.id && (
                          <View
                            style={[
                              styles.selectedBadge,
                              { backgroundColor: currentPlan.color },
                            ]}
                          >
                            <Text style={styles.selectedBadgeText}>
                              ✓ Seleccionado
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text
                        style={[
                          styles.optionPrice,
                          selectedOption?.id === option.id && {
                            color: currentPlan.color,
                          },
                        ]}
                      >
                        {option.currency === "eur" ? "€" : "$"}
                        {option.price}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View
              style={[
                styles.planInfo,
                { borderLeftColor: currentPlan?.color || "#B78270" },
              ]}
            >
              <View style={styles.planDetails}>
                <Text style={styles.planLabel}>Plan seleccionado:</Text>
                <Text
                  style={[
                    styles.planName,
                    { color: currentPlan?.color || "#B78270" },
                  ]}
                >
                  {currentPlan?.name || "Básico"}
                </Text>
                {selectedOption && selectedOption.price > 0 && (
                  <Text style={styles.planPeriod}>
                    por {selectedOption.period}
                  </Text>
                )}
              </View>
              <Text style={styles.priceText}>
                {selectedOption?.price === 0
                  ? "Gratis"
                  : `${currencySymbol}${selectedOption?.price}`}
              </Text>
            </View>

            <SubmitButton
              onPress={onSubmit}
              disabled={
                result.isLoading ||
                profileLoading ||
                !dbInitialized ||
                isProcessingPayment
              }
            >
              {result.isLoading || profileLoading || isProcessingPayment ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#fff" />
                  <Text style={styles.loadingText}>
                    {isProcessingPayment ? "Procesando..." : "Registrando..."}
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  {selectedOption?.price === 0
                    ? "Registrarme"
                    : "Pagar y Registrarme"}
                </Text>
              )}
            </SubmitButton>
            <Text style={styles.sub}>¿Ya tienes una cuenta?</Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.subLink}>Iniciar Sesión</Text>
            </Pressable>
          </View>
        </ScrollView>
    </ImageBackground>
  );
};

export default Signup;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#B78270",
    marginTop: 40,
    marginBottom: 10,
    textAlign: "center",
  },
  form: {
    width: "92%",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    marginHorizontal: "4%",
    marginVertical: 40,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    color: "#B78270",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  optionsContainer: {
    marginVertical: 16,
  },
  optionsLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
  },
  optionButton: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  optionButtonSelected: {
    backgroundColor: "#f9f9f9",
    borderWidth: 2.5,
    elevation: 4,
  },
  optionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionLeft: {
    flex: 1,
  },
  optionPeriod: {
    fontSize: 16,
    color: "#555",
    textTransform: "capitalize",
    marginBottom: 4,
  },
  optionTextSelected: {
    fontWeight: "700",
    color: "#333",
    fontSize: 17,
  },
  selectedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  selectedBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  optionPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  planInfo: {
    backgroundColor: "#f9f9f9",
    padding: 14,
    borderRadius: 8,
    marginVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 4,
  },
  planDetails: {
    flex: 1,
  },
  planLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  planName: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  planPeriod: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
    fontStyle: "italic",
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  sub: {
    color: "#555",
    textAlign: "center",
    marginTop: 10,
  },
  subLink: {
    color: "#B78270",
    textAlign: "center",
    marginTop: 4,
    textDecorationLine: "underline",
  },
});
