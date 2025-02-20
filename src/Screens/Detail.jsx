import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import informathions from '../data/informathions.json';

const Detail = ({ idSelected, setProductSelected }) => { 
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const productSelect = informathions.find(
          (product) => product.id.toString() === idSelected.toString()
        );
        setProduct(productSelect);
    }, [idSelected]);


    return (
        <View style={styles.container}>
            <Button onPress={() => setProductSelected("")} title="Volver" />
            {product ? (
                <>
                    <Text>{product.description}</Text>
                    <Text>{product.title}</Text>
                </>
            ) : (
                <Text>Cargando...</Text> 
            )}
        </View>
    );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
