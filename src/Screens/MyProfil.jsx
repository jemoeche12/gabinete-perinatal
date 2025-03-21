import { StyleSheet, Image, View, Text } from 'react-native'
import React from 'react'
import AddButton from '../components/AddButton'
import { useSelector } from 'react-redux';
import { useGetProfileImageQuery } from '../services/recursosService';

const MyProfil = ({ navigation }) => {

    const { imageCamera, localId, user } = useSelector(state => state.auth.value)


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
            <View style={styles.userInfoContainer}>
                <Text style={styles.userInfoText}>Nombre: {user?.name || "No disponible"}</Text>
                <Text style={styles.userInfoText}>Apellido: {user?.lastname || "No disponible"}</Text>
                <Text style={styles.userInfoText}>Email: {user?.email || "No disponible"}</Text>
            </View>


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
    },
    userInfoText: {
        fontSize: 18,
        color: "#333",
        marginVertical: 15,
    },

})