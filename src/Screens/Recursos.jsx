import { FlatList, StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'
import CategoryItem from '../components/CategoryItem'
import { useGetCategoriesQuery } from '../services/recursosService'
import CustomHeader from '../components/CustomHeader'
import MenuDesplegable from '../components/MenuDesplegable'

const Recursos = ({ navigation, visible }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(visible)

  const { data } = useGetCategoriesQuery()

  const toggleMenu = () =>{
    setIsMenuVisible(!isMenuVisible)

  }


  return (
    <>
    <CustomHeader onMenuPress={toggleMenu} />
    {isMenuVisible && <MenuDesplegable onClose={toggleMenu} visible={isMenuVisible} />}
     <FlatList
      style={styles.container}
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <CategoryItem category={item} navigation={navigation} />
      )}
      ListHeaderComponent={
        <View style={styles.view}>
          <Text style={styles.text}>
            Hemos organizado el contenido en diferentes botones temáticos, para que puedas acceder fácilmente a la información que más te interesa:{"\n"}{"\n"}

            - Encuentra información sobre cambios físicos y emocionales, preparación para el parto y autocuidado. {"\n"}{"\n"}
            - Consejos y herramientas para acompañar activamente en todo el proceso.{"\n"}{"\n"}
            - Guía sobre cómo brindar apoyo desde la empatía y el amor.{"\n"}{"\n"}
            - Recursos para fortalecer el lazo con tu bebé desde el nacimiento.{"\n"}{"\n"}
            - Respuestas a preguntas comunes sobre la gestación y el posparto.{"\n"}{"\n"}

            Cada botón te llevará a contenido especializado, elaborado por profesionales de la psicología perinatal.{"\n"}{"\n"}

            Explora, aprende y vive esta etapa con toda la información. Estamos aquí para acompañarte.{"\n"}{"\n"}
          </Text>
        </View>
      }
      contentContainerStyle={styles.list}
    />
    </>
  )
}

export default Recursos

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8EDE3",
    flex: 1, 
  },
  view: {
    marginTop: 40,
  },
  text: {
    fontFamily: "Crafty",
    width: "90%",
    marginHorizontal: "5%",
    fontSize: 24,
  },
  list: {
    paddingBottom: 40,
  },
})
