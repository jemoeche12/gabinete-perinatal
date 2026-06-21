import Navigator from "./src/navigation/Navigator";
import { Provider } from "react-redux";
import store from "./src/store/index.js";
import { useFonts } from "expo-font";
import { Alert, StyleSheet, View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { DBProvider } from "./src/context/DBContext.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { StripeProvider } from "@stripe/stripe-react-native";
import { initStripe } from "@stripe/stripe-react-native";
import Crafty from "./assets/fonts/Roboto-VariableFont_wdth,wght.ttf";
import { usePaymentProvider } from "./src/hooks/usePaymentProvider.js";
import { setPaymentProvider } from "./src/features/app/AppSlice";

const publishableKey =
  "pk_live_51RgMO7JxSsF9oReV1O98dFvKTsscQQgIjj3EcnHLZs7P6nG1F28PAy5veCvpm8j0h7fi2Vm5Xq0yAuxpwUJqSNv20049FC0FqK";

function AppComponent() {
  const [fontsLoaded] = useFonts({
    Roboto400: Crafty,
  });

  const { provider, country, loading } = usePaymentProvider();
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        if (!publishableKey) {
          throw new Error("Stripe publishable key is missing");
        }

        await initStripe({
          publishableKey: publishableKey,
        });
      } catch (error) {
        console.error("Stripe initialization error:", error);
        Alert.alert("❌ Error al inicializar Stripe:", error.message);
      }
    };
    initializeStripe();
  }, [publishableKey]);

  useEffect(() => {
    if (!loading && provider) {
      dispatch(setPaymentProvider({ provider, country }));
    }
  }, [loading, provider, country, dispatch]);

  if (!fontsLoaded) {
    return (
      <View style={styles.initialLoadingContainer}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StripeProvider publishableKey={publishableKey}>
        <DBProvider>
          <Navigator />
        </DBProvider>
      </StripeProvider>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppComponent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  initialLoadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
