import { getDatabase, ref, push, set, onValue, off, remove, get } from "firebase/database";
import {
  validateString,
  validateUser,
  validateId,
} from "../utils/Validation.js";

const db = getDatabase();

export const addComment = async (postId, text, userData) => {
  try {
    const postIdValidation = validateId(postId, "Post ID");
    if (!postIdValidation.valid)
      return { success: false, message: postIdValidation.message };

    const textValidation = validateString(text, "Comentario", {
      maxLength: 1200,
    });
    if (!textValidation.valid)
      return { success: false, message: textValidation.message };

    const userValidation = validateUser(userData);
    if (!userValidation.valid) {
      return { success: false, message: userValidation.message };
    }

    const cleanedText = textValidation.value;
    const cleanedPostId = postIdValidation.value;

    const commentRef = ref(db, `comments/${cleanedPostId}`);
    const newComment = push(commentRef);

    const payload = {
      userId: userData.localId,
      name: `${userData.name || "Usuario"} ${
        userData.lastName || ""
      }`.trim(),
      text: cleanedText,
      createdAt: Date.now(),
    };

    await set(newComment, payload);

    return { success: true, id: newComment.key };
  } catch (error) {
    console.error("addComment error:", error);
    return {
      success: false,
      message: "Error al agregar el comentario.",
      error,
    };
  }
};

export const getComments = (postId, onUpdate) => {
  try {
    const postIdValidation = validateId(postId, "Post ID");
    if (!postIdValidation.valid) {
      return { success: false, message: postIdValidation.message };
    }

    const commentRef = ref(db, `comments/${postIdValidation.value}`);
    const listener = onValue(commentRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const comments = Object.entries(data)
          .map(([id, commentsData]) => ({
            id,
            ...commentsData,
          }))
          .sort((a, b) => a.createdAt - b.createdAt);
        onUpdate(comments);
      } else {
        onUpdate([]);
      }
    });
    return () => off(commentRef, "value", listener);
  } catch (error) {
    console.error("Error al obtener los comentarios", error);
    return () => {};
  }
};

export const deleteComment = async (postId, commentId, userData) => {
  const postCheck = validateId(postId, "Post ID");
  if (!postCheck.valid) return { success: false, message: postCheck.message };

  const commentCheck = validateId(commentId, "Comment ID");
  if (!commentCheck.valid) return { success: false, message: commentCheck.message };

  const userValidation = validateUser(userData);
  if (!userValidation.valid) return { success: false, message: userValidation.message };

  try {
    const commentRef = ref(db, `comments/${postCheck.value}/${commentCheck.value}`);
    const snapshot = await get(commentRef);

    if (!snapshot.exists()) {
      return { success: false, message: "Comentario no encontrado." };
    }

    const commentData = snapshot.val();

    if (userData.role !== "admin") {
      if (userData.membresia.tipo === "basico") {
        return { success: false, message: "No tienes permiso para eliminar comentarios." };
      }
      if ((userData.membresia.tipo === "intermedio" || userData.membresia.tipo === "premium") && commentData.userId !== userData.localId) {
        return { success: false, message: "Solo puedes eliminar tus propios comentarios." };
      }
    }

    await remove(commentRef);
    return { success: true, message: "Comentario eliminado correctamente." };
  } catch (error) {
    console.error("deleteComment error:", error);
    return { success: false, message: "Error al eliminar el comentario.", error };
  }
};

export const updateComment = async (postId, commentId, userData, newText) => {

  const postCheck = validateId(postId, "post ID");
  if(!postCheck.valid) return {valid: false, message: postCheck.message};

  const commentCheck = validateId(commentId, "comment ID");
  if(!commentCheck.valid) return {valid: false, message: commentCheck.message};

  const textValidation = validateString(newText, "Comentario", {maxLength: 1200});
  if(!textValidation.valid) return {valid: false, message: textValidation.message};

  const userValidation = validateUser(userData);
  if(!userValidation.valid) return {valid: false, message: userValidation.message};

  try{
    const commentRef = ref(db, `comments/${postCheck.value}/${commentCheck.value}`);
    const snapshot = await get(commentRef);

    if(!snapshot.exists()){
      return {success: false, message: "Comentario no encontrado."};

    }

    const commentData = snapshot.val();
    const cleanedText = textValidation.value;
    
  if(userData.role === "admin"){
    await set(commentRef, { ...commentData, text: cleanedText, updatedAt: Date.now() });
    return {success: true, message: "Comentario actualizado correctamente."};

  } 
  
  if(userData.membresia.tipo === "intermedio" || userData.membresia.tipo === "premium"){

    if(commentData.userId === userData.localId){
       await set(commentRef, {
        ...commentData,
        text: cleanedText,
        updatedAt: Date.now(),
      });
      return {success: true, message: "Comentario actualizado correctamente."};
    } else {
      return {success: false, message: "Solo puedes actualizar tus propios comentarios."};
    }

  }

  return {success: false, message: "No tienes permiso para actualizar comentarios."};

    
  }catch(error){
    console.error("updateComment error:", error);
    return {success: false, message: "Error al actualizar el comentario.", error};
  }

}
