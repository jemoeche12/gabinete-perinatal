import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const CarrouselTalleres = () => {
    return (
        <View>
            <Text>¿Quieres saber más sobre los talleres?</Text>
            <Image source={require('../../assets/img/lactancia.jpg')} />
        </View>
    )
}

export default CarrouselTalleres

const styles = StyleSheet.create({})