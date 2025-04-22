import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import CustomHeader from '../components/CustomHeader'
import MenuDesplegable from '../components/MenuDesplegable'

const AboutApp = ({visible}) => {
    const [isMenuVisible, setIsMenuVisible] = useState(visible)

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible)

    }
    return (
        <>
            <CustomHeader onMenuPress={toggleMenu}/>
            {isMenuVisible && <MenuDesplegable onClose={toggleMenu} visible={isMenuVisible} />}
            <ScrollView style={styles.container}>
                <Text style={styles.title}>
                    Red Perinatal Digital: {'\n'}{'\n'}

                    Un espacio diseñado para mamás, papás y acompañantes emocionales que buscan información, contención y herramientas para transitar el embarazo, el parto, el posparto y la crianza con mayor seguridad y conciencia.
                </Text>
                <Text style={styles.subtitle}>
                    ¿Qué encontrarás en la app?

                    Recursos con información confiable y actualizada sobre cada etapa del proceso perinatal.
                    Tests interactivos para reflexionar en familia y fortalecer los vínculos emocionales.
                    Talleres virtuales sobre diversas temáticas perinatales, accesibles desde cualquier lugar.
                </Text>
                <Text style={styles.subtitleTaller}>
                    Cada taller incluye una sesión personalizada con una psicóloga perinatal para despejar dudas en el horario y día que más te convenga.
                </Text>
                <Text style={styles.subtitleCalendar}>
                    Calendario de turnos online para consultas individuales con profesionales especializados en psicología perinatal.
                </Text>
                <Text style={styles.subtitle}>
                    Un espacio pensado para todas las familias, sin importar dónde estén, con la posibilidad de acceder a información de calidad y acompañamiento profesional.{'\n'}{'\n'}
                
                    ¡Gracias por usar nuestra aplicación!
                </Text>
            </ScrollView>
        </>
    )
}

export default AboutApp

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F8EDE3",
        flex: 1,
    },
    title:{
        fontFamily: "Crafty",
        fontSize: 20,
        width: "90%",
        marginHorizontal: "5%", 
        marginTop: 20
    },
    subtitle:{
        fontFamily: "Crafty",
        fontSize: 20,
        width: "90%",
        marginHorizontal: "5%", 
        marginVertical: 30
    },
    subtitleTaller:{
        fontFamily: "Crafty",
        fontSize: 20,
        width: "90%",
        marginHorizontal: "5%", 
        marginTop: 20,
        marginBottom: 20
    },
    
    subtitleCalendar:{
        fontFamily: "Crafty",
        fontSize: 20,
        width: "90%",
        marginHorizontal: "5%", 
        marginTop: 20,
        marginBottom: 20
    },
})