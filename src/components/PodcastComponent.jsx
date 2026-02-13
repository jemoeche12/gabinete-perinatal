import { Pressable, StyleSheet, Text, View, Image, Modal } from "react-native";
import ModalAudioPodcast from "./ModalAudioPodcast";
import { useState } from "react";


const PodcastComponent = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState(false);

  return (
    <View>
      <Pressable
        onPress={() => {
          setSelectedPodcast(item.id);
          setModalVisible(true);
        }}
      >
        <Image source={{ uri: item.urlImagen }} style={styles.imgPodcast} />
      </Pressable>
      <View style={styles.podcastInfo}>
        <Text style={styles.titulo}>{item.titulo}</Text>
      </View>
      <Modal visible={modalVisible}>
        <ModalAudioPodcast
          id={selectedPodcast}
          item={item}
          onClose={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

export default PodcastComponent;

const styles = StyleSheet.create({
  containerPodcast: {
    alignItems: "center",
    borderRadius: 12,
    width: 200,
    height: 250,
  },
  imgPodcast: {
    width: 200,
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
  },
  podcastInfo: {
    width: 200,
    marginTop: 10,
  },
  titulo: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
  },
});
