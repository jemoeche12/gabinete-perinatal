import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import Loading from '../Screens/Loading';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {

    return (
        <Stack.Navigator initialRouteName='Loading'screenOptions={{
            headerShown:false,
            headerStyle: { backgroundColor: '#F8EDE3' },
            headerTintColor: '#FFF',
          }}>
            <Stack.Screen name='Loading' component={Loading} options={{headerBackVisible: false}}/>
            <Stack.Screen name='Signup' component={Signup} options={{headerBackVisible: false}} />
            <Stack.Screen name='Login' component={Login} options={{headerBackVisible: false}} />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator

const styles = StyleSheet.create({})