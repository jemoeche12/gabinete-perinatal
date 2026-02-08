import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from "react-native";
import { useGetGuidesByCategoryQuery } from "../services/guidesService";
import GuideItem from "../components/GuideItem";
import CustomHeader from "../components/CustomHeader";
import MenuDesplegable from "../components/MenuDesplegable";
import { useState } from "react";
import back from "../../assets/icon/back.png";

const GuidesListCategory = ({ navigation, route }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const { category } = route.params;

  const { data = [], isLoading } = useGetGuidesByCategoryQuery(category.id);

  return (
    <>
      <CustomHeader onMenuPress={toggleMenu} />
      <View style={styles.container}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={back} style={styles.backIcon} />
        </Pressable>
        {isMenuVisible && (
          <MenuDesplegable onClose={toggleMenu} visible={isMenuVisible} />
        )}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <GuideItem guide={item} navigation={navigation} />
            </View>
          )}
        />
      </View>
    </>
  );
};

export default GuidesListCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8EDE3",
    paddingVertical: 12,
  },
  backButton: {
    left: 15,
    marginVertical: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },

  categoriesBar: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#DEC3B2",
    borderRadius: 20,
    marginRight: 10,
  },

  activeCategory: {
    backgroundColor: "#B78270",
  },

  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },

  guideItem: {
    fontSize: 18,
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
});
