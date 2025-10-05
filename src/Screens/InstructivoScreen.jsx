import { StyleSheet, Text, View } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { colors } from "../utils/customerStyle";
import home from "../../assets/icon/home.png";
import AddButton from "../components/AddButton";


const InstructivoScreen = ({ navigation }) => {
  const videoUri = {
    uri: "https://firebasestorage.googleapis.com/v0/b/gabinete-perinatal.firebasestorage.app/o/Instructivo%2FinstructivoVer.mp4?alt=media&token=aafc000c-1b01-41e1-a3dc-17ba078ea0f1",
  };

  const player = useVideoPlayer(videoUri, (player) => {
    player.play();
    player.muted = false;
    player.loop = false;
  });

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        nativeControls={true}
        contentFit="contain"
        allowsFullscreen={true}
      />
      <AddButton
        
        onPress={() => {
          navigation.navigate("Main");
        }}
        style={styles.addButtonIncio}
        iconSource={home}
      />
    </View>
  );
};

export default InstructivoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  addButtonIncio: {
  backgroundColor: colors.btnAsesorias,
  position: "absolute",
  left: 20,
  top: 10, 
  zIndex: 1,
  elevation: 5,
}
});
