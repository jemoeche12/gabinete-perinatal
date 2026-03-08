import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image
} from "react-native";
import React, { useEffect } from "react";
import {
  useGetProductByIdQuery,
  useGetProductByNameQuery,
} from "../services/recursosService";
import { useState } from "react";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import fondo from "../../assets/fondos/fondoTalleres.jpg";
import { storage } from "../config/firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import icon from "../../assets/Red.png";
import WebView from "react-native-webview";

const Detail = ({ navigation, route, visible }) => {
  const { productId: idSelected, productName } = route.params;
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMenuVisible, setIsMenuVisible] = useState(visible);

  const { data: productById } = useGetProductByIdQuery(idSelected, {
    skip: !idSelected,
  });
  const { data: productByName } = useGetProductByNameQuery(productName, {
    skip: !productName,
  });
  const product = productById || productByName;

  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

  useEffect(() => {
    if (!product) return;

    if (product.storagePath) {
      const fetchPDF = async () => {
        try {
          const response = ref(storage, product.storagePath);
          const url = await getDownloadURL(response);
          setLink(url);
        } catch (error) {
          setLink(null);
        } finally {
          setLoading(false);
        }
      };
      fetchPDF();
    } else {
      setLoading(false);
    }
  }, [product]);

  const linkAndroid = link
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(link)}&embedded=true`
    : null;

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Image source={icon} style={styles.iconStyle} />
      </View>
    );
  }

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <CustomHeader onMenuPress={toggleMenu} />
      {isMenuVisible && (
        <MenuDesplegable onClose={toggleMenu} visible={isMenuVisible} />
      )}

      {linkAndroid ? (
        <WebView
          source={{ uri: linkAndroid }}
          style={{ flex: 1 }}
          startInLoadingState={true}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {product ? (
            <View style={styles.content}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.description}>{product.description}</Text>
              <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
                <Text style={styles.btnText}>Volver</Text>
              </Pressable>
            </View>
          ) : null}
        </ScrollView>
      )}
    </ImageBackground>
  );
};
export default Detail;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: "white",
    marginTop: -20,
    textAlign: "center",
    fontWeight: "bold",
  },
  content: {
    paddingVertical: 20,
    alignItems: "center",
    width: "95%",
    marginHorizontal: "2.5%",
  },
  description: {
    lineHeight: 24,
    flexWrap: 'wrap',
    flexShrink: 1,
    textAlign: 'left',    
    letterSpacing: 0.2,
    flexShrink: 1,
    fontSize: 18,
    color: "white",
    top: 20,
    marginBottom: 60,
    fontFamily: "Roboto400",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
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

  btn: {
    borderRadius: 10,
    backgroundColor: "#B78270",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: -10,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
