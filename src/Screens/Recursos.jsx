import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import categories from '../data/categories.json'
import CategoryItem from '../components/CategoryItem'

const Recursos = ({navigation}) => {
  return (
    <View style={styles.container}>
        <FlatList 
        showsVerticalScrollIndicator={false}
        data={categories.sort()}
        renderItem={({item}) => <CategoryItem category={item} navigation={navigation}/>}
        keyExtractor={element => element}/>
    </View>
  )
}

export default Recursos

const styles = StyleSheet.create({
  container:{
    marginVertical: 40
  }
})