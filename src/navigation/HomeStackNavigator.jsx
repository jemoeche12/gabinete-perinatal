import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Screens/Home'
import TalleresStackNavigator from './TalleresStackNavigator'

const HomeStackNavigator = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
      headerShown: false,
      headerStyle: { backgroundColor: '#F8EDE3' },
      headerTintColor: '#FFF',
    }}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Talleres' component={TalleresStackNavigator} options={{ headerBackVisible: false, headerShown: false }} />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator

const styles = StyleSheet.create({})