import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from './Card'

const ProductItem = ({ product, setItemSelected = () =>{}, }) => {
    return (
        <Card>
            <Pressable onPress={() =>setItemSelected(product.id)}>
                <Text>{product}</Text>

            </Pressable>
        </Card>)
}

export default ProductItem

const styles = StyleSheet.create({})