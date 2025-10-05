import { createApi } from "@reduxjs/toolkit/query/react";
import { app } from "../config/firebaseConfig";
import {
  getDatabase,
  ref,
  get,
  orderByKey,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";

export const podcastApi = createApi({
  reducerPath: "podcastApi",
  tagTypes: ["podcast"],
  endpoints: (builder) => ({
    getCategoryPodcast: builder.query({
      async queryFn(categoriaSeleccionada) {
        try {
          const db = getDatabase(app);
          const podcastRef = ref(db, "podcasts");

          if (!categoriaSeleccionada || categoriaSeleccionada.toLowerCase() === "todos") {
            const snapshot = await get(podcastRef);
            if (snapshot.exists()) {
              const data = snapshot.val();
              const podcast = Object.entries(data).map(([id, podcastData]) => ({
                id,
                ...podcastData,
              }));
              return { data: podcast };
            }
            return { data: [] };
          }

          const podcastCategoryQuery = query(
            podcastRef,
            orderByChild("categoria"),
            equalTo(categoriaSeleccionada)
          );
          const snapshot = await get(podcastCategoryQuery);

          if (snapshot.exists()) {
            const data = snapshot.val();
            const categoryPodcast = Object.entries(data).map(([id, podcastData]) => ({
              id,
              ...podcastData,
            }));
            return { data: categoryPodcast };
          }
          return { data: [] };
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ["podcast"],
    }),

    getCategories: builder.query({
      async queryFn() {
        try {
          const db = getDatabase(app);
          const podcastCategorieRef = ref(db, "categoriaPodcast");
          const snapshot = await get(podcastCategorieRef);

          if (snapshot.exists()) {
            const data = snapshot.val();
            return { data: Object.values(data) };
          }
          return { data: [] };
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ["podcast"],
    }),

    getPodcastById: builder.query({
      async queryFn(id) {
        try {
          const db = getDatabase(app);
          const podcastRef = ref(db, `podcasts/${id}`);
          const snapshot = await get(podcastRef);

          if (snapshot.exists()) {
            const data = snapshot.val();
            return { data: { id, ...data } };
          }
          return { data: null };
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ["podcast"],
    }),
  }),
});

export const {
  useGetCategoryPodcastQuery,
  useGetCategoriesQuery,
  useGetPodcastByIdQuery,
} = podcastApi;
