import React, { useEffect } from "react";
import {
    View,
    Text,
    ImageBackground,
    ActivityIndicator,
    StyleSheet,
    Alert 
} from "react-native";
import fondoInicio from "../../assets/fondoApp.png"; 

import { useDBContext } from '../context/DBContext'; 

const Loading = ({ navigation }) => {
    const { dbInitialized, dbError } = useDBContext();

    useEffect(() => {
        if (dbInitialized && !dbError) {
            const timer = setTimeout(() => {
                navigation.replace("Login");
            }, 5000); 
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