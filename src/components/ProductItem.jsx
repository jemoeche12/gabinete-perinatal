import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import Card from './Card'

const ProductItem = ({ navigation, product }) => {
    return (
        <Card>
            <Pressable onPress={() => navigation.navigate('Detail', {productId: product.id})}>
                <Text>{product.title}</Text>

            </Pressable>
        </Card>)
}

export default ProductItem

const styles = StyleSheet.create({})