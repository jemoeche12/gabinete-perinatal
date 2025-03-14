import Navigator from './src/navigation/Navigator';
import { Provider } from 'react-redux';
import store from './src/store/index.js';
import { useFonts } from 'expo-font';
import { View, Text, SafeAreaView, StyleSheet,  } from 'react-native';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Crafty: require("./assets/fonts/CraftyGirls-Regular.ttf"),
    Lora: require("./assets/fonts/Lora-Italic-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded || fontError) {
    return <View><Text>Cargando fuentes...</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },
});