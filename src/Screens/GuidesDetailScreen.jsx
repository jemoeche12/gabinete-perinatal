import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebaseConfig";
import WebView from "react-native-webview";
import icon from "../../assets/Red.png";

const GuidesDetailScreen = ({ route }) => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(true);

  const { guide } = route.params;

  useEffect(() => {
    const fetchGuidesDetail = async () => {
      try {
        const response = ref(storage, guide.storagePath);
        const url = await getDownloadURL(response);
        setLink(url);
      } catch (error) {
        console.error("Error fetching guide details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGuidesDetail();
  }, [guide.storagePath]);

  const linkAndroid = link
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(link)}&embedded=true`
    : link;

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Image source={icon} style={styles.iconStyle} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {link ? (
        <WebView
          source={{ uri: linkAndroid }}
          style={{ flex: 1 }}
          startInLoadingState={true}
        />
      ) : (
        <View style={styles.loaderContainer}>
          <Text>La guia no esta disponible</Text>
        </View>
      )}
    </View>
  );
}; 

export default GuidesDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  iconStyle: {
    width: 225,
    height: 225,
    resizeMode: "contain",
  },
});