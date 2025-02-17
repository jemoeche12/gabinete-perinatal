import { StyleSheet, Text, View, } from 'react-native'
import { useState } from 'react'
import React from 'react'
import Recursos from './Recursos'
import ItemListCategory from './ItemListCategory'
import Detail from './Detail'

const Informacion = () => {
  const [categorySelected, setCategorySelected] = useState("")
  const [itemSelected, setItemSelected] = useState("")

  return (
    <View>
      {!categorySelected ? (
        <Recursos setCategorySelected={setCategorySelected} />
      ) : !itemSelected ? (
        <ItemListCategory categorySelected={categorySelected} setCategorySelected={setCategorySelected} setItemSelected={setItemSelected} />

      ) : (
        <Detail idSelected={itemSelected} setProductSelected={setItemSelected}/>
      )
      }
    </View>
  )
}

export default Informacion

const styles = StyleSheet.create({})