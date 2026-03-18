import {
  StyleSheet, Text, View, Image,
  Pressable, ImageBackground, Button,
} from "react-native";
import { Audio } from "expo-av";
import { useGetPodcastByIdQuery } from "../services/podcastService";
import { useEffect, useRef, useState } from "react";
import fondo from "../../assets/fondos/PODCAST.jpg";

const ModalAudioPodcast = ({ id, onClose, item }) => {
  const audioSource = useGetPodcastByIdQuery(id);
  const podcastUrl = audioSource.data?.urlAudio ?? null;
  const soundRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });
  }, []);

  useEffect(() => {
    if (!podcastUrl) return;

    const loadSound = async () => {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync(
        { uri: podcastUrl },
        { shouldPlay: false }
      );
      soundRef.current = sound;
      setIsLoaded(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setIsPlaying(status.isPlaying);
        }
      });
    };

    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [podcastUrl]);

  const handlePlayPause = async () => {
    if (!soundRef.current || !isLoaded) return;
    const status = await soundRef.current.getStatusAsync();
    if (status.isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      if (status.didJustFinish) {
        await soundRef.current.setPositionAsync(0);
      }
      await soundRef.current.playAsync();
    }
  };

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

  return (
    <ImageBackground source={fondo} style={styles.container}>
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
        disabled={!isLoaded}
      >
        <Text style={styles.buttonText}>
          {isPlaying ? "Pause" : "Play"}
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
  title: {
    fontSize: 18,
    color: "black",
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