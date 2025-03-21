import { Image, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import AddButton from '../components/AddButton'
import { useDispatch, useSelector } from 'react-redux'
import { usePostProfileImageMutation } from '../services/recursosService'
import * as ImagePicker from 'expo-image-picker';
import { setImageCamera } from '../features/user/UserSlice'

const ImagenSelector = ({ navigation }) => {
  const [image, setImage] = useState(null)
  const [triggerPostImage, result] = usePostProfileImageMutation()

  const { localId } = useSelector(state => state.auth.value)

  const dispatch = useDispatch()

  const verifyCameraPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync()
    return granted
  }

  const pickImage = async () => {
    try {
      const permisionCamera = await verifyCameraPermission()
      if (permisionCamera) {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: (ImagePicker.MediaType = ["images", "videos"]),
          allowsEditing: true,
          aspect: [1, 1],
          base64: true,
          quality: 0.2

        })
        if (!result.canceled) {
          const img = `data:image/jpg;base64,${result.assets[0].base64}`
          setImage(img)
        }
      }
    } catch (error) {
      alert(error)
    }

  }

  const confirmImage = () => {
    try {
      dispatch(setImageCamera(image))
      triggerPostImage({ localId, image })
      navigation.goBack()

    } catch (erro) {
      alert(erro)
    }
  }

  return (

    <View style={styles.container}>
      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <AddButton
            title="Tomar otra Foto"
            onPress={pickImage} />
          <AddButton
            title="Confirmar Foto"
            onPress={confirmImage}
          />
        </>
      ) :
        (
          <><View style={styles.noFotoContainer}>
            <Text>No hay ninguna Foto</Text>
          </View>
            <AddButton 
            title="Tomar una Foto" 
            onPress={pickImage}/>
          </>

        )}
    </View>
  )
}

export default ImagenSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  noFotoContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
