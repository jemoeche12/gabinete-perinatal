import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { app } from "../config/firebaseConfig";
import {
  getDatabase,
  ref,
  push,
  set,
  orderByChild,
  equalTo,
  get,
  query,
} from "firebase/database";

export const citasApi = createApi({
  reducerPath: "citasApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Cita"],
  endpoints: (builder) => ({
    createCita: builder.mutation({
      async queryFn(citaData) {
        try {
          const db = getDatabase(app);

          const citasRef = ref(db, "citas");

          const { fechaSeleccionada, horarioElegido } = citaData;

          let isDuplicate = false;

          const snapshot = await get(citasRef);

          if (snapshot.exists()) {
            const todasLasCitas = snapshot.val();
            for (const key in todasLasCitas) {
              const existeCita = todasLasCitas[key];
              if (
                existeCita.fechaSeleccionada === fechaSeleccionada &&
                existeCita.horarioElegido === horarioElegido
              ) {
                isDuplicate = true;
                break;
              }
            }
          }
          if (isDuplicate) {
            return {
              error: {
                message:
                  "Por favor seleccione otro dia, esta fecha, en este horario no esta disponible",
                code: "DUPLICATE_APPOINTMENT",
              },
            };
          }
          const newCitaRef = push(citasRef);
          await set(newCitaRef, citaData);

          return { data: { id: newCitaRef.key, ...citaData } };
        } catch (error) {
          return { error: { message: error.message || "Error desconocido" } };
        }
      },
      invalidatesTags: ["Cita"],
    }),
    getCita: builder.query({
      async queryFn(userId) {
        try {
          const dbInstance = getDatabase(app);
          const citasRef = ref(dbInstance, "citas");

          const citasQuery = query(
            citasRef,
            orderByChild("userId"),
            equalTo(userId)
          );
          const snapshot = await get(citasQuery);

          if (snapshot.exists()) {
            const citaData = snapshot.val();
            const citasArray = Object.keys(citaData).map((key) => ({
              id: key,
              ...citaData[key],
            }));
            return { data: citasArray };
          } else {
            return { data: [] };
          }
        } catch (error) {
          return { error: { message: error.message || "Error desconocido" } };
        }
      },
      providesTags: ["Cita"],
    }),
    getTodasLasCitas: builder.query({
      async queryFn() {
        try {
          const dbInstance = getDatabase(app);
          const citasRef = ref(dbInstance, "citas");

          const snapshot = await get(citasRef);

          if (snapshot.exists()) {
            const todasLasCitas = snapshot.val();
            const citasArray = Object.keys(todasLasCitas).map((key) => ({
              id: key,
              ...todasLasCitas[key],
            }));
            return { data: citasArray };
          } else {
            return { data: [] };
          }
        } catch (error) {
          return {
            error: {
              message:
                error.message || "Error al intentar capturar todas las citas",
            },
          };
        }
      },
      providesTags: ["Cita"],
    }),
  }),
});

export const {
  useCreateCitaMutation: useCrearCitaMutation,
  useGetCitaQuery,
  useGetTodasLasCitasQuery,
} = citasApi;
