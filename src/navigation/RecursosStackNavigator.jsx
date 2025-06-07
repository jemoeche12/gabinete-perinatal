import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Recursos from '../Screens/Recursos';
import ItemListCategory from '../Screens/ItemListCategory';
import Detail from '../Screens/Detail';



const Stack = createNativeStackNavigator();

const RecursoStackNavigator = () => {
  return (

    <Stack.Navigator screenOptions={{
      headerShown: false,
      headerStyle: { backgroundColor: '#F8EDE3' },
      headerTintColor: '#FFF',
    }}>
      <Stack.Screen name="Recursos" component={Recursos} />
      <Stack.Screen name="ItemListCategory" component={ItemListCategory} options={{ headerBackVisible: false }} />
      <Stack.Screen name="Detail" component={Detail} options={{ headerBackVisible: false }} />
    </Stack.Navigator>
  )
}

export default RecursoStackNavigator

const styles = StyleSheet.create({})
