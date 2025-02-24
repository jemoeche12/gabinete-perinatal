import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import informathions from '../data/informathions.json';
import ProductItem from '../components/ProductItem';
import Search from '../components/Search';

const ItemListCategory = ({ navigation, route }) => {
    const [busqueda, setBusqueda] = useState("");
    const [error, setError] = useState("");
    const [productsFiltered, setProductFiltered] = useState([]);

    const {category: categorySelected} = route.params;

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
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Search onSearch={setBusqueda} goBack={() => navigation.goBack()} />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
            <FlatList
                data={productsFiltered}
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <ProductItem product={item.title} navigation={navigation} />
                    </View>
                )}
                keyExtractor={(product) => product.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

export default ItemListCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8EDE3", 
        padding: 10,
    },
    searchContainer: {
        marginBottom: 15,
    },
    errorText: {
        color: "red",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 10,
    },
    list: {
        flex: 1,
    },
    productItem: {
        backgroundColor: "#E3CAA5", 
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 2, height: 2 },
        elevation: 3,
    },
    productText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#B78270",
        fontFamily: "Roboto",
    },
});

