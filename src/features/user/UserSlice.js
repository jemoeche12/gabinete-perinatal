const { createSlice } = require("@reduxjs/toolkit");

export const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        value: {
            user: null,
            idToken: null,
            localId: null,
            imageCamera: null,
            name: "",
            lastName: ""
        }
    },
    reducers: {
        setUser: (state, { payload }) => {
            state.value.user = payload.email || null;
            state.value.idToken = payload.idToken || null;
            state.value.localId = payload.localId || null;
            state.value.name = payload.name || null;
            state.value.lastName = payload.lastName || null;

        },

        clearUser: (state) => {
            state.value.user = null;
            state.value.idToken = null;
            state.value.localId = null;
            state.value.imageCamera = null;
            state.value.name = "",
            state.value.lastName = ""
        },
        setImageCamera: (state, { payload }) => {
            state.value.imageCamera = payload;
        }
    }
});

export const { setUser, clearUser, setImageCamera } = AuthSlice.actions;
export default AuthSlice.reducer;