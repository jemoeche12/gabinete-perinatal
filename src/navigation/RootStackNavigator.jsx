import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottonTabNavigator from './BottonTabNavigator'
import AboutApp from '../Screens/AboutApp'
import FaqScreen from '../Screens/FaqScreen'
import ContactoScreen from '../Screens/ContactoScreen'
import SobreNosotros from '../Screens/SobreNosotros'

const RootStackNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: "fade_from_bottom",
                presentation: 'modal'
            }}>
            <Stack.Screen name="Main" component={BottonTabNavigator} />
            <Stack.Screen name="AboutApp" component={AboutApp} />
            <Stack.Screen name="FaQ" component={FaqScreen} />
            <Stack.Screen name="SobreNosotros" component={SobreNosotros} />
            <Stack.Screen name="ContactoScreen" component={ContactoScreen} />
        </Stack.Navigator>
    )
}

export default RootStackNavigator

const styles = StyleSheet.create({})