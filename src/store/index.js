import { configureStore } from "@reduxjs/toolkit";
import InformacionReducer from "../features/recursos/InformacionSlice";
import AuthReducer from "../features/user/UserSlice";
import TalleresReducer from '../features/talleres/TalleresSlice';
import { setupListeners } from "@reduxjs/toolkit/query";
import { recursosApi } from "../services/recursosService";
import {authApi} from "../services/authService";
import {talleresApi} from "../services/talleresService";


const store = configureStore({
    reducer: {
        informacion: InformacionReducer,
        auth: AuthReducer,
        talleres: TalleresReducer,
        [recursosApi.reducerPath]: recursosApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [talleresApi.reducerPath]: talleresApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
    .concat(recursosApi.middleware)
    .concat(authApi.middleware)
    .concat(talleresApi.middleware)
});

setupListeners(store.dispatch);

export default store;
