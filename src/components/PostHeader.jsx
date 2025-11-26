import { StyleSheet, Text, View, Image } from "react-native";
import avatar from "../../assets/Red.png"
import React from "react";

const PostHeader = ({ name, avatar, createdAt }) => {
  const formattedDate = new Date(createdAt).toLocaleString();

  const avatar2 = "../../assets/Red.png"

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: avatar2 }}
        style={styles.avatar}
      />
      <View>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    </View>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    color: "#555",
    fontSize: 12,
  },
});
