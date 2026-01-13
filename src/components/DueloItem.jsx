import { Pressable, StyleSheet, Text, View } from "react-native";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { setIdSelectedDuelo } from "../features/duelo/DueloSlice";

const DueloItem = ({ navigation, duelo }) => {
  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(setIdSelectedDuelo(duelo.id));
    navigation.navigate("DueloDetail", { dueloId: duelo.id.toString() });
  };

  return (
    <Card style={styles.container}>
      <Pressable onPress={handleNavigate}>
        <Text style={styles.title}>{duelo.title}</Text>
      </Pressable>
    </Card>
  );
};

export default DueloItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DEC3B2",
  },
  title: {
    fontFamily: "Roboto400",
  },
});
