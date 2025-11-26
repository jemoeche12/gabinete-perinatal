import {
  setPosts,
  setLoading,
  setError,
  removePostLocal,
  updatePostLocal,
} from "./PostSlice";

import {
  getPosts,
  addPost,
  deletePost,
  updatePost,
  toggleLike,
} from "../../services/postService";

export const fetchPostsThunks = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    const unsubscribe = getPosts((posts) => {
      dispatch(setPosts(posts));
      dispatch(setLoading(false));
    });
    return unsubscribe;
  } catch (error) {
    console.error("fetchPostThunk error:", error);
    dispatch(setError("Error al cargar los posts."));
    dispatch(setLoading(false));
  }
};

export const addPostThunks = (text, img, userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const response = await addPost(text, img, userData);
    if (!response.success) {
      dispatch(setError(response.message || "Error al agregar el post."));
    } else {
    }
  } catch (error) {
    console.error("addPostThunk error:", error);
    dispatch(setError("Error al agregar el post."));
  }
  dispatch(setLoading(false));
};

export const deletePostThunks = (postId, userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const response = await deletePost(postId, userData);
    if (!response.success) {
      dispatch(setError(response.message || "Error al eliminar el post."));
    } else {
      dispatch(removePostLocal(postId));
    }
  } catch (error) {
    console.error("deletePostThunk error:", error);
    dispatch(setError("Error al eliminar el post."));
  }
  dispatch(setLoading(false));
};

export const updatePostThunks =
  (postId, userData, newText, newImg) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await updatePost(postId, userData, newText, newImg);
      if (!response.success) {
        dispatch(setError(response.message || "Error al actualizar el post."));
      } else {
        dispatch(updatePostLocal({ id: postId, text: newText, img: newImg }));
      }
    } catch (error) {
      console.error("updatePostThunk error:", error);
      dispatch(setError("Error al actualizar el post."));
    }
    dispatch(setLoading(false));
  };

export const toggleLikeThunks = (postId, userData) => async (dispatch) => {
    try {
        dispatch(setError(null));
        const response = await toggleLike(postId, userData);
        if (!response.success) {
            dispatch(setError(response.message || "Error al actualizar el like del post."));
        }   else {
            dispatch(updatePostLocal({ id: postId, counter: response.counter }));
        }
    } catch (error) {
        console.error("toggleLikeThunk error:", error);
        dispatch(setError("Error al actualizar el like del post."));
    }
};