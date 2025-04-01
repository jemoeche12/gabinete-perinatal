import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const InputForm = ({ onChange, placeholder, label, error = "", isSecure = false }) => {
  const [input, SetInput] = useState("");

  const handleChangeText = (text) => {
    SetInput(text)
    onChange(text)

  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={styles.textInput}
        value={input}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        secureTextEntry={isSecure} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

export default InputForm

const styles = StyleSheet.create({})