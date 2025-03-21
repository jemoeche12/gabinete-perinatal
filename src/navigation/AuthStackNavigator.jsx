import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import Loading from '../Screens/Loading';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {

    return (
        <Stack.Navigator initialRouteName='Loading'screenOptions={{headerShown: false}}>
            <Stack.Screen name='Loading' component={Loading} />
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator

const styles = StyleSheet.create({})