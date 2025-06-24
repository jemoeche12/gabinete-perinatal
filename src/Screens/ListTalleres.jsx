import React from 'react';
import { FlatList, Pressable, Text, View, Image, StyleSheet } from 'react-native';
import TalleresByTitle from '../components/TalleresByTitle';
import { useGetTalleresQuery } from '../services/talleresService';
import { useState } from 'react';
import iconImageLoading from '../../assets/IconApp7.png';
import CustomHeader from '../components/CustomHeader';
import MenuDesplegable from '../components/MenuDesplegable';

const ListTalleres = ({ navigation, visible }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(visible);

    const { data, isLoading, error } = useGetTalleresQuery("talleres");

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    }

    if (isLoading) return (
        <View style={styles.containImageLoading}>
            <Image source={iconImageLoading} style={styles.iconImageLoading} />
        </View>
    );
    if (error) return <Text>Error: {error.message}</Text>;
    return (
        <>
        <CustomHeader onMenuPress={toggleMenu} />
        {isMenuVisible && <MenuDesplegable onClose={toggleMenu} visible={isMenuVisible} />} 
        <View style={styles.container}>
            <FlatList
              contentContainerStyle={{ paddingBottom: 150 }} 
                data={data}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Pressable >
                        <TalleresByTitle id={item.id} titulo={item.titulo} navigation={navigation} modalidad={item.modalidad} beneficios={item.beneficios} price={item.price}/>
                    </Pressable>
                )}
            />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 30
        
    },
    containImageLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
    },
    iconImageLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        height: 250,
        resizeMode: 'contain',
    }
});

export default ListTalleres;