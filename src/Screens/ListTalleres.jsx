import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import TalleresByTitle from '../components/TalleresByTitle';
import { useGetTalleresQuery } from '../services/talleresService';

const ListTalleres = ({navigation}) => {

    const { data, isLoading, error } = useGetTalleresQuery("talleres");


    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Pressable>
                        <TalleresByTitle id={item.id} titulo={item.titulo} navigation={navigation} modalidad={item.modalidad}/>
                     </Pressable>
                )}
            />
        </View>
    )
}
export default ListTalleres