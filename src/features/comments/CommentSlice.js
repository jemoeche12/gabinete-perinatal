import { createSlice } from "@reduxjs/toolkit";


export const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
    selectedComment: null,
    lastUpdated: null,
    activePostId: null,
  },
  reducers: {
    setComments: (state, { payload }) => {
      state.comments = payload;
    },
    addCommentLocal: (state, { payload }) => {
      state.comments.push(payload);
    },
    removeCommentLocal: (state, { payload }) => {
      state.comments = state.comments.filter(comment => comment.id !== payload.id);
    },
    updateCommentLocal: (state, { payload }) => {
      const index = state.comments.findIndex(comment => comment.id === payload.id);
      if (index !== -1) {
        state.comments[index] = payload;
      }
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },

    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setComments, addCommentLocal, removeCommentLocal, updateCommentLocal,  setLoading, setError  } = commentSlice.actions;
export default commentSlice.reducer;
