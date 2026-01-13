import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Duelo from "../Screens/Duelo";
import ItemListDuelo from "../Screens/ItemListDuelo";
import DueloDetail from "../Screens/DueloDetail";
import UpdateMembresias from "../Screens/UpdateMembresias";

const Stack = createNativeStackNavigator();

const DueloStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="DueloMain" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="DueloMain"
        component={Duelo}
        options={{ headerBackVisible: false,}}
      />
      <Stack.Screen
        name="ItemListDuelo"
        component={ItemListDuelo}
        options={{ headerBackVisible: false }}
      />
      <Stack.Screen
        name="DueloDetail"
        component={DueloDetail}
        options={{ headerBackVisible: false }}
      />
      <Stack.Screen
        name="UpdateMembresias"
        component={UpdateMembresias}
        options={{ headerBackVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default DueloStackNavigator;
