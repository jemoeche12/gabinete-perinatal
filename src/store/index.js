import { configureStore } from "@reduxjs/toolkit";
import InformacionReducer from "../features/recursos/InformacionSlice";
import AuthReducer from "../features/user/UserSlice"
import { setupListeners } from "@reduxjs/toolkit/query";
import { recursosApi } from "../services/recursosService";
import {authApi} from "../services/authService";


const store = configureStore({
    reducer: {
        informacion: InformacionReducer,
        auth: AuthReducer,
        [recursosApi.reducerPath]: recursosApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
    .concat(recursosApi.middleware)
    .concat(authApi.middleware)
});

setupListeners(store.dispatch);

export default store;
