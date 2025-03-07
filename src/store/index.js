import { configureStore } from "@reduxjs/toolkit";
import InformacionReducer from "../features/recursos/InformacionSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { recursosApi } from "../services/recursosService";


const store = configureStore({
    reducer: {
        informacion: InformacionReducer,
        [recursosApi.reducerPath]: recursosApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(recursosApi.middleware),
});

setupListeners(store.dispatch);

export default store;
