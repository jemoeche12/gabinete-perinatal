import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebaseConfig";
import WebView from "react-native-webview";
import icon from "../../assets/Red.png";
import back from "../../assets/icon/back.png";

const GuidesDetailScreen = ({ route, navigation }) => {
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
        setLink(null);
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
        <>
          <View style={styles.view}>
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Image source={back} style={styles.backIcon} />
            </Pressable>
          </View>
          <View style={styles.loaderContainer}>
            <Text style={styles.errorText}>
              Disculpe, La guia no esta disponible en este momento. Muchas
              Gracias por su comprensión.
            </Text>
          </View>
        </>
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
  errorText: {
    width: "80%",
    fontFamily: "Roboto400",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 100,
  },
  view: {
    paddingTop: 100,
    backgroundColor: "#fff",


  },
  backButton: {
    left: 15,
    marginBottom: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});
