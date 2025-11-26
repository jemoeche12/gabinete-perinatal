import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        loading: false,
        error: null,
        selectedPost: null,
        lastUpdated: null,
    },
    reducers: {
        setPosts: (state, {payload}) => {
            state.posts = payload;
        },
        addPostLocal: (state, {payload}) => {
            state.posts.unshift(payload);  
        },
        removePostLocal: (state, {payload}) => {
            state.posts = state.posts.filter(post => post.id !== payload);
        },
        updatePostLocal: (state, {payload}) => {
            const index = state.posts.findIndex(post => post.id === payload.id);
            if (index !== -1) {
                state.posts[index] = {
                    ...state.posts[index],
                    ...payload,
                };
            }
        },
        setLoading: (state, {payload}) => {
            state.loading = payload;
        },
        setError: (state, {payload}) => {
            state.error = payload;
        },
    },
});

export const { 
    setPosts, 
    addPostLocal, 
    removePostLocal, 
    updatePostLocal, 
    setLoading, 
    setError 
} = postSlice.actions;

export default postSlice.reducer;
