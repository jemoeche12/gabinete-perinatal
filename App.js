import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import Home from './src/Screens/Home';
import Recursos from './src/Screens/Recursos';
import ItemListCategory from './src/Screens/ItemListCategory';
import Informacion from './src/Screens/informacion';
import Navigator from './src/navigation/Navigator';

export default function App() {
  return (
      <Navigator />
  );
}

