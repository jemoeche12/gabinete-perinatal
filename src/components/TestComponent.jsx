import { StyleSheet, Text, Pressable } from "react-native";
import Card from "./Card";
import React from "react";
import { useDispatch } from "react-redux";
import { setCategoryTestSelected } from "../features/test/TestSlice";

const TestComponent = ({
  categoryTest,
  navigation,
  id,
  canAccess,
  onPressLocked,
}) => {
  const dispatch = useDispatch();

  const handleNavigation = () => {
    dispatch(setCategoryTestSelected(id));

    if (canAccess) {
      navigation.navigate("TestDetail", { id });
    } else {
      if (onPressLocked) onPressLocked();
    }
  };

  return (
    <Card>
      <Pressable
        style={[styles.productItem, !canAccess && styles.lockedItem]}
        onPress={handleNavigation}
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
          {categoryTest}
        </Text>
        {!canAccess && <Text style={styles.alignedLockedIcon}>🔒</Text>}
      </Pressable>
    </Card>
  );
};

const styles = StyleSheet.create({
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
    alignItems: "center",
    flexDirection: "row",
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

export default TestComponent;
