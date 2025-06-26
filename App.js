// App.js
import Navigator from "./src/navigation/Navigator";
import { Provider } from "react-redux";
import store from "./src/store/index.js";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

import { DBProvider } from "./src/context/DBContext.js";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Crafty: require("./assets/fonts/CraftyGirls-Regular.ttf"),
  });

  if (!fontsLoaded || fontError) {
    return (
      <View style={styles.initialLoadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando fuentes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DBProvider>
        <Provider store={store}>
          <Navigator />
        </Provider>
      </DBProvider>
    </View>
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
