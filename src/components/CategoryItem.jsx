import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { setCategorySelected } from "../features/recursos/InformacionSlice";

const CategoryItem = ({ category, navigation, canAccess, onPressLocked }) => {
  const dispatch = useDispatch();
  const handleNavigate = () => {
    if (!canAccess) {
      if (onPressLocked) onPressLocked(category.requiredLevel);
      return;
    } else {
      dispatch(setCategorySelected(category));
      if (category.isDirect) {
        navigation.navigate("Detail", { productName: category.name });
      } else {
        navigation.navigate("ItemListCategory", { category });
      }
    }
  };
 

  return (
    <Card>
      <Pressable
        style={[styles.productItem, !canAccess && styles.lockedItem]}
        onPress={handleNavigate}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            styles.productText,
            !canAccess && styles.lockedText,
            !canAccess && styles.textWithIcon,
          ]}
        >
          {category.name}
        </Text>
        {!canAccess && <Text style={styles.alignedLockedIcon}>🔒</Text>}
      </Pressable>
    </Card>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8EDE3",
    padding: 10,
  },
  searchContainer: {
    marginBottom: 15,
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 18,
    color: "#B78270",
    marginTop: 20,
    fontWeight: "bold",
  },
  list: {
    flexGrow: 1,
  },
  productItem: {
    backgroundColor: "#DEC3B2",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  productText: {
    fontSize: 18,
    color: "black",
    fontFamily: "Roboto400",
  },
  textWithIcon: {
    flexShrink: 1,
    marginRight: 10,
  },
  lockedItem: {
    backgroundColor: "#EAEAEA",
    borderColor: "#999",
    opacity: 0.7,
  },
  lockedText: {
    color: "#666",
  },
  alignedLockedIcon: {
    marginLeft: "auto",
    fontSize: 20,
  },
});
