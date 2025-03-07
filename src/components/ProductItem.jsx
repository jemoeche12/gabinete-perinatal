import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import Card from './Card'
import { useDispatch } from 'react-redux'
import { setIdSelected } from '../features/recursos/InformacionSlice'

const ProductItem = ({ navigation, product }) => {
    const dispatch = useDispatch()

    const handleNavigate = () => {
        dispatch(setIdSelected(product.title))
        navigation.navigate('Detail', {productId: product.id})    }

    return (
        <Card>
            <Pressable onPress={handleNavigate}>
                <Text>{product.title}</Text>

            </Pressable>
        </Card>)
}

export default ProductItem

const styles = StyleSheet.create({})