import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import CategoryItem from '../components/CategoryItem'
import { useGetCategoriesQuery } from '../services/recursosService'

const Recursos = ({navigation}) => {

  const {data} = useGetCategoriesQuery()
  return (
    <View style={styles.container}>
        <FlatList 
        showsVerticalScrollIndicator={false}
        data={data}
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