import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realTimeDataBase";

export const dueloApi = createApi({
  reducerPath: "dueloApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getDuelo: builder.query({
      query: () => "duelosCategorias.json",
      transformResponse: (response) => {
        if (!response) return [];

        const duelosArray = Object.entries(response).map(([key, value]) => ({
          id: Number(value.id ?? key),
          name: value.name,
          requiredLevel:
            value.requiredLevel || value.suscriptionPlan || "basico",
        }));
        return duelosArray;
      },
    }),
    getDueloByCategory: builder.query({
      query: (category) => `duelos.json`,
      transformResponse: (response, meta, category) => {
        if (!response) return [];
        return Object.values(response).filter(
          (item) => item.category === category
        );
      },
    }),

  getDueloById: builder.query({
  query: (dueloId) => `duelos/${dueloId}.json`, 
  transformResponse: (response) => {
    return response || null;
  },
}),
  }),
});

export const {
  useGetDueloQuery,
  useGetDueloByCategoryQuery,
  useGetDueloByIdQuery,
} = dueloApi;
