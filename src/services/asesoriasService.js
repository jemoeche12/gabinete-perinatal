import { createApi } from "@reduxjs/toolkit/query/react";
import { app } from "../config/firebaseConfig";
import {
  getDatabase,
  get,
  ref,
  set,
  push,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";

export const asesoriasApi = createApi({
  reducerPath: "asesoriasApi",
  tagTypes: ["asesorias"],
  endpoints: (builder) => ({
    crearAsesoria: builder.mutation({
      async queryFn(asesoriaData) {
        try {
          const db = getDatabase(app);
          const asesoriasRef = ref(db, "asesorias");
          const { fechaSeleccionada, horarioElegido } = asesoriaData;

          const snapshot = await get(asesoriasRef);

          if (snapshot.exists()) {
            const todasLasAsesorias = snapshot.val();
            const duplicate = Object.values(todasLasAsesorias).some(
              (asesoria) =>
                asesoria.fechaSeleccionada === fechaSeleccionada &&
                asesoria.horarioElegido === horarioElegido
            );

            if (duplicate) {
              return {
                error: {
                  status: "DUPLICATE",
                  message: "Ya existe una asesoría con esa fecha y horario.",
                },
              };
            }
          }

          const newAsesoriaRef = push(asesoriasRef);
          await set(newAsesoriaRef, asesoriaData);

          return {
            data: { id: newAsesoriaRef.key, ...asesoriaData },
          };
        } catch (error) {
          return {
            error: {
              status: "UNKNOWN",
              message: error.message || "Error al crear asesoría",
            },
          };
        }
      },
      invalidatesTags: ["asesorias"],
    }),

    getAsesorias: builder.query({
      async queryFn(userId) {
        try {
          const dbInstance = getDatabase(app);
          const asesoriasRef = ref(dbInstance, "asesorias");

          const asesoriaQuery = query(
            asesoriasRef,
            orderByChild("userId"),
            equalTo(userId)
          );

          const snapshot = await get(asesoriaQuery);

          if (snapshot.exists()) {
            const asesoriaData = snapshot.val();
            const asesoriaArray = Object.keys(asesoriaData).map((key) => ({
              id: key,
              ...asesoriaData[key],
            }));
            return { data: asesoriaArray };
          } else {
            return { data: [] };
          }
        } catch (error) {
          return {
            error: {
              message: error.message || "Error desconocido al obtener asesorías",
            },
          };
        }
      },
      providesTags: ["asesorias"],
    }),

    getTodasLasAsesorias: builder.query({
      async queryFn() {
        try {
          const dbInstance = getDatabase(app);
          const asesoriasRef = ref(dbInstance, "asesorias");

          const snapshot = await get(asesoriasRef);

          if (snapshot.exists()) {
            const todasLasAsesorias = snapshot.val();
            const asesoriaArray = Object.keys(todasLasAsesorias).map((key) => ({
              id: key,
              ...todasLasAsesorias[key],
            }));
            return { data: asesoriaArray };
          } else {
            return { data: [] };
          }
        } catch (error) {
          return {
            error: {
              message:
                error.message ||
                "Error al intentar capturar todas las asesorías",
            },
          };
        }
      },
      providesTags: ["asesorias"],
    }),
  }),
});

export const {
  useCrearAsesoriaMutation,
  useGetAsesoriasQuery,
  useGetTodasLasAsesoriasQuery,
} = asesoriasApi;
