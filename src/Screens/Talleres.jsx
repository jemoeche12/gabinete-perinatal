import { ImageBackground, ScrollView, StyleSheet, Text, } from 'react-native'
import React from 'react'
import { useState } from 'react'
import FuncionTalleres from '../components/FuncionTalleres'
import fondo from '../../assets/img/fondoTalleres.png'
import AddButton from '../components/AddButton'
import CustomHeader from '../components/CustomHeader'
import MenuDesplegable from '../components/MenuDesplegable'

const Talleres = ({ navigation, visible }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(visible);
    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    }

    return (
        <>
            <CustomHeader onMenuPress={toggleMenu} />
            {isMenuVisible && <MenuDesplegable onClose={toggleMenu} visible={isMenuVisible} />}
            <ImageBackground source={fondo} style={styles.background}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.title}>Te damos la bienvenida a la sección TALLERES de  Red de Apoyo Perinatal Digital, un espacio diseñado para acompañarte en el camino de la maternidad y paternidad con información especializada y un espacio de escucha profesional.</Text>
                    <FuncionTalleres />
                    <AddButton title="Descubrir Talleres" onPress={() => navigation.navigate('ListTalleres')} />
                </ScrollView>
            </ImageBackground>
        </>
    )
}

export default Talleres

const styles = StyleSheet.create({
    background: {
        flex: 1,
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        resizeMode: "cover",

    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",

    },

    title: {
        fontSize: 24,
        color: "black",
        marginTop: 35,
        textAlign: "center",
        padding: 20,
        fontFamily: "Crafty"
    }

})