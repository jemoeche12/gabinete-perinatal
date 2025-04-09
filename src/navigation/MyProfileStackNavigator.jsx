import { StyleSheet} from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfil from '../Screens/MyProfil';
import ImagenSelector from '../Screens/ImagenSelector';
import CustomHeader from '../components/CustomHeader';

const Stack = createNativeStackNavigator();


const MyProfileStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='MyProfile'
    screenOptions={{
      headerShown:false,
      headerStyle: { backgroundColor: '#F8EDE3' },
      headerTintColor: '#FFF',
    }}>
        <Stack.Screen name="MyProfile" component={MyProfil}/>
        <Stack.Screen name="ImagenSeleccionada" component={ImagenSelector} options={{headerBackVisible: false}}/>
    </Stack.Navigator>
  )
}

export default MyProfileStackNavigator

const styles = StyleSheet.create({})