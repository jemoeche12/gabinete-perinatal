import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Talleres from "../Screens/Talleres";
import ListTalleres from "../Screens/ListTalleres";
import DetailTalleres from "../Screens/DetailTalleres";

import IdTalleres from "../Screens/IdTalleres";

const Stack = createNativeStackNavigator();

const TalleresStackNavigator = () => {  
    return (
        <Stack.Navigator initialRouteName="Talleres" screenOptions={{ headerShown: false, headerStyle: { backgroundColor: "#F8EDE3" } }}>
            <Stack.Screen name= "Talleres" component={Talleres} />
            <Stack.Screen name= "ListTalleres" component={ListTalleres} />
            <Stack.Screen name= "IdTalleres" component={IdTalleres} />
            <Stack.Screen name= "DetailTalleres" component={DetailTalleres} />
        </Stack.Navigator>
    )
}

export default TalleresStackNavigator;