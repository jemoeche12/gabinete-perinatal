import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./AuthStackNavigator";
import { useDispatch, useSelector } from "react-redux";
import { useDBContext } from "../context/DBContext";
import { setUser } from "../features/user/UserSlice";
import RootStackNavigator from "./RootStackNavigator";

const Navigator = () => {
  const { user } = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const { getSession, dbInitialized } = useDBContext();
  useEffect(() => {
    (async () => {
      if (dbInitialized) {
        try {
          const response = await getSession(); 
          if (response) {
            const user = response;
            dispatch(
              setUser({
                email: user.email,
                localId: user.localId,
                idToken: user.token,
              })
            );
          }
        } catch (error) {
          alert(`Error al cargar sesión: ${error.message || error}`);
        }
      } else {
        
        Alert.alert("[Navigator] DB no inicializada aún, esperando...");
      }
    })();
    
  }, [dbInitialized, getSession, dispatch]); 
  return (
    <NavigationContainer>
      {user ? <RootStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
