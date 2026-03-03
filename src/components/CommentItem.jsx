import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";

const CommentItem = ({ comment, onDelete, onUpdate, userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(comment.text);

  const isOwner = comment.userId === userData?.localId;
  const isAdmin = userData?.role === "admin";

  const name = userData?.name || "Usuario Anónimo";
  

  return (
    <View style={styles.container}>
      {!isEditing && (
        <View>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text}>{comment.text}</Text>
          {(isOwner || isAdmin) && (
            <View style={styles.actionRow}>
              <Pressable onPress={() => setIsEditing(true)}>
                <Text style={styles.edit}>Editar</Text>
              </Pressable>

              <Pressable onPress={() => onDelete(comment.id)}>
                <Text style={styles.delete}>Eliminar</Text>
              </Pressable>
            </View>
          )}
        </View>
      )}

      {isEditing && (
        <View>
          <TextInput
            value={newText}
            onChangeText={setNewText}
            style={styles.input}
            multiline
          />

          <View style={styles.actionRow}>
            <Pressable
              onPress={() => {
                onUpdate(comment.id, newText);
                setIsEditing(false);
              }}
            >
              <Text style={styles.save}>Guardar</Text>
            </Pressable>

            <Pressable onPress={() => setIsEditing(false)}>
              <Text style={styles.cancel}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  edit: { color: "blue" },
  delete: { color: "red" },
  save: { color: "green" },
  cancel: { color: "gray" },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    minHeight: 40,
  },
});
