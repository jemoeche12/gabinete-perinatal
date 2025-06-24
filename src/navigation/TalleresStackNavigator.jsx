import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Talleres from "../Screens/Talleres";
import ListTalleres from "../Screens/ListTalleres";
import DetailTalleres from "../Screens/DetailTalleres";
import IdTalleres from "../Screens/IdTalleres";

const Stack = createNativeStackNavigator();

const TalleresStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="TalleresMain" screenOptions={{
            headerShown: false,
            headerStyle: { backgroundColor: '#F8EDE3' },
            headerTintColor: '#FFF',
        }}>
            <Stack.Screen name="TalleresMain" component={Talleres} options={{ headerBackVisible: false }} />
            <Stack.Screen name="ListTalleres" component={ListTalleres} options={{ headerBackVisible: false }} />
            <Stack.Screen name="IdTalleres" component={IdTalleres} options={{ headerBackVisible: false }} />
            <Stack.Screen name="DetailTalleres" component={DetailTalleres} options={{ headerBackVisible: false }} />
        </Stack.Navigator>
    )
}

export default TalleresStackNavigator;