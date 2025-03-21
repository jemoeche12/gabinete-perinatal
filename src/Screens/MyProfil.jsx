import { StyleSheet, Image, View, Text } from 'react-native'
import React from 'react'
import AddButton from '../components/AddButton'
import { useSelector } from 'react-redux';
import { useGetProfileImageQuery } from '../services/recursosService';

const MyProfil = ({ navigation }) => {

    const { imageCamera, localId } = useSelector(state => state.auth.value)
    

    const { data: imageFromBase } = useGetProfileImageQuery(localId)

    const tomarImagen = () => {
        navigation.navigate("ImagenSeleccionada")
    }

    const imageProfileDefault = "../../assets/img/imageProfile2.png"
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {imageFromBase || imageCamera ?
                    (<Image source={{ uri: imageFromBase?.image || imageCamera }}
                        style={styles.image}
                        resizeMode="cover" />
                    ) :
                    (<Image source={require(imageProfileDefault)} style={styles.image} resizeMode="cover" />)
                }
            </View>
            <AddButton
                onPress={tomarImagen}
                title='Agregar Imagen'
            />
            
        </View>
    )
}

export default MyProfil

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#F8EDE3",

    },
    imageContainer: {
        borderWidth: 3,
        borderColor: "black",
        borderRadius: 55,
        padding: 5,
        marginTop: 50,
        marginBottom: 30
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 50,

    },


})