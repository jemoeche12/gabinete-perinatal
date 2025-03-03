import { StyleSheet} from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import BottonTabNavigator from './BottonTabNavigator';


const Stack = createNativeStackNavigator();

const Navigator = () => {
    return (
            <NavigationContainer>
                <BottonTabNavigator />
            </NavigationContainer>

    )
}

export default Navigator

const styles = StyleSheet.create({})
