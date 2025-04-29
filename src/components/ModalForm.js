import React, { useState } from 'react';
import { Modal, Text, StyleSheet, View, TextInput, ScrollView, Button, Pressable } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

const ModalForm = ({ modalVisible, setModalVisible }) => {
    let today = new Date();
    const [selected, setSelected] = useState(today);

    const handleNavigation = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <Modal
            visible={modalVisible}
            animationType='slide'
        >
            <ScrollView contentContainerStyle={styles.modalContainer}>
                <Text style={styles.modalTitle}>Formulario de Cita</Text>

                <Text style={styles.label}>Nombre:</Text>
                <TextInput style={styles.input} />

                <Text style={styles.label}>Apellido:</Text>
                <TextInput style={styles.input} />

                <Text style={styles.label}>Email (Nos contactaremos a este mail):</Text>
                <TextInput style={styles.input} keyboardType='email-address' />

                <Text style={styles.label}>Teléfono:</Text>
                <TextInput style={styles.input} keyboardType='phone-pad' />
                <View>
                    <Text>Fecha de la Cita</Text>
                    <DateTimePicker
                        mode="single"
                        date={selected}
                        onChange={({ date }) => setSelected(date)}
                        minDate={today} 
                        enabledDates={(date) => dayjs(date).day() === 1}
                        disabledDates={(date) => [0, 6].includes(dayjs(date).day())} 
                    />
                </View>

                <Text style={styles.label}>Consulta:</Text>

                <TextInput
                    style={[styles.input, styles.textArea]}
                    multiline
                    numberOfLines={4}
                    placeholder="Contanos lo que necesitás, te leemos con atención"
                    placeholderTextColor="#999"
                />

                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Solicitar Cita</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleNavigation}>
                    <Text style={styles.buttonText}>Cerrar</Text>
                </Pressable>
            </ScrollView>
        </Modal>
    );
};

export default ModalForm;

const styles = StyleSheet.create({
    modalContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8EDE3",
        padding: 20,
    },
    modalTitle: {
        fontSize: 30,
        fontFamily: "Crafty",
        color: "#B78270",
        marginBottom: 20,
        textAlign: "center",
    },
    label: {
        fontSize: 18,
        color: "#333",
        fontFamily: "Crafty",
        marginTop: 10,
        marginBottom: 5,
        width: '90%',
        textAlign: 'left',
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        fontFamily: "Crafty",
        backgroundColor: "#fff",
        marginBottom: 10,
        width: '90%',
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#fff",
        marginBottom: 10,
        width: '90%',
    },
    picker: {
        height: 50,
        width: "100%",
        fontFamily: "Crafty",
    },
    button: {
        backgroundColor: "#B78270",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        width: "90%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontFamily: "Crafty",
    },
});