import {
  getDatabase,
  get,
  remove,
  set,
  push,
  ref,
  onValue,
  off,
  update,
} from "firebase/database";
import {
  validateString,
  validateUser,
  validateId,
} from "../utils/Validation.js";


const db = getDatabase();

export const addPost = async (text, img, userData) => {
  try {
    const textValidation = validateString(text, "Post", {
      maxLength: 5000,
    });
    if (!textValidation.valid)
      return { success: false, message: textValidation.message };

    const userValidation = validateUser(userData);
    if (!userValidation.valid) {
      return { success: false, message: userValidation.message };
    }

    const cleanedText = textValidation.value;

    const postRef = ref(db, `posts`);
    const newPost = push(postRef);

    const payload = {
      userId: userData.localId,
      name: `${userData.name || "Usuario"} ${
        userData.lastName || ""
      }`.trim(),
      text: cleanedText,
      createdAt: Date.now(),
      avatar: userData.avatar || null,
      img: img || null,
      counter: 0,
    };

    await set(newPost, payload);
    return { success: true, id: newPost.key };
  } catch (error) {
    console.error("addPost error:", error);
    return {
      success: false,
      message: "Error al agregar el post.",
      error,
    };
  }
};

export const getPosts = (onUpdate) => {
  try {
    const postRef = ref(db, "posts/");
    const listener = onValue(postRef, (snapshot) => {
      if (snapshot.exists()) {
        const postsData = snapshot.val();
        const posts = Object.entries(postsData)
          .map(([id, postData]) => ({
            id,
            ...postData,
          }))
          .sort((a, b) => b.createdAt - a.createdAt);
        onUpdate(posts);
      } else {
        onUpdate([]);
      }
    });

    return () => {
      off(postRef, "value", listener);
    };
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    return () => {};
  }
};

export const deletePost = async (postId, userData) => {
  try {
    const postIdValidation = validateId(postId, "Post ID");
    if (!postIdValidation.valid) {
      return { success: false, message: postIdValidation.message };
    }
    const userValidation = validateUser(userData);
    if (!userValidation.valid) {
      return { success: false, message: userValidation.message };
    }

    const postRef = ref(db, `posts/${postIdValidation.value}`);
    const snapshot = await get(postRef);
    if (!snapshot.exists()) {
      return { success: false, message: "El post no existe." };
    }
    const postData = snapshot.val();
    if (userData.role !== "admin" && postData.userId !== userData.localId) {
      return {
        success: false,
        message: "No tienes permiso para eliminar este post.",
      };
    }

    const commentsRef = ref(db, `comments/${postIdValidation.value}`);
    await remove(commentsRef);
    await remove(postRef);
    return {
      success: true,
      message: "Post eliminado correctamente.",
    };
  } catch (error) {
    console.error("deletePost error:", error);
    return {
      success: false,
      message: "Error al eliminar el post.",
      error,
    };
  }
};

export const updatePost = async (postId, userData, newText, newImg) => {
  const postCheck = validateId(postId, "Post ID");
  if (!postCheck.valid) return { success: false, message: postCheck.message };

  const textValidation = validateString(newText, "Post", { maxLength: 5000 });
  if (!textValidation.valid)
    return { success: false, message: textValidation.message };

  const userValidation = validateUser(userData);
  if (!userValidation.valid)
    return { success: false, message: userValidation.message };

  try {
    const postRef = ref(db, `posts/${postCheck.value}`);
    const snapshot = await get(postRef);

    if (!snapshot.exists()) {
      return { success: false, message: "Post no encontrado." };
    }

    const postData = snapshot.val();
    const cleanedText = textValidation.value;

    if (userData.role !== "admin" && postData.userId !== userData.localId) {
      return {
        success: false,
        message: "No tienes permiso para actualizar este post.",
      };
    }

    await set(postRef, {
      ...postData,
      text: cleanedText,
      img: newImg !== undefined ? newImg : postData.img,
      updatedAt: Date.now(),
    });

    return { success: true, message: "Post actualizado correctamente." };
  } catch (error) {
    console.error("updatePost error:", error);
    return { success: false, message: "Error al actualizar el post.", error };
  }
};

export const toggleLike = async (postId, userData) => {
  const postCheck = validateId(postId, "Post ID");
  if (!postCheck.valid) return { success: false, message: postCheck.message };
  const userValidation = validateUser(userData);
  if (!userValidation.valid)
    return { success: false, message: userValidation.message };

  try {
    const postRef = ref(db, `posts/${postCheck.value}`);
    const snapshot = await get(postRef);

    if (!snapshot.exists()) {
      return { success: false, message: "Post no encontrado." };
    }
    const postData = snapshot.val();
    const currentCount = postData.counter || 0;

    await update(postRef, {
      counter: currentCount + 1,
    });

    return { success: true, counter: currentCount + 1 };
  } catch (error) {
    console.error("toggleLike error:", error);
    return {
      success: false,
      message: "Error al actualizar el like del post.",
      error,
    };
  }
};
