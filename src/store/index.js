import { configureStore } from "@reduxjs/toolkit";
import InformacionReducer from "../features/recursos/InformacionSlice";
import AuthReducer from "../features/user/UserSlice";
import TalleresReducer from '../features/talleres/TalleresSlice';
import CartReducer from "../features/cart/CartSlice"
import TestReducer from "../features/test/TestSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { recursosApi } from "../services/recursosService";
import {authApi} from "../services/authService";
import {talleresApi} from "../services/talleresService";
import { testApi } from "../services/testService";
import { userApi } from "../services/userService";
import { citasApi } from "../services/citasService";

const store = configureStore({
    reducer: {
        informacion: InformacionReducer,
        auth: AuthReducer,
        talleres: TalleresReducer,
        test: TestReducer,
        cart: CartReducer,

        [recursosApi.reducerPath]: recursosApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [talleresApi.reducerPath]: talleresApi.reducer,
        [testApi.reducerPath]: testApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [citasApi.reducerPath]: citasApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
    .concat(recursosApi.middleware)
    .concat(authApi.middleware)
    .concat(talleresApi.middleware)
    .concat(testApi.middleware)
    .concat(userApi.middleware)
    .concat(citasApi.middleware),
});

setupListeners(store.dispatch);

export default store;
