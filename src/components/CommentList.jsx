import { FlatList, StyleSheet, Text, View } from "react-native";
import CommentItem from "./CommentItem";
import { useDispatch } from "react-redux";
import {
  deleteCommentThunks,
  updateCommentThunks,
} from "../features/comments/CommentThunks";

const CommentList = ({ comments, loading, error, postId, userData }) => {
  const dispatch = useDispatch();

  const handleDeleteComment = (commentId) => {
    dispatch(deleteCommentThunks(postId, commentId, userData));
  };

  const handleUpdateComment = (commentId, newText) => {
    dispatch(updateCommentThunks(postId, commentId, newText, userData));
  };

  return (
    <View style={styles.container}>
      {loading && <Text>Cargando comentarios...</Text>}
      {error && <Text>{error}</Text>}

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommentItem
            comment={item}
            onDelete={handleDeleteComment}
            onUpdate={handleUpdateComment}
            userData={userData}
            postId={postId}
          />
        )}
        ListEmptyComponent={
          !loading && (
            <Text>No hay comentarios aún. ¡Sé el primero en comentar!</Text>
          )
        }
      />
    </View>
  );
};

export default CommentList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
});
