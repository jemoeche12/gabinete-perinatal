import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";

const PostContent = ({ text, img, counter }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {text ? <Text style={styles.text}>{text}</Text> : null}

      {img ? (
        <Image
          source={{ uri: img }}
          style={[styles.image, { width: width - 32 }]}
          resizeMode="cover"
        />
      ) : null}

      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>❤️ {counter}</Text>
      </View>
    </View>
  );
};

export default PostContent;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },

  text: {
    fontSize: 15,
    lineHeight: 22,
    color: "#222",
  },

  image: {
    height: 250,
    borderRadius: 12,
    backgroundColor: "#e5e5e5",
  },

  counterContainer: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  counterText: {
    fontSize: 14,
    color: "#555",
  },
});
