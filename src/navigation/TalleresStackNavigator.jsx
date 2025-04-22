import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Talleres from "../Screens/Talleres";
import ListTalleres from "../Screens/ListTalleres";
import DetailTalleres from "../Screens/DetailTalleres";
import ContactoScreen from "../Screens/ContactoScreen";
import AboutApp from "../Screens/AboutApp";
import IdTalleres from "../Screens/IdTalleres";

const Stack = createNativeStackNavigator();

const TalleresStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Talleres" screenOptions={{
            headerShown: false,
            headerStyle: { backgroundColor: '#F8EDE3' },
            headerTintColor: '#FFF',
        }}>
            <Stack.Screen name="Talleres" component={Talleres} options={{ headerBackVisible: false }} />
            <Stack.Screen name="ListTalleres" component={ListTalleres} options={{ headerBackVisible: false }} />
            <Stack.Screen name="IdTalleres" component={IdTalleres} options={{ headerBackVisible: false }} />
            <Stack.Screen name="DetailTalleres" component={DetailTalleres} options={{ headerBackVisible: false }} />
        </Stack.Navigator>
    )
}

export default TalleresStackNavigator;