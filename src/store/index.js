import { configureStore } from "@reduxjs/toolkit";
import InformacionReducer from "../features/recursos/InformacionSlice";
import AuthReducer from "../features/user/UserSlice";
import TalleresReducer from '../features/talleres/TalleresSlice';
import TestReducer from "../features/test/TestSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { recursosApi } from "../services/recursosService";
import {authApi} from "../services/authService";
import {talleresApi} from "../services/talleresService";
import { testApi } from "../services/testService";


const store = configureStore({
    reducer: {
        informacion: InformacionReducer,
        auth: AuthReducer,
        talleres: TalleresReducer,
        test: TestReducer,
        [recursosApi.reducerPath]: recursosApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [talleresApi.reducerPath]: talleresApi.reducer,
        [testApi.reducerPath]: testApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
    .concat(recursosApi.middleware)
    .concat(authApi.middleware)
    .concat(talleresApi.middleware)
    .concat(testApi.middleware)
});

setupListeners(store.dispatch);

export default store;
