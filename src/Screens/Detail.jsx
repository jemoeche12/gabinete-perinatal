import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Informathions from '../data/informathions.json'

const Detail = (idSelected, setProductSelected) => {
    const [product, setProduct] = useState()

    useEffect(() => {
        const productSelect = Informathions.find((product) => product.id === idSelected)

        setProduct(productSelect)
    },[idSelected])
  return (
    <View>
      <Text>Detail</Text>
    </View>
  )
}

export default Detail

const styles = StyleSheet.create({})