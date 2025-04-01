import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import AddButton from '../components/AddButton'
import { useDispatch, useSelector } from 'react-redux';
import { useGetProfileImageQuery } from '../services/recursosService';
import { useDB } from '../hooks/useDB';
import { clearUser } from '../features/user/UserSlice';

const MyProfil = ({ navigation }) => {

    const { imageCamera, localId, user } = useSelector(state => state.auth.value)

    const { data: imageFromBase } = useGetProfileImageQuery(localId)
    const { truncateSessionTable } = useDB()
    const dispatch = useDispatch()

    const tomarImagen = () => {
        navigation.navigate("ImagenSeleccionada")
    }
    const cerrarSesion = async () => {
        try {
            const response = await truncateSessionTable()
            dispatch(clearUser())
        } catch (error) {
            alert(error)
        }
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
            <AddButton onPress={cerrarSesion} title="Cerrar Sesion" />
            <Image style={styles.imagen}
                source={require("../../assets/IconApp3.png")}
                resizeMode="cover"
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
    userInfoContainer: {
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        alignItems: "center",
        width: "75%",
        height: "auto"
    },
    userInfoText: {
        fontSize: 18,
        color: "#333",
        marginVertical: 15,
    },
    imagen:{
        height: 300,
        width: 300,
    }

})