import { StyleSheet, TextInput, View, Pressable, Text } from "react-native";
import React, { useState } from "react";

const CommentInput = ({ postId, onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escribe un comentario..."
        value={text}
        onChangeText={setText}
        multiline
        maxLength={1200}
      />
      <Pressable
        style={[styles.button, !text.trim() && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!text.trim()}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </Pressable>
    </View>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    gap: 8,
    alignItems: "flex-end",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});