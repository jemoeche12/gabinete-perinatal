import {
  StyleSheet,
  View,
  Modal,
  TextInput,
  ImageBackground,
} from "react-native";
import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  Pressable,
  Alert,
  RefreshControl,
  ActivityIndicator,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommentsThunks,
  addCommentThunks,
} from "../features/comments/CommentThunks";
import {
  fetchPostsThunks,
  deletePostThunks,
  toggleLikeThunks,
  addPostThunks,
} from "../features/post/PostThunks";
import PostHeader from "../components/PostHeader";
import PostContent from "../components/PostContent";
import CommentList from "../components/CommentList";
import CommentInput from "../components/CommentInput";
import { useGetProfileQuery } from "../services/userService";
import { useGetProfileImageQuery } from "../services/recursosService";
import fondo from "../../assets/fondos/fondo_APP.jpg";
import { useNavigation } from "@react-navigation/native";
import back from "../../assets/icon/back.png";

const ComunidadScreen = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const { posts, loading, error } = useSelector((state) => state.posts);
  const { comments } = useSelector((state) => state.comments);
  const authData = useSelector((state) => state.auth.value);

  const { data: profileDate } = useGetProfileQuery(authData.localId);
  const imgProfileDate = useGetProfileImageQuery(authData.localId, {
    skip: !authData.localId,
  });

  const userData = {
    ...authData,
    name: profileDate?.name || authData.name || "",
    lastName: profileDate?.lastName || authData.lastName || "",
    image: authData.imageCamera || imgProfileDate?.data?.image || "",
  };

  const [refreshing, setRefreshing] = useState(false);
  const [postExpanded, setPostExpanded] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPostText, setNewPostText] = useState("");

  useEffect(() => {
    const unsubscribePromise = dispatch(fetchPostsThunks());

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [dispatch]);

  useEffect(() => {
    if (postExpanded) {
      const unsubscribePromise = dispatch(fetchCommentsThunks(postExpanded));

      return () => {
        if (typeof unsubscribe === "function") {
          unsubscribe();
        }
      };
    }
  }, [dispatch, postExpanded]);

  const handleDeletePost = (postId) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este post?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => dispatch(deletePostThunks(postId, userData)),
          style: "destructive",
        },
      ],
    );
  };

  const handleToggleComments = (postId) => {
    setPostExpanded(postExpanded === postId ? null : postId);
  };

  const handleAddComment = (postId, text) => {
    dispatch(addCommentThunks(postId, text, userData));
  };

  const handleToggleLike = (postId) => {
    dispatch(toggleLikeThunks(postId, userData));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchPostsThunks());
    setRefreshing(false);
  };

  const handleCreatePost = () => {
    if (newPostText.trim()) {
      dispatch(addPostThunks(newPostText, null, userData));
      setNewPostText("");
      setModalVisible(false);
    }
  };

  const renderPost = ({ item }) => {
    const isExpanded = postExpanded === item.id;


    return (
      <View style={styles.postContainer}>
        <PostHeader
          name={item.name}
          avatar={item.avatar}
          createdAt={item.createdAt}
          userData={userData}
        />
        <PostContent text={item.text} img={item.img} counter={item.counter} />
        <View style={styles.actionsContainer}>
          <Pressable onPress={() => handleToggleLike(item.id)}>
            <Text style={styles.likeButton}>❤️ Like</Text>
          </Pressable>
          <Pressable onPress={() => handleToggleComments(item.id)}>
            <Text style={styles.commentButton}>
              {isExpanded ? "Ocultar" : "Ver"} Comentarios
            </Text>
          </Pressable>
          {(userData?.role === "admin" ||
            item.userId === userData?.localId) && (
            <Pressable onPress={() => handleDeletePost(item.id)}>
              <Text style={styles.deleteButton}>Eliminar</Text>
            </Pressable>
          )}
        </View>
        {isExpanded && (
          <View style={styles.commentsSection}>
            <CommentList
              comments={comments}
              loading={loading}
              error={error}
              postId={item.id}
              userData={userData}
            />
            <CommentInput
              postId={item.id}
              onSubmit={(text) => handleAddComment(item.id, text)}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <ImageBackground source={fondo} style={styles.backgroundImage}>
      <View style={styles.container}>
        {loading && posts.length === 0 ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <FlatList
              data={posts}
              keyExtractor={(item) => item.id}
              renderItem={renderPost}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListHeaderComponent={
                <>
                  <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                  >
                    <Image source={back} style={styles.backIcon} />
                  </Pressable>

                  <View style={styles.containerIntro}>
                    <Text style={styles.introTitle}>
                      Un lugar para respirar, compartir y no sentirte sola/o
                    </Text>
                    <Text style={styles.introText}>
                      Bienvenida/o a este espacio creado para acompañarte en
                      cada etapa: el deseo de gestar, el embarazo, el posparto,
                      la crianza, los miedos, los duelos y todo aquello que a
                      veces cuesta decir en voz alta.
                    </Text>
                    <Text style={styles.introText}>
                      Aquí puedes: Ser vos misma/o, sin exigencias. Compartir lo
                      que te pasa y encontrar a otras personas que sienten como
                      vos. Recibir sostén profesional cuando lo necesites. Este
                      es un rincón seguro. Un lugar donde tus emociones tienen
                      espacio, donde tu historia importa y donde podés descansar
                      un momento. No estás sola/o. La comunidad te abraza.
                    </Text>
                  </View>
                </>
              }
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  No hay posts aún. ¡Crea el primero!
                </Text>
              }
            />
          </>
        )}

        <Pressable
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Crear nuevo post</Text>

              <TextInput
                style={styles.modalInput}
                placeholder="¿Qué quieres compartir?"
                value={newPostText}
                onChangeText={setNewPostText}
                multiline
                maxLength={5000}
              />

              <View style={styles.modalButtons}>
                <Pressable
                  style={styles.modalButtonCancel}
                  onPress={() => {
                    setModalVisible(false);
                    setNewPostText("");
                  }}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.modalButtonSubmit,
                    !newPostText.trim() && styles.buttonDisabled,
                  ]}
                  onPress={handleCreatePost}
                  disabled={!newPostText.trim()}
                >
                  <Text style={styles.modalButtonText}>Publicar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

export default ComunidadScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  containerIntro: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 15,
    borderRadius: 10,
    marginTop: 40,
  },
  backButton: {
    left: 15,
    width: 40,
    height: 40,
    justifyContent: "center",
    top: 15,
  },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  introTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  introText: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  postContainer: {
    backgroundColor: "#fff",
    marginBottom: 12,
    marginHorizontal: 10,
    padding: 16,
    borderRadius: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  likeButton: {
    color: "#e91e63",
    fontWeight: "600",
  },
  commentButton: {
    color: "#2196f3",
    fontWeight: "600",
  },
  deleteButton: {
    color: "#f44336",
    fontWeight: "600",
  },
  commentsSection: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    color: "#999",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  modalButtonCancel: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#ccc",
    alignItems: "center",
  },
  modalButtonSubmit: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#007AFF",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#99c9ff",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
