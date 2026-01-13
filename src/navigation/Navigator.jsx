import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./AuthStackNavigator";
import { useDispatch, useSelector } from "react-redux";
import { useDBContext } from "../context/DBContext";
import { setUser } from "../features/user/UserSlice";
import RootStackNavigator from "./RootStackNavigator";
import { useGetProfileQuery } from "../services/userService";
import Loading from "../Screens/Loading";

const Navigator = () => {
  const dispatch = useDispatch();
  const { getSession, dbInitialized } = useDBContext();
  const authUser = useSelector((state) => state.auth.value);

  const [sessionLoaded, setSessionLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      if (!dbInitialized || sessionLoaded) return;

      try {
        const response = await getSession();

        if (response) {
          dispatch(
            setUser({
              email: response.email,
              localId: response.localId,
              idToken: response.token,
            })
          );
        }

        setSessionLoaded(true);
      } catch (error) {
        alert(`Error al cargar sesión: ${error.message}`);
      }
    })();
  }, [dbInitialized, sessionLoaded]);

  const { data: profileDate, isLoading: profileIsLoading } =
    useGetProfileQuery(authUser.localId, {
      skip: !sessionLoaded || !authUser.localId,
    });

  useEffect(() => {
    if (profileDate && !profileIsLoading) {
      dispatch(
        setUser({
          name: profileDate.name,
          lastName: profileDate.lastName,
          email: profileDate.email,
          localId: profileDate.localId,
          idToken: authUser.idToken,
          membresia: profileDate.membresia,
          role: profileDate.role || "user",
        })
      );
    }
  }, [profileDate, profileIsLoading]);

  if (!sessionLoaded || profileIsLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {authUser?.localId ? <RootStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};
export default Navigator;

const styles = StyleSheet.create({});