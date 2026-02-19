import React, { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/user/UserSlice";
import { useUpdateUserProfileMutation } from "../services/userService";
import { sendEmailFromClient } from "../services/emailService";
import Membresias from "./Membresias";

const UpdateMembresias = ({ navigation }) => {
  const { email, localId, membresia, name, lastName } = useSelector(
    (state) => state.auth.value,
  );

  const membresiaActual = membresia?.tipo || "basico";

  const dispatch = useDispatch();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [triggerUpdateProfile, { isLoading: profileLoading }] =
    useUpdateUserProfileMutation();

  const [selectedPlan, setSelectedPlan] = useState(membresiaActual || "basico");
  const [selectedOption, setSelectedOption] = useState({
    id: "basico_free",
    amount: 0,
    currency: "eur",
    period: "gratis",
    display: "Gratis",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const hasChanges = selectedPlan !== membresiaActual;

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleDurationSelect = (option) => {
    if (option) {
      setSelectedOption(option);
    }
  };

  const fetchPaymentIntent = async () => {
    try {
      const requestData = {
        customerName: name || "Usuario",
        customerEmail: email,
        cartItems: [
          {
            titulo: `Actualización a ${selectedPlan} - ${selectedOption.period}`,
            name: `Plan ${selectedPlan}`,
          },
        ],
        amount: selectedOption.amount / 100,
        currency: selectedOption.currency,
        membresiaActual: {
          amount: membresia.amount,
          diasTotales: membresia.diasTotales,
          fechaFin: membresia.fechaFin,
        }
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
        throw new Error(`Server error: ${response.status}`);
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
        `No se pudo conectar con el servidor de pagos: ${error.message}`,
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

  const updateMembershipInFirebase = async () => {
    try {
      const diasPorPeriodo = {
        mensual: 30,
        semestral: 180,
        anual: 365,
      };

      const diasTotales = diasPorPeriodo[selectedOption.id] ?? 0;
      const fechaInicio = Date.now();
      const fechaFin = fechaInicio + diasTotales * 24 * 60 * 60 * 1000;

      const membresiaData = {
        tipo: selectedPlan,
        subscriptionType: selectedOption.id,
        fechaInicio,
        fechaFin,
        amount: selectedOption.amount,
        diasTotales,
      };
      await triggerUpdateProfile({
        localId,
        membresia: membresiaData,
      }).unwrap();

      dispatch(
        setUser({
          email,
          localId,
          name,
          lastName,
          role: "user",
          membresia: membresiaData,
        }),
      );

      return true;
    } catch (error) {
      console.error("Error actualizando membresía en Firebase:", error);
      Alert.alert(
        "Error",
        "No se pudo actualizar tu membresía. Por favor, intenta de nuevo.",
      );
      return false;
    }
  };

  const sendConfirmationEmail = async () => {
    try {
      const currencySymbol = selectedOption.currency === "eur" ? "€" : "$";
      const displayPrice =
        selectedOption.amount > 0
          ? `${currencySymbol}${(selectedOption.amount / 100).toFixed(2)}`
          : "Gratis";

      await sendEmailFromClient({
        to: [{ email: email, name: "Usuario" }],
        subject: "Membresía Actualizada - Red Perinatal Digital",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #B78270;">¡Tu membresía ha sido actualizada!</h2>
            <p>Tu nuevo plan es: <strong style="text-transform: capitalize;">${selectedPlan}</strong></p>
            ${
              selectedOption.amount > 0
                ? `<p>Pago procesado: ${displayPrice} (${selectedOption.period})</p>`
                : ""
            }
            <p>¡Disfruta de todos los beneficios de tu nueva membresía!</p>
            <br>
            <p>Saludos,<br>El equipo de Red Perinatal Digital</p>
          </div>
        `,
      });
    } catch (error) {
      console.error("Error enviando email:", error);
    }
  };

  const handleUpdateMembership = async () => {
    if (!hasChanges) {
      Alert.alert(
        "Sin cambios",
        "Ya tienes este plan activo. Selecciona un plan diferente.",
      );
      return;
    }

    const requierePago = selectedOption.amount > 0;

    const confirmMessage = requierePago
      ? `¿Deseas actualizar tu membresía a ${selectedPlan}? Se procesará un pago de ${
          selectedOption.currency === "eur" ? "€" : "$"
        }${(selectedOption.amount / 100).toFixed(2)}.`
      : `¿Deseas cambiar tu membresía a ${selectedPlan}?`;

    Alert.alert("Confirmar cambio", confirmMessage, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Continuar",
        onPress: async () => {
          setIsProcessing(true);

          try {
            if (requierePago) {
              const paymentSheetReady = await initializePaymentSheet();

              if (!paymentSheetReady) {
                setIsProcessing(false);
                return;
              }

              const { error } = await presentPaymentSheet();

              if (error) {
                if (error.code === "Canceled") {
                  Alert.alert(
                    "Pago Cancelado",
                    "Has cancelado el proceso de pago.",
                  );
                } else {
                  console.error("Error en presentPaymentSheet:", error);
                  Alert.alert(
                    "Error de Pago",
                    `El pago no se pudo completar: ${error.message}`,
                  );
                }
                setIsProcessing(false);
                return;
              }
            }

            const updated = await updateMembershipInFirebase();

            if (!updated) {
              setIsProcessing(false);
              return;
            }

            await sendConfirmationEmail();

            setIsProcessing(false);
            Alert.alert(
              "¡Éxito!",
              "Tu membresía ha sido actualizada correctamente.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.goBack();
                  },
                },
              ],
            );
          } catch (error) {
            console.error("Error en handleUpdateMembership:", error);
            Alert.alert(
              "Error",
              "Ocurrió un error. Por favor, intenta de nuevo.",
            );
            setIsProcessing(false);
          }
        },
      },
    ]);
  };

  const displayPrice =
    selectedOption.amount === 0
      ? "Gratis"
      : `${selectedOption.currency === "eur" ? "€" : "$"}${(
          selectedOption.amount / 100
        ).toFixed(2)}`;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Actualizar Membresía</Text>
        <Text style={styles.headerSubtitle}>
          Plan actual:{" "}
          <Text style={styles.currentPlanText}>{membresiaActual}</Text>
        </Text>
      </View>

      <Membresias
        onSelectPlan={handlePlanSelect}
        onSelectDuration={handleDurationSelect}
      />

      {hasChanges && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Cambio de membresía</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>De:</Text>
            <Text style={styles.summaryValue}>{membresiaActual}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>A:</Text>
            <Text style={[styles.summaryValue, styles.summaryHighlight]}>
              {selectedPlan}
            </Text>
          </View>
          {selectedOption.amount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Precio:</Text>
              <Text style={[styles.summaryValue, styles.summaryPrice]}>
                {displayPrice} / {selectedOption.period}
              </Text>
            </View>
          )}
        </View>
      )}

      <Pressable
        style={[
          styles.updateButton,
          (!hasChanges || isProcessing) && styles.updateButtonDisabled,
        ]}
        onPress={handleUpdateMembership}
        disabled={!hasChanges || isProcessing}
      >
        {isProcessing ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.updateButtonText}>Procesando...</Text>
          </View>
        ) : (
          <Text style={styles.updateButtonText}>
            {!hasChanges
              ? "Selecciona un plan diferente"
              : selectedOption.amount > 0
                ? `Pagar ${displayPrice} y Actualizar`
                : "Actualizar Membresía"}
          </Text>
        )}
      </Pressable>
    </ScrollView>
  );
};

export default UpdateMembresias;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  currentPlanText: {
    fontWeight: "700",
    color: "#B78270",
    textTransform: "capitalize",
  },
  summaryCard: {
    margin: 20,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#B78270",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
  },
  summaryLabel: {
    fontSize: 15,
    color: "#666",
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    textTransform: "capitalize",
  },
  summaryHighlight: {
    color: "#B78270",
    fontSize: 16,
  },
  summaryPrice: {
    color: "#4CAF50",
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: "#B78270",
    marginHorizontal: 20,
    marginTop: 10,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  updateButtonDisabled: {
    backgroundColor: "#ccc",
    elevation: 0,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
