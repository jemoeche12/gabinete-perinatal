import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useGetTallerByIdQuery } from '../services/talleresService';
import CardTalleres from '../components/CardTalleres';

const IdTalleres = ({ route, navigation }) => {
    const { tallerId } = route.params || {};
    const { data: taller, error, isLoading } = useGetTallerByIdQuery(tallerId);

    if (isLoading) return <Text>Cargando taller...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;
    if (!taller) return <Text>No se encontró el taller.</Text>;

    return (
        <View style={styles.container}>
            <FlatList
                data={[taller]}
                renderItem={({ item }) => (
                    <CardTalleres taller={item} navigation={navigation} />
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default IdTalleres;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
});