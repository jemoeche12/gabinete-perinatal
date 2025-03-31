import { StyleSheet} from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfil from '../Screens/MyProfil';
import ImagenSelector from '../Screens/ImagenSelector';

const Stack = createNativeStackNavigator();


const MyProfileStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='MyProfile'
    screenOptions={{headerShown: false}}>
        <Stack.Screen name="MyProfile" component={MyProfil}/>
        <Stack.Screen name="ImagenSeleccionada" component={ImagenSelector}/>
    </Stack.Navigator>
  )
}

export default MyProfileStackNavigator

const styles = StyleSheet.create({})