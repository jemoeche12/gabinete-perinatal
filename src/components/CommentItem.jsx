import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGetProfileImageQuery } from "../services/recursosService";
import { useGetProfileQuery } from "../services/userService";

const CommentItem = ({ comment, onDelete, onUpdate, userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(comment.text);

  const isOwner = comment.userId === userData?.localId;
  const isAdmin = userData?.role === "admin";

  const { data: nameProfile } = useGetProfileQuery(comment.userId);

  const name = nameProfile?.name || "Usuario Anónimo";
  const lastname = nameProfile?.lastName || "";
  const imageComment = useGetProfileImageQuery(comment.userId, {
    skip: !comment.userId,
  });

  useEffect(() => {
    setNewText(comment.text);
  }, [comment.text]);

  
  return (
    <View style={styles.container}>
      {!isEditing && (
        <View>
          <View style={styles.userRow}>
            <Image
              source={
                imageComment.data
                  ? { uri: imageComment.data.image }
                  : require("../../assets/icon/avatar.png")
              }
              style={styles.userImage}
            />
            <View style={{ alignItems: "flex-end", flexDirection: "column" }} >
              <Text style={styles.textName}>{name} {lastname}</Text>
              <Text style={styles.textDate}>
                {new Date(comment.createdAt).toLocaleString()}
              </Text>
            </View>
          </View>
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
  textName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
  text: {
    fontSize: 16,
    textAlign: "right",
    marginBottom: 8,
    marginTop: 8,
  },
  textDate: {
    fontSize: 12,
    color: "#666",
    textAlign: "right",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
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
    alignItems: "flex-end",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
});
