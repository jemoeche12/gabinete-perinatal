import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-web'
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";



const Search = ({ onSearch = () => {}, error = "", goBack = () => {} }) => {
    const [busqueda, setBusqueda] = useState("");
    
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput}
        value={busqueda}
        onChangeText={setBusqueda} 
        placeholder='Search'/>
    <Pressable onPress={() => onSearch(busqueda)}>
        <FontAwesome name="search" size={24} color="black" />
      </Pressable>
      <Pressable onPress={() => setBusqueda("")}>
        <FontAwesome5 name="eraser" size={24} color="black" />
      </Pressable>
      <Pressable onPress={goBack}>
        <AntDesign name="back" size={24} color="black" />
      </Pressable>
      {error ? <Text>{error}</Text> : null}

    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    width: "100%"
  },
  textInput:{
    color: "black",

  }
})