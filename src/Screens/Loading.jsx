import React, { useEffect } from "react";
import {
    View,
    Text,
    ImageBackground,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import fondoInicio from "../../assets/img/fondo.jpg"

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace("Login");
        }, 5000);
        return () => clearTimeout(timer)
    }, [navigation])


    return (
        <View style={styles.container}>
            <ImageBackground source={fondoInicio} style={styles.background} >
                <Text style={styles.appName}>Bienvenidos a tu red Perinatal Digital</Text>
                <ActivityIndicator size="large" color="#B78270" style={styles.loader} />
            </ImageBackground>
        </View>
    );
};

export default LoadingScreen;

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
});
