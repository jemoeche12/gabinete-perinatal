import { configureStore } from "@reduxjs/toolkit";
import InformacionReducer from "../features/recursos/InformacionSlice";
import AuthReducer from "../features/user/UserSlice";
import TalleresReducer from '../features/talleres/TalleresSlice';
import CartReducer from "../features/cart/CartSlice";
import TestReducer from "../features/test/TestSlice";
import PostReducer from "../features/post/PostSlice";  
import CommentReducer from "../features/comments/CommentSlice";
import dueloReducer from "../features/duelo/DueloSlice";
import GuidesReducer from "../features/guides/GuidesSlice";
import AppReducer from "../features/app/AppSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { recursosApi } from "../services/recursosService";
import { authApi } from "../services/authService";
import { talleresApi } from "../services/talleresService";
import { testApi } from "../services/testService";
import { userApi } from "../services/userService";
import { citasApi } from "../services/citasService";
import { consultasApi } from "../services/consultasService";
import { orderApi } from "../services/orderService";
import { asesoriasApi } from "../services/asesoriasService";
import { podcastApi } from "../services/podcastService";
import { dueloApi } from "../services/DueloService";
import { guidesApi } from "../services/guidesService";

const store = configureStore({
    reducer: {
        informacion: InformacionReducer,
        auth: AuthReducer,
        talleres: TalleresReducer,
        test: TestReducer,
        cart: CartReducer,
        posts: PostReducer,
        comments: CommentReducer,
        duelo: dueloReducer,
        guides: GuidesReducer,
        app: AppReducer,
        [recursosApi.reducerPath]: recursosApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [talleresApi.reducerPath]: talleresApi.reducer,
        [testApi.reducerPath]: testApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [citasApi.reducerPath]: citasApi.reducer,
        [asesoriasApi.reducerPath]: asesoriasApi.reducer,
        [consultasApi.reducerPath]: consultasApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [podcastApi.reducerPath]: podcastApi.reducer,
        [dueloApi.reducerPath]: dueloApi.reducer,
        [guidesApi.reducerPath]: guidesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(recursosApi.middleware)
            .concat(authApi.middleware)
            .concat(talleresApi.middleware)
            .concat(testApi.middleware)
            .concat(userApi.middleware)
            .concat(citasApi.middleware)
            .concat(asesoriasApi.middleware)
            .concat(consultasApi.middleware)
            .concat(orderApi.middleware)
            .concat(podcastApi.middleware)
            .concat(dueloApi.middleware)
            .concat(guidesApi.middleware),
});

setupListeners(store.dispatch);
export default store;