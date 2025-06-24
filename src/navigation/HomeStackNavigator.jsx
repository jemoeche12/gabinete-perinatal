import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import TalleresStackNavigator from "./TalleresStackNavigator";
import Cart from "../Screens/Cart";

const HomeStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="HomePrincipal"
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#F8EDE3" },
        headerTintColor: "#FFF",
      }}
    >
      <Stack.Screen name="HomePrincipal" component={Home} />
      <Stack.Screen
        name="TalleresMain"
        component={TalleresStackNavigator}
        options={{ headerBackVisible: false, headerShown: false }}
      />
      <Stack.Screen name="ShopingCart" component={Cart} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;

const styles = StyleSheet.create({});
