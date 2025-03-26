import Navigator from './src/navigation/Navigator';
import { Provider } from 'react-redux';
import store from './src/store/index.js';
import { useFonts } from 'expo-font';
import { View, Text, SafeAreaView, StyleSheet,  } from 'react-native';
import { useEffect } from 'react';
import {useDB} from './src/hooks/useDB.js'


export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Crafty: require("./assets/fonts/CraftyGirls-Regular.ttf"),
  });

  const {initDB} = useDB()

  useEffect(() =>{
    initDB()
  },[])

  if (!fontsLoaded || fontError) {
    return null;
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
    
  },
});