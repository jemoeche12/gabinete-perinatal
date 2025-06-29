import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realTimeDataBase";

export const constultasApi = createApi({
  reducerPath: "consultasAPi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["consulta"],
  endpoints: (builder) => ({
    crearConsulta: builder.mutation({
      query: (consultaData) => ({
        url: "consultas.json",
        method: "POST",
        body: consultaData,
      }),
      invalidatesTags: ["consulta"],
    }),
  }),
});

export const { useCrearConsultaMutation } = constultasApi;
