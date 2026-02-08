import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import {
  useGetCategoriesQuery,
  useGetCategoryPodcastQuery,
} from "../services/podcastService";
import { Picker } from "@react-native-picker/picker";
import PodcastComponent from "../components/PodcastComponent";
import { useNavigation } from "@react-navigation/native";
import back from "../../assets/icon/back.png";

const PodcastScreen = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");

  const navigation = useNavigation();

  const {
    data: categoriesPodcast = [],
    isLoading: loadingCategories,
    error: errorCategories,
  } = useGetCategoriesQuery();

  const {
    data: podcastCategory = [],
    isLoading: loadingPodcasts,
    error: errorPodcasts,
  } = useGetCategoryPodcastQuery(categoriaSeleccionada);

  if (loadingCategories || loadingPodcasts) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.messageText}>Cargando, espere por favor...</Text>
      </View>
    );
  }

  if (errorCategories || errorPodcasts) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          Error:{" "}
          {(errorCategories?.message || errorPodcasts?.message) ??
            "No se pudo encontrar el podcast"}
        </Text>
      </View>
    );
  }

  if (podcastCategory.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.messageText}>
          Disculpe, no hay ningún podcast en esta categoría.
        </Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.viewTitle}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={back} style={styles.backIcon} />
          </Pressable>
          <Text style={styles.title}>Podcast</Text>
        </View>
        <Picker
          selectedValue={categoriaSeleccionada}
          onValueChange={(value) => setCategoriaSeleccionada(value)}
          style={styles.picker}
          dropdownIconColor="white"
        >
          <Picker.Item label="Todos" value="todos" />
          {categoriesPodcast.map((cat, index) => (
            <Picker.Item key={index} label={cat} value={cat} />
          ))}
        </Picker>
        <FlatList
          data={podcastCategory}
          renderItem={({ item }) => <PodcastComponent item={item} />}
          keyExtractor={(item) =>
            item.id?.toString() || Math.random().toString()
          }
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </>
  );
};

export default PodcastScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  viewTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 25,
    textAlign: "center",
    color: "white",
  },
  listContainer: {
    padding: 10,
  },
  separator: {
    width: 10,
  },
  messageText: {
    fontSize: 16,
    textAlign: "center",
    color: "#ccc",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    color: "#ff4444",
  },
  backButton: {
    position: "absolute",
    left: 15,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    tintColor: "white",
  },
  picker: {
    color: "white",
    borderColor: "white",
  },
});
