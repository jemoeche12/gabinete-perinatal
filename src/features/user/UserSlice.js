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
            lastName: "",
            role: null,
            membresia: {
                tipo: null,
                estado: null,
                fechaInicio: null,
                fechaFin: null,
                stripeSubscriptionId: null,
                stripeCustomerId: null,
                stripePriceId: null
            }
        }
    },
    reducers: {
        setUser: (state, { payload }) => {
            state.value.user = payload.email || null;
            state.value.idToken = payload.idToken || null;
            state.value.localId = payload.localId || null;
            state.value.name = payload.name || null;
            state.value.lastName = payload.lastName || null;
            state.value.role = payload.role || null;
            state.value.membresia = payload.membresia || {
                tipo: null,
                estado: null,
                fechaInicio: null,
                fechaFin: null,
                stripeSubscriptionId: null,
                stripeCustomerId: null,
                stripePriceId: null
            };
        },

        clearUser: (state) => {
            state.value.user = null;
            state.value.idToken = null;
            state.value.localId = null;
            state.value.imageCamera = null;
            state.value.name = "";
            state.value.lastName = "";
            state.value.role = null;
            state.value.membresia = payload.membresia || {
                tipo: null,
                estado: null,
                fechaInicio: null,
                fechaFin: null,
                stripeSubscriptionId: null,
                stripeCustomerId: null,
                stripePriceId: null
            };
        },
        setImageCamera: (state, { payload }) => {
            state.value.imageCamera = payload;
        }
    }
});

export const { setUser, clearUser, setImageCamera } = AuthSlice.actions;
export default AuthSlice.reducer;