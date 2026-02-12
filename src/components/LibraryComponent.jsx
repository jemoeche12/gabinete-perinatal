import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { setCategorySelected } from "../features/recursos/InformacionSlice";

const LibraryComponent = ({
  category,
  navigation,
  onPressLocked,
  canAccess,
  description,
}) => {
  const dispatch = useDispatch();
  const handleNavigate = () => {
    dispatch(setCategorySelected(category));

    if (canAccess) {
      navigation.navigate("RecursosLista", { category });
    } else {
      onPressLocked(category.requiredLevel);
    }
  };

  return (
     <Card>
      <Pressable
        onPress={handleNavigate}
        style={[styles.card, !canAccess && styles.lockedCard]}
      >
        <View style={styles.header}>
          <Text
            numberOfLines={1}
            style={[styles.title, !canAccess && styles.lockedText]}
          >
            {category.name}
          </Text>

          {!canAccess && <Text style={styles.lockIcon}>🔒</Text>}
        </View>

        <Text style={styles.description}>
{description}
        </Text>
      </Pressable>
    </Card>
  );
};

export default LibraryComponent;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#DEC3B2",
    borderRadius: 20,
    width: 240,
    height: 240,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    marginVertical: 10,
    marginBottom: 50,
    alignSelf: "center",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontFamily: "Roboto400",
    color: "#222",
    flex: 1,
    marginVertical: 4,
  },

  description: {
    fontSize: 14,
    color: "#444",
    lineHeight: 18,
    fontFamily: "Roboto400",
  },

  lockIcon: {
    fontSize: 20,
    marginLeft: 8,
  },

  lockedCard: {
    backgroundColor: "#EAEAEA",
    opacity: 0.6,
  },

  lockedText: {
    color: "#777",
  },
});
