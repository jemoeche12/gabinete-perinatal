import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Guias from "../Screens/Guias";
import GuidesListCategory from "../Screens/GuidesListCategory";
import GuidesDetailScreen from "../Screens/GuidesDetailScreen";
import UpdateMembresias from "../Screens/UpdateMembresias";



const GuidesStackNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Guides" screenOptions={{
            headerShown: false,
            headerStyle: { backgroundColor: "#F8EDE3" },
            headerTintColor: "#FFF",
        }}>
            <Stack.Screen name="Guides" component={Guias} />
            <Stack.Screen name="GuidesList" component={GuidesListCategory} />
            <Stack.Screen name="GuidesDetailScreen" component={GuidesDetailScreen} />
            <Stack.Screen name= "UpdateMembresias" component={UpdateMembresias} />
        </Stack.Navigator>
    )
}


export default GuidesStackNavigator;