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
            state.value.user = {
                email: payload.user.email || null,
                name: payload.user.name || null,
                lastname: payload.user.lastname || null,
            };
            state.value.idToken = payload.idToken || null;
            state.value.localId = payload.localId || null;  
        },
        
        clearUser: (state) => {
            state.value.user = null; 
            state.value.idToken = null;
            state.value.localId = null;
            state.value.imageCamera = null;
        },
        setImageCamera: (state, { payload }) => {
            state.value.imageCamera = payload;
        }
    }
});

export const { setUser, clearUser, setImageCamera } = AuthSlice.actions;
export default AuthSlice.reducer;