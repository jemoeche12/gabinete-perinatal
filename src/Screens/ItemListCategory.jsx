import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import informathions from '../data/informathions.json';
import ProductItem from '../components/ProductItem';
import Search from '../components/Search';

const ItemListCategory = ({ categorySelected = "", setCategorySelected = () => {} }) => {
    const [busqueda, setBusqueda] = useState("");
    const [error, setError] = useState("");
    const [productsFiltered, setProductFiltered] = useState([]);

    useEffect(() => {

        const productPreFiltered = informathions.filter((product) => 
            product.category === categorySelected
        );


        const productFilter = productPreFiltered.filter((product) =>
            product.title.toLowerCase().includes(busqueda.toLowerCase())
        );


        setProductFiltered(productFilter);
        setError("");
    }, [busqueda, categorySelected]); 
    
    return (
        <View>
            <Search onSearch={setBusqueda} goBack={() => setCategorySelected("")}/> 
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <FlatList
                data={productsFiltered}
                renderItem={({ item }) => <ProductItem product={item.title} />}
                keyExtractor={(product) => product.id.toString()}
            />
        </View>
    );
}

export default ItemListCategory;

const styles = StyleSheet.create({
    errorText: {
        color: "red",
        textAlign: "center",
        marginVertical: 10,
    },
});
