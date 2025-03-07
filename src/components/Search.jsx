import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';



const Search = ({ onSearch = () => { }, error = "", goBack = () => { } }) => {
  const [busqueda, setBusqueda] = useState("");

  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput}
        value={busqueda}
        onChangeText={setBusqueda}
        placeholder='Search' />
      <Pressable onPress={() => onSearch(busqueda)}>
        <AntDesign name="search1" size={24} color="black" />
      </Pressable>
      <Pressable onPress={() => setBusqueda("")}>
        <FontAwesome5 name="eraser" size={24} color="black" />
      </Pressable>
      <Pressable onPress={goBack}>
        <Entypo name="chevron-with-circle-left" size={24} color="black" />
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
    width: "100%",
    alignItems: "center"
  },
  textInput: {
    color: "black",
    borderColor: "black",
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
  },
});
