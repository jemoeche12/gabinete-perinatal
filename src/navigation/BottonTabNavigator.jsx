import { StyleSheet, View } from 'react-native'
import React from 'react'
import Home from '../Screens/Home'
import RecursoStackNavigator from './RecursosStackNavigator'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MyProfileStackNavigator from './MyProfileStackNavigator'
import TalleresStackNavigator from './TalleresStackNavigator'
import TestStackNavigator from './TestStackNavigator'
import HomeStackNavigator from './HomeStackNavigator'



const Tab = createBottomTabNavigator();

const BottonTabNavigator = () => {
    return (
        <Tab.Navigator
  screenOptions={{
    tabBarStyle: styles.tabBar,
  }}
>
  <Tab.Screen
    name="Home"
    component={HomeStackNavigator}
    options={{
      headerShown: false, 
      tabBarIcon: () => (
        <AntDesign name="home" size={26} color="black" />
      ),
    }}
  />
  <Tab.Screen
    name="Talleres"
    component={TalleresStackNavigator}
    options={{
      headerShown: false, 
      tabBarIcon: () => (
        <Ionicons name="book-outline" size={28} color="black" />
      ),
    }}
  />
  <Tab.Screen
    name="Recursos"
    component={RecursoStackNavigator}
    options={{
      headerShown: false,
      tabBarIcon: () => (
        <AntDesign name="folderopen" size={28} color="black" />
      ),
    }}
  />
  <Tab.Screen
    name="Test"
    component={TestStackNavigator}
    options={{
      headerShown: false,
      tabBarIcon: () => (
        <MaterialCommunityIcons name="head-question-outline" size={28} color="black" />
      ),
    }}
  />
  <Tab.Screen
    name="Perfil"
    component={MyProfileStackNavigator}
    options={{
      headerShown: false,
      tabBarIcon: () => (
        <AntDesign name="team" size={28} color="black" />
      ),
    }}
  />
</Tab.Navigator>
    )
}

export default BottonTabNavigator

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: "#F8EDE3",
        shadowColor: "black",
        elevation: 4,
        height: 60,
    },
});