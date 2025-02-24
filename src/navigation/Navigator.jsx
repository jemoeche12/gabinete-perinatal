import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Recursos from '../Screens/Recursos';
import ItemListCategory from '../Screens/ItemListCategory';
import Detail from '../Screens/Detail';

const Stack = createNativeStackNavigator(); 

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Recursos" component={Recursos} />
                <Stack.Screen name="ItemListCategory" component={ItemListCategory} />
                <Stack.Screen name="Detail" component={Detail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator

const styles = StyleSheet.create({})
