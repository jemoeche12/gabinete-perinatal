import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from './Card'

const ProductItem = ({product}) => {
    return (
        <Card>
            <Text>{product}</Text>
        </Card>)
}

export default ProductItem

const styles = StyleSheet.create({})