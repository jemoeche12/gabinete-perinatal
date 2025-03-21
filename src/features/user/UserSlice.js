const { createSlice } = require("@reduxjs/toolkit");

export const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        value: {
            user: null,
            idToken: null,
            localId: null,
            imageCamera: null,
        }
    },
    reducers: {
        setUser: (state, { payload }) => {
            state.value.user = payload.user
            state.value.idToken = payload.idToken;
            state.value.localId = payload.localId;
        },
        clearUser: (state) => {
            state.value.user = null; 
            state.value.idToken = null;
            state.value.localId = null;
        },
        setImageCamera: (state, { payload }) => {
            state.value.imageCamera = payload;
        }
    }
});

export const { setUser, clearUser, setImageCamera } = AuthSlice.actions;
export default AuthSlice.reducer;
