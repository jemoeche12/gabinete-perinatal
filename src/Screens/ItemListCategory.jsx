import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem';
import Search from '../components/Search';
import { useGetProductsByCategoryQuery } from '../services/recursosService';
import CustomHeader from '../components/CustomHeader';
import MenuDesplegable from '../components/MenuDesplegable';


const ItemListCategory = ({ navigation, route, visible }) => {
    const [busqueda, setBusqueda] = useState("");
    const [error, setError] = useState("");
    const [productsFiltered, setProductFiltered] = useState([]);
    const [isMenuVisible, setIsMenuVisible] = useState(visible)

    const { category: categorySelected } = route.params;
    const { data: productsFetched = [], error: errorFetched, isLoading } = useGetProductsByCategoryQuery(categorySelected);



    useEffect(() => {
        if (!isLoading) {
            const productFilter = productsFetched.filter((product) =>
                product.title.toLowerCase().includes(busqueda.toLowerCase())
            );
            setProductFiltered(productFilter);
            setError("");
        }
    }, [busqueda, categorySelected, productsFetched, errorFetched]);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    }


    return (
        <>
            <CustomHeader onMenuPress={toggleMenu} />
            {isMenuVisible && <MenuDesplegable onClose={toggleMenu} visible={isMenuVisible} />}
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <Search onSearch={setBusqueda} goBack={() => navigation.goBack()} />
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </View>
                <FlatList
                    data={productsFiltered}
                    renderItem={({ item }) => (
                        <View style={styles.productItem}>
                            <ProductItem product={item} navigation={navigation} />
                        </View>
                    )}
                    keyExtractor={(product) => product.id}
                    contentContainerStyle={styles.list}
                />
            </View>
        </>
    );
};

export default ItemListCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8EDE3",

    },
    searchContainer: {
        marginBottom: 15,
        width: "95%",
        marginHorizontal: "auto",
        marginTop: 10,
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
        backgroundColor: "#DEC3B2",
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
        color: "black",
        fontFamily: "Roboto",
    },
});