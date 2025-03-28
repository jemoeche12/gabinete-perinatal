import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AddButton = ({title, onPress = () =>{}, }) => {
  return (
    <Pressable onPress={onPress} style={styles.btn}>
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  )
}

export default AddButton

const styles = StyleSheet.create({
    btn: {
        borderRadius: 10,
        backgroundColor: "#B78270",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20
      },
      btnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
      },
})