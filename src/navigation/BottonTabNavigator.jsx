import { StyleSheet, View } from 'react-native'
import React from 'react'
import Home from '../Screens/Home'
import Recursos from '../Screens/Recursos'
import RecursoStackNavigator from './RecursosStackNavigator'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';



const Tab = createBottomTabNavigator();

const BottonTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabBar
            }
            }
        >
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <AntDesign name="home" size={26} color="black" />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen name="Talleres" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <FontAwesome name="book" size={28} color="black" />
                            </View>
                        )
                    }
                }} />
            < Tab.Screen name="Recursos" component={RecursoStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Ionicons name="information-circle-outline" size={28} color="black" />
                            </View>
                        )
                    }
                }} />

            < Tab.Screen name="Perfil" component={Recursos}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <AntDesign name="user" size={28} color="black" />
                            </View>
                        )
                    }
                }}
            />
        </Tab.Navigator >
    )
}

export default BottonTabNavigator

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: "#F8EDE3",
        shadowColor: "black",
        elevation: 4,
        borderRadius: 15,
        height: 60,
    },
});