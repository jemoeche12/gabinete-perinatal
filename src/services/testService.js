import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realTimeDataBase";

export const testApi = createApi({
  reducerPath: "testApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getTestTitulo: builder.query({
      query: () => `categoriesTest.json`,
    }),
    getTestById: builder.query({
      query: (id) => `test/${id}.json`,
      transformResponse: (response) => {
        if (!response) return null;
        return response;
      },
      
    }),
  }),
});

export const { useGetTestTituloQuery, useGetTestByIdQuery } = testApi;
