import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Talleres from "../Screens/Talleres";
import DetalleTalleres from "../Screens/DetalleTalleres";



const Stack = createNativeStackNavigator();

const TalleresStackNavigator = () => {  
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, headerStyle: { backgroundColor: "#F8EDE3" } }}>
            <Stack.Screen name= "TalleresStackNavigator" component={Talleres}/>
            <Stack.Screen name= "DetalleTalleres" component={DetalleTalleres}/>
        </Stack.Navigator>
    )
}

export default TalleresStackNavigator;