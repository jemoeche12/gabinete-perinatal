import { setComments, setLoading, setError, removeCommentLocal, updateCommentLocal } from './CommentSlice';
import { addComment, getComments } from '../../services/commentService';


export const fetchCommentsThunks = (postId) => async (dispatch) => {
  try {
  dispatch(setLoading(true));
  dispatch(setError(null));

  const unsubscribe = getComments(postId, (comments) => {
    dispatch(setComments(comments));
    dispatch(setLoading(false));
    
  });
  
  
  
  return unsubscribe;
  

  } catch (error) {
    console.error("fetchCommentsThunks error:", error);
    dispatch(setError("Error al cargar los comentarios."));
    dispatch(setLoading(false));
  }
};

export const addCommentThunks = (postId, text, userData) => async (dispatch) => {

  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const response = await addComment(postId, text, userData);
    if (!response.success) {
      dispatch(setError(response.message || "Error al agregar el comentario."));
    }

  } catch (error) {
    console.error("addCommentThunks error:", error);
    dispatch(setError("Error al agregar el comentario."));
  }
  dispatch(setLoading(false));
}

export const deleteCommentThunks = (postId, commentId, userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const response = await deleteComment(postId, commentId, userData);
    if (!response.success) {
      dispatch(setError(response.message || "Error al eliminar el comentario."));
    } else {
      dispatch(removeCommentLocal(commentId));
    }
    
  } catch (error) {
    console.error("deleteCommentThunks error:", error);
    dispatch(setError("Error al eliminar el comentario."));
    dispatch(setLoading(false));
  }
  dispatch(setLoading(false));
}

export const updateCommentThunks = (postId, commentId, newText, userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const response = await updateComment(postId, commentId, newText, userData);

    if (response.success) {
      dispatch(updateCommentLocal({ id: commentId, text: newText }));
    } else {
      dispatch(setError(response.message || "Error al actualizar el comentario."));
    }
  } catch (error) {
    console.error("updateCommentThunks error:", error);
    dispatch(setError("Error al actualizar el comentario."));
  }
  dispatch(setLoading(false));
};
