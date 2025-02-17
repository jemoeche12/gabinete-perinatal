import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import categories from '../data/categories.json'
import CategoryItem from '../components/CategoryItem'

const Recursos = ({setCategorySelected}) => {
  return (
    <View>
        <FlatList 
        data={categories.sort()}
        renderItem={({item}) => <CategoryItem category={item} selectedCategory={setCategorySelected}/>}
        keyExtractor={element => element}/>
    </View>
  )
}

export default Recursos

const styles = StyleSheet.create({
  
})