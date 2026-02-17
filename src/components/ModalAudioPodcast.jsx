import { StyleSheet, Text, View, Image, Pressable, ImageBackground, Button } from "react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useGetPodcastByIdQuery } from "../services/podcastService";
import { useEffect } from "react";
import fondo from '../../assets/fondos/PODCAST.jpg';

const ModalAudioPodcast = ({ id, onClose, item }) => {
  const audioSource = useGetPodcastByIdQuery(id);
  const podcastUrl = audioSource.data?.urlAudio ?? null;

  const player = useAudioPlayer(podcastUrl || "", { updateInterval: 1000 });
  const statusPodcast = useAudioPlayerStatus(player);

  useEffect(() => {
    if (podcastUrl && player) {
      player.replace(podcastUrl);
    }
  }, [podcastUrl, player]);

  if (audioSource.isLoading) {
    return (
      <View style={styles.container}>
        <Text>Cargando podcast...</Text>
      </View>
    );
  }

  if (audioSource.isError || !podcastUrl) {
    return (
      <View style={styles.container}>
        <Text>Error al cargar el podcast</Text>
        <Button title="Cerrar" onPress={onClose} />
      </View>
    );
  }

  const handlePlayPause = () => {
    if (!player || !statusPodcast) return;

    try {
      if (statusPodcast.playing) {
        player.pause();
      } else {
        if (statusPodcast.didJustFinish) {
          player.seekTo(0);
        }
        player.play();
      }
    } catch (error) {
      console.error("Error playing/pausing audio:", error);
    }
  };

  return (
    <ImageBackground  source={fondo} style={styles.container}>
      {item?.urlImagen ? (
        <Image style={styles.image} source={{ uri: item.urlImagen }} />
      ) : (
        <View style={[styles.image, styles.placeholderImage]} />
      )}
      <Text style={styles.title}>{item?.titulo || "Sin título"}</Text>
      <Text style={styles.description}>
        {item?.descripcion || "Sin descripción"}
      </Text>

       <Pressable
        style={styles.button}
        onPress={handlePlayPause}
        disabled={!podcastUrl}
      >
        <Text style={styles.buttonText}>
          {statusPodcast?.playing ? "Pause" : "Play"}
        </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>Cerrar</Text>
      </Pressable>
    </ImageBackground>
  );
};

export default ModalAudioPodcast;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  placeholderImage: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 24,
    color: "#ccc",
  },
  title: {
    fontSize: 18,
    color:"black",
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",

  },
  description: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 8,
  },

  debug: {
    fontSize: 10,
    color: "black",
    marginBottom: 10,
    textAlign: "center",
  },
   button: {
    backgroundColor: "white", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "black", 
    fontWeight: "bold",
    textAlign: "center",
  },
});
