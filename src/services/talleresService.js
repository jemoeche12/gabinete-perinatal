import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realTimeDataBase";

export const talleresApi = createApi({
  reducerPath: "talleresApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getTalleres: builder.query({
      query: () => "talleres.json",
      transformResponse: (response) => {
        if (!response) return [];
        return Object.keys(response).map((key) => ({
          id: key,
          ...response[key],
        }));
      },
    }),
    getTallerById: builder.query({
      query: (tallerId) => `talleres/${tallerId}.json`,
      transformResponse: (response) => {
        if (!response) return null;
        return response;
      },
    }),
  }),
});

export const { useGetTalleresQuery, useGetTallerByIdQuery } = talleresApi;