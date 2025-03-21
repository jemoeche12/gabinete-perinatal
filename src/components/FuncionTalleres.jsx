import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FuncionTalleres = () => {
    return (
        <View>
            <Text style={styles.title}>¿Como Funcionan los Talleres?</Text>
            <Text style={styles.description}>- Frecuencia: 1 vez por mes, los días sábado.{"\n"}{"\n"}

                - Modalidad: Talleres online en vivo con una psicóloga perinatal.{"\n"}{"\n"}

                - Atención personalizada: Con la adquisición de cada taller, tendrás una sesión individual personalizada conmigo para resolver dudas, brindar apoyo o, si es necesario, iniciar un espacio de escucha e intercambio.{"\n"}{"\n"}

                - Flexibilidad: Podrás elegir el horario de tu sesión individual según tu disponibilidad en un calendario habilitado.{"\n"}{"\n"}

                ¿Cómo participar?{"\n"}{"\n"}

                1️ - Elige el taller que más te interese.{"\n"}{"\n"}
                2️ - Inscríbete y accede al enlace del taller en vivo.{"\n"}{"\n"}
                3️ - Selecciona en el calendario el horario de tu sesión personalizada.{"\n"}{"\n"}
                4️ - Disfruta de un espacio de aprendizaje y acompañamiento con una psicóloga perinatal.
            </Text>
        </View>
    )
}

export default FuncionTalleres

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: "black",
        marginTop: 30,
        textAlign: "center",
        fontFamily: "Crafty",
        padding: 20,

    },
    description: {  
        fontSize: 20,
        color: "black",
        textAlign: "center",
        padding: 20,
        marginBottom: 50,
        fontFamily:"Crafty"
    }
})