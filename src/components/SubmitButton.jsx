import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SubmitButton = ({ onPress, title }) => {
  return (
    <Pressable style={styles.submitButton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#B78270',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Crafty',
  },
});
