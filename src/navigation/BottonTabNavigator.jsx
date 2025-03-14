import { StyleSheet, View } from 'react-native'
import React from 'react'
import Home from '../Screens/Home'
import Recursos from '../Screens/Recursos'
import RecursoStackNavigator from './RecursosStackNavigator'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TalleresStackNavigator from './TalleresStackNavigator'



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
            <Tab.Screen name="Talleres" component={TalleresStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Ionicons name="book-outline" size={28} color="black" />
                            </View>
                        )
                    }
                }} />
            < Tab.Screen name="Recursos" component={RecursoStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <AntDesign name="folderopen" size={28} color="black" />
                            </View>
                        )
                    }
                }} />

            < Tab.Screen name="Perfil" component={Recursos}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <AntDesign name="team" size={28} color="black" />
                            </View>
                        )
                    }
                }}
            />
            < Tab.Screen name="Test" component={Recursos}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <MaterialCommunityIcons name="head-question-outline" size={28} color="black" />
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
        height: 60,
    },
});