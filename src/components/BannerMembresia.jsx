import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'

const BannerMembresia = ({ requiredLevel, onNavigateToPlans, onClose }) => {
    
    const formattedLevel = requiredLevel 
        ? requiredLevel.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
        : 'premium'; 
    
    const colorMap = {
        premium: '#B78270', 
        intermedio: '#C9A690',
        basico: '#E8D5C4',
    };

    const bannerColor = colorMap[requiredLevel] || '#B78270';
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Contenido exclusivo!</Text>
            <Text style={styles.text}>
                Se requiere el plan **{formattedLevel}** para acceder a este recurso.
            </Text>
            
            <View style={styles.buttonContainer}>
                
                <TouchableOpacity 
                    style={[styles.primaryButton, { backgroundColor: bannerColor }]} 
                    onPress={onNavigateToPlans} 
                    activeOpacity={0.8}
                >
                    <Text style={styles.primaryButtonText}>Ver Planes de Membresía</Text>
                </TouchableOpacity>
                
                <Pressable
                    style={[styles.secondaryButton, { borderColor: bannerColor }]}
                    onPress={onClose} 
                    android_ripple={{ color: '#EAEAEA' }}
                >
                    <Text style={[styles.secondaryButtonText, { color: bannerColor }]}>Cerrar</Text>
                </Pressable>
            
            </View>
        </View>
    )
}

export default BannerMembresia

const styles = StyleSheet.create({
    container: {
        width: '85%', 
        maxWidth: 400,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        elevation: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
        textAlign: 'center',
    },
    text: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20, 
        textAlign: 'center',
    },
    
    buttonContainer: {
        gap: 10, 
    },
    primaryButton: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    primaryButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 15,
    },
    secondaryButton: {
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 2, 
        marginTop: 5,
    },
    secondaryButtonText: {
        fontWeight: '700',
        fontSize: 14,
    }
});