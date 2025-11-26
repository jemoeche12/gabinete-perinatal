import { StyleSheet, View, Text } from "react-native";
import { fetchCommentsThunks } from "../features/comments/CommentThunks";
import { useEffect } from "react";
import PostHeader from "../components/PostHeader";
import PostContent from "../components/PostContent";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import { useDispatch, useSelector } from "react-redux";

const PostScreen = ({ route }) => {
  const dispatch = useDispatch();

  const { postId, postData } = route.params;

  const { comments, loading, error } = useSelector((state) => state.comments);

  const { userData } = useSelector((state) => state.auth.value);

  useEffect(() => {
    const unsubscribe = dispatch(fetchCommentsThunks(postId));
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [postId]);

  return (
    <View>
      <Text>Un lugar para respirar, compartir y no sentirte sola/o</Text>
      <Text>
        Bienvenida/o a este espacio creado para acompañarte en cada etapa: el
        deseo de gestar, el embarazo, el posparto, la crianza, los miedos, los
        duelos y todo aquello que a veces cuesta decir en voz alta.
      </Text>
      <Text>
        {" "}
        Aquí puedes: Ser vos misma/o, sin exigencias. Compartir lo que te pasa y
        encontrar a otras personas que sienten como vos. Recibir sostén
        profesional cuando lo necesites. Este es un rincón seguro. Un lugar
        donde tus emociones tienen espacio, donde tu historia importa y donde
        podés descansar un momento. No estás sola/o. La comunidad te abraza.
      </Text>
      <PostHeader
        userName={postData.userName}
        avatar={postData.avatar}
        createdAt={postData.createdAt}
      />
      <PostContent
        text={postData.text}
        img={postData.img}
        counter={postData.counter}
      />
      <CommentList
        comments={comments}
        loading={loading}
        error={error}
        postId={postId}
        userData={userData}
      />
      
      <CommentForm postId={postId} userData={userData} />
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({});
