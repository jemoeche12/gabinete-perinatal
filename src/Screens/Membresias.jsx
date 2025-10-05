import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const membresias = [{
    id: 1,
    nombre: 'Membresia 1',
    descripcion: 'Descripcion 1',
    precio: 100,
    beneficios: ['Beneficio 1', 'Beneficio 2'],
    permisos: ['Permiso 1', 'Permiso 2']
}]

const Membresias = () => {
  return (
    <View>
        {membresias.map(membresia => (
          <View key={membresia.id}>
            <Text>{membresia.nombre}</Text>
            <Text>{membresia.descripcion}</Text>
            <Text>{membresia.precio}</Text>
            <Text>{membresia.beneficios.join(', ')}</Text>
          </View>
        ))}
      <Text>Membresias</Text>
      <Pressable onPress={() => alert('Hola')}>
        
        <Text>Comprar</Text>
      </Pressable>
    </View>
  )
}

export default Membresias

const styles = StyleSheet.create({})