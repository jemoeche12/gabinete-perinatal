import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

const TestComponent = ({ titlePrincipal, title, options = [], onSelect = () => { } }) => {
    const [optionSelected, setOptionSelected] = useState(null);

    const handleSelection = (option) => {
        setOptionSelected(option);
        onSelect(option);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleSelection(option)}
                    style={[
                        styles.option,
                        optionSelected === option && styles.optionSelected,
                    ]}
                >
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default TestComponent;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    titlePrincipal:{
        fontFamily:"Crafty",
        fontSize: 20,
        textAlign: "center",
        marginVertical: 25
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,

    },
    option: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginVertical: 8,
        backgroundColor: '#fff',
        fontFamily: "Crafty",

    },
    optionText: {
        fontSize: 16,
        fontFamily: "Crafty",
        color: "black",
        textAlign: "center"

    },
    optionSelected: {
        backgroundColor: '#B78270',
    },
});
