import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";

const Membresias = ({ onSelectPlan, onSelectDuration }) => {
  const [selectedPlan, setSelectedPlan] = useState("basico");
  const [selectedDuration, setSelectedDuration] = useState({
    intermedio: "mensual",
  });

  const plans = [
    {
      id: "basico",
      name: "Básico",
      price: "Gratis",
      color: "#E8D5C4",
      features: [
        "Acceso limitado a biblioteca",
        "Acceso limitado a guías",
        "Acceso limitado a podcasts",
        "Talleres y citas (pago adicional)",
      ],
    },
    {
      id: "intermedio",
      name: "Intermedio",
      defaultPrice: "18€/mes",
      priceOptions: [
        {
          id: "mensual",
          label: "Mensual",
          value: "18€/mes",
          amount: 1800,
          currency: "eur",
          period: "mes",
        },
        {
          id: "semestral",
          label: "Semestral",
          value: "70€",
          detail: "(11.67€/mes)",
          amount: 7000,
          currency: "eur",
          period: "6 meses",
        },
        {
          id: "anual",
          label: "Anual",
          value: "100€",
          detail: "(8.33€/mes)",
          amount: 10000,
          currency: "eur",
          period: "año",
        },
      ],
      color: "#C9A690",
      features: [
        "Mayor parte del contenido desbloqueado",
        "Biblioteca ampliada",
        "Guías y podcasts extendidos",
        "6 Talleres gratis al año",
        "Citas (pago adicional)",
      ],
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: "130€/año",
      priceDetail: "(10.83€/mes)",
      amount: 13000,
      currency: "eur",
      period: "año",
      color: "#B78270",
      features: [
        "Acceso completo a todo el contenido",
        "1 taller gratis por mes incluido",
        "Talleres y citas adicionales (pago adicional)",
      ],
    },
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    if (onSelectPlan) {
      onSelectPlan(planId);
    }

    if(planId === "basico" && onSelectDuration){
      onSelectDuration(
        {
          id: "basico",
          amount: 0,
          currency: "eur",
          period: "gratis",
          display: "Gratis"
        }
      )
    }

    if (planId === "intermedio" && onSelectDuration) {
      const currentDuration = selectedDuration.intermedio || "mensual";
      const plan = plans.find((p) => p.id === "intermedio");
      const option = plan.priceOptions.find(
        (opt) => opt.id === currentDuration,
      );
      onSelectDuration(option);
    }

    if (planId === "premium" && onSelectDuration) {
      const plan = plans.find((p) => p.id === "premium");
      onSelectDuration({
        amount: plan.amount,
        currency: plan.currency,
        period: plan.period,
      });
    }
  };

  const handleSelectDuration = (planId, durationId) => {
    setSelectedDuration((prev) => ({
      ...prev,
      [planId]: durationId,
    }));

    setSelectedPlan(planId);
    if (onSelectPlan) {
      onSelectPlan(planId);
    }
    if (onSelectDuration) {
      const plan = plans.find((p) => p.id === planId);
      const option = plan.priceOptions.find((opt) => opt.id === durationId);
      onSelectDuration(option);
    }
  };

  const getCurrentPrice = (plan) => {
    if (plan.priceOptions) {
      const currentDuration = selectedDuration[plan.id] || "mensual";
      const option = plan.priceOptions.find(
        (opt) => opt.id === currentDuration,
      );
      return {
        value: option.value,
        detail: option.detail,
      };
    }
    return {
      value: plan.price,
      detail: plan.priceDetail,
    };
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
          const currentPrice = getCurrentPrice(plan);

          return (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                { borderColor: plan.color },
                isSelected && styles.planCardSelected,
              ]}
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
                  <Text style={styles.price}>{currentPrice.value}</Text>
                  {currentPrice.detail && (
                    <Text style={styles.priceDetail}>
                      {currentPrice.detail}
                    </Text>
                  )}
                </View>

                {plan.priceOptions && (
                  <View style={styles.priceOptions}>
                    {plan.priceOptions.map((opt) => {
                      const isCurrentDuration =
                        selectedDuration[plan.id] === opt.id;
                      return (
                        <Pressable
                          key={opt.id}
                          style={[
                            styles.priceOption,
                            isCurrentDuration && styles.priceOptionSelected,
                          ]}
                          onPress={() => handleSelectDuration(plan.id, opt.id)}
                        >
                          <Text
                            style={[
                              styles.priceOptionText,
                              isCurrentDuration &&
                                styles.priceOptionTextSelected,
                            ]}
                          >
                            {isCurrentDuration ? "✓ " : "• "}
                            {opt.label}: {opt.value}
                            {opt.detail && ` ${opt.detail}`}
                          </Text>
                        </Pressable>
                      );
                    })}
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
    height: 420,
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
  planCardSelected: {
    borderWidth: 3,
    elevation: 8,
    shadowOpacity: 0.2,
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
  popularText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 11,
  },
  planHeader: {
    paddingVertical: 14,
    alignItems: "center",
  },
  planName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    textTransform: "capitalize",
  },
  planBody: {
    flex: 1,
    paddingHorizontal: 14,
    paddingBottom: 12,
    justifyContent: "space-between",
  },
  priceWrap: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: "800",
    color: "#333",
  },
  priceDetail: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  priceOptions: {
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  priceOption: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginVertical: 2,
  },
  priceOptionSelected: {
    backgroundColor: "#f0f0f0",
  },
  priceOptionText: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },
  priceOptionTextSelected: {
    fontWeight: "600",
    color: "#333",
  },
  featuresScroll: {
    maxHeight: 100,
    marginBottom: 8,
  },
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
  featureText: {
    flex: 1,
    fontSize: 13,
    color: "#444",
    lineHeight: 18,
  },
  selectButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  selectButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  footerNote: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    marginVertical: 18,
  },
});

export default Membresias;
