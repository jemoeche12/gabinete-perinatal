import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageBackground,
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
import fondo from "../../assets/fondos/PODCAST.jpg";
import logo from "../../assets/Red.png";

const PodcastScreen = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [numColumns, setNumColumns] = useState(2);

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
        <Image source={logo} style={styles.logo} />
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
        <Pressable
          style={{ top: 40, left: 20, position: "absolute" }}
          onPress={() => navigation.goBack()}
        >
          <Image source={back} style={styles.backIcon} />
        </Pressable>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.messageText}>
          Disculpe, no hay ningún podcast en esta categoría.
        </Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={fondo} style={styles.backgroundImage}>
          <View style={styles.viewTitle}>
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Image source={back} style={styles.backIcon} />
            </Pressable>
            <Text style={styles.title}>PODCAST</Text>
          </View>
          <Picker
            selectedValue={categoriaSeleccionada}
            onValueChange={(value) => setCategoriaSeleccionada(value)}
            style={styles.picker}
            dropdownIconColor="black"
          >
            <Picker.Item
              label="Todos"
              value="todos"
              style={styles.pickerItem}
            />
            {categoriesPodcast.map((cat, index) => (
              <Picker.Item
                key={index}
                label={cat}
                value={cat}
                style={{
                  fontWeight: "bold",
                  color: "black",
                  backgroundColor: "white",
                }}
              />
            ))}
          </Picker>
          <FlatList
            key={numColumns}
            data={podcastCategory}
            renderItem={({ item }) => <PodcastComponent item={item} />}
            keyExtractor={(item) =>
              item.id?.toString() || Math.random().toString()
            }
            columnWrapperStyle={{ gap: 16 }}
            numColumns={2}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </ImageBackground>
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
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
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
    marginVertical: 15,
    textAlign: "center",
    color: "black",
  },
  listContainer: {
    padding: 10,
    gap: 16,
    alignItems: "center",
  },
  logo: {
    height: 200,
    width: 200,
    bottom: 80,
  },
  separator: {
    width: 10,
  },
  messageText: {
    fontSize: 18,
    textAlign: "center",
    color: "black",
    bottom: 40,
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
    tintColor: "black",
  },
  picker: {
    color: "black",
    borderColor: "black",
    fontWeight: "bold",
    borderRadius: 8,
  },
});
