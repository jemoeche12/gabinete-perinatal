import { StyleSheet, Text, View, } from 'react-native'
import { useState } from 'react'
import React from 'react'
import Recursos from './Recursos'
import ItemListCategory from './ItemListCategory'
import Detail from './Detail'

const Informacion = () => {
  const [categorySelected, setCategorySelected] = useState("")
  const [itemIdSelected, setItemIdSelected] = useState("")

  return (
    <View>
      {!categorySelected ? (
        <Recursos setCategorySelected={setCategorySelected} />
      ) : !itemIdSelected ? (
        <ItemListCategory categorySelected={categorySelected}
         setCategorySelected={setCategorySelected}
          setItemIdSelected={setItemIdSelected} />

      ) : (
        <Detail 
        idSelected={itemIdSelected} 
        setProductSelected={setItemIdSelected}/>
      )
      }
    </View>
  )
}

export default Informacion

const styles = StyleSheet.create({})