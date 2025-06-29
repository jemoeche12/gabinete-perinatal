import Navigator from "./src/navigation/Navigator";
import { Provider } from "react-redux";
import store from "./src/store/index.js";
import { useFonts } from "expo-font";
import { StyleSheet, View } from "react-native";

import { DBProvider } from "./src/context/DBContext.js";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Crafty: require("./assets/fonts/CraftyGirls-Regular.ttf"),
  });

  return (
    <SafeAreaView style={styles.container}>
      <DBProvider>
        <Provider store={store}>
          <Navigator />
        </Provider>
      </DBProvider>
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
