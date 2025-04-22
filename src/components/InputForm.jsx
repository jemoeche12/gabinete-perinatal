import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const InputForm = ({ onChangeText, placeholder, label, error = "", isSecure = false }) => {
  const [input, SetInput] = useState("");

  const handleChangeText = (text) => {
    SetInput(text)
    onChangeText(text)

  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        secureTextEntry={isSecure} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

export default InputForm

const styles = StyleSheet.create({
   input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    fontFamily: "Crafty",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
})