import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const Membresias = ({ onSelectPlan }) => {
  const [selectedPlan, setSelectedPlan] = useState("basico");

  const plans = [
    {
      id: "basico",
      name: "basico",
      price: "Gratis",
      color: "#E8D5C4",
      features: [
        "Acceso limitado a biblioteca",
        "Acceso limitado a guías",
        "Acceso limitado a podcasts",
        "Talleres, citas y orientaciones (pago adicional)",
      ],
    },
    {
      id: "intermedio",
      name: "intermedio",
      price: "18€/mes",
      priceOptions: [
        { label: "Mensual", value: "18€/mes" },
        { label: "Semestral", value: "70€ (11.67€/mes)" },
        { label: "Anual", value: "100€ (8.33€/mes)" },
      ],
      color: "#C9A690",
      features: [
        "Mayor parte del contenido desbloqueado",
        "Biblioteca ampliada",
        "Guías y podcasts extendidos",
        "Talleres, citas y orientaciones (pago adicional)",
      ],
      popular: true,
    },
    {
      id: "premium",
      name: "premium",
      price: "130€/año",
      priceDetail: "(10.83€/mes)",
      color: "#B78270",
      features: [
        "Acceso completo a todo el contenido",
        "1 taller gratis incluido",
        "Talleres y citas adicionales (pago adicional)",
      ],
    },
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    if (onSelectPlan) onSelectPlan(planId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Elige tu plan</Text>
      <View style={{ paddingHorizontal: 12, marginHorizontal: 12 }}>
        <Text style={styles.footerNote}>
          * Todos los planes permiten acceder a talleres, citas y orientaciones
          adicionales mediante pago por separado.
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;

          return (
            <TouchableOpacity
              key={plan.id}
              style={[styles.planCard, { borderColor: plan.color }]}
              activeOpacity={0.95}
              onPress={() => handleSelectPlan(plan.id)}
            >
              {plan.popular && (
                <View
                  style={[styles.popularBadge, { backgroundColor: plan.color }]}
                >
                  <Text style={styles.popularText}>Más Popular</Text>
                </View>
              )}

              <View
                style={[styles.planHeader, { backgroundColor: plan.color }]}
              >
                <Text style={styles.planName}>{plan.name}</Text>
              </View>

              <View style={styles.planBody}>
                <View style={styles.priceWrap}>
                  <Text style={styles.price}>{plan.price}</Text>
                  {plan.priceDetail && (
                    <Text style={styles.priceDetail}>{plan.priceDetail}</Text>
                  )}
                </View>

                {plan.priceOptions && (
                  <View style={styles.priceOptions}>
                    {plan.priceOptions.map((opt, i) => (
                      <Text key={i} style={styles.priceOption}>
                        • {opt.label}: {opt.value}
                      </Text>
                    ))}
                  </View>
                )}

                <ScrollView
                  style={styles.featuresScroll}
                  contentContainerStyle={{ paddingBottom: 8 }}
                  showsVerticalScrollIndicator={false}
                >
                  {plan.features.map((f, idx) => (
                    <View key={idx} style={styles.featureRow}>
                      <Text style={styles.checkmark}>✓</Text>
                      <Text style={styles.featureText}>{f}</Text>
                    </View>
                  ))}
                </ScrollView>

                <TouchableOpacity
                  style={[
                    styles.selectButton,
                    { backgroundColor: isSelected ? "#4CAF50" : plan.color },
                  ]}
                  onPress={() => handleSelectPlan(plan.id)}
                >
                  <Text style={styles.selectButtonText}>
                    {isSelected ? "✓ Seleccionado" : "Seleccionar"}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, marginVertical: 8 },
  mainTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#B78270",
    textAlign: "center",
    marginVertical: 18,
  },
  scrollContent: {
    paddingHorizontal: 12,
    alignItems: "flex-start",
  },
  planCard: {
    width: 260,
    height: 390,
    marginHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  popularBadge: {
    position: "absolute",
    top: 12,
    right: -28,
    paddingVertical: 8,
    paddingHorizontal: 36,
    transform: [{ rotate: "45deg" }],
    zIndex: 10,
  },
  popularText: { color: "#fff", fontWeight: "700", fontSize: 11, },
  planHeader: { paddingVertical: 14, alignItems: "center" },
  planName: { fontSize: 20, fontWeight: "700", color: "#fff" },
  planBody: {
    flex: 1,
    paddingHorizontal: 14,
    paddingBottom: 12,
    justifyContent: "space-between",
  },
  priceWrap: { alignItems: "center", marginTop: 12 },
  price: { fontSize: 24, fontWeight: "800", color: "#333" },
  priceDetail: { fontSize: 13, color: "#666", marginTop: 2 },
  priceOptions: { marginBottom: 6 },
  priceOption: { fontSize: 13, color: "#555", lineHeight: 18 },
  featuresScroll: { maxHeight: 100, marginBottom: 8 },
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 4,
  },
  checkmark: {
    color: "#4CAF50",
    fontSize: 14,
    marginRight: 8,
    fontWeight: "700",
  },
  featureText: { flex: 1, fontSize: 13, color: "#444", lineHeight: 18 },
  selectButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  selectButtonText: { color: "#fff", fontWeight: "700" },
  footerNote: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    marginVertical: 18,
  },
});

export default Membresias;
