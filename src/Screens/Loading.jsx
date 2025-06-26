import React, { useEffect } from "react";
import {
    View,
    Text,
    ImageBackground,
    ActivityIndicator,
    StyleSheet,
    Alert 
} from "react-native";
import fondoInicio from "../../assets/img/fondo.jpg"; 

import { useDBContext } from '../context/DBContext'; 

const Loading = ({ navigation }) => {
    const { dbInitialized, dbError } = useDBContext();

    useEffect(() => {
        if (dbInitialized && !dbError) {
            const timer = setTimeout(() => {
                navigation.replace("Login");
            }, 3500); 
            return () => clearTimeout(timer); 
        } else if (dbError) {
            Alert.alert(
                "Error Crítico",
                `No se pudo inicializar la base de datos: ${dbError.message}. Por favor, reinicie la aplicación.`,
                [{ text: "OK", onPress: () => {} }]
            );
        }
    }, [dbInitialized, dbError, navigation]);

    return (
        <View style={styles.container}>
            <ImageBackground source={fondoInicio} style={styles.background} >
                <Text style={styles.appName}>Bienvenidos a tu red Perinatal Digital</Text>
                {!dbInitialized && !dbError && (
                    <ActivityIndicator size="large" color="#B78270" style={styles.loader} />
                )}
                {dbError && (
                    <Text style={styles.errorText}>Error al cargar datos. Reinicie la aplicación.</Text>
                )}
            </ImageBackground>
        </View>
    );
};

export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appName: {
        color: "#B78270",
        fontSize: 36,
        textAlign: "center",
        fontFamily: "Crafty",
        marginBottom: "90%",
        width: "70%",
        marginLeft: -75
    },
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover",
    },
    loader: {
        marginTop: 20,
    },
    errorText: {
        marginTop: 20,
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 20,
    }
});