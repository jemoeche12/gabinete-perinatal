import Navigator from "./src/navigation/Navigator";
import { Provider } from "react-redux";
import store from "./src/store/index.js";
import { useFonts } from "expo-font";
import { Alert, StyleSheet, View, Text } from "react-native";
import { useEffect } from "react";
import { DBProvider } from "./src/context/DBContext.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { StripeProvider } from "@stripe/stripe-react-native";
import { initStripe } from "@stripe/stripe-react-native";
import Crafty from './assets/fonts/Roboto-VariableFont_wdth,wght.ttf';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto400': Crafty,
  });
 
  const publishableKey = "pk_test_51RgMQYFJ1XWiS5lgnsf5LvM6aKn6ZmrtBjcTGHCwlxPs28n50bmTl61uWTMLjz6IHtvcebTXzFOaiva7tL00UrQR00bbRVxX57";

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
          <Provider store={store}>
            <Navigator />
          </Provider>
        </DBProvider>
      </StripeProvider>
    </SafeAreaView>
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